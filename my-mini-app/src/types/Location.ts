export interface LocationData {
    location: LocationClass;
    current:  Current;
}

export interface Current {
    last_updated_epoch: number;
    last_updated:       string;
    temp_c:             number;
    temp_f:             number;
    is_day:             number;
    condition:          Condition;
    wind_mph:           number;
    wind_kph:           number;
    wind_degree:        number;
    wind_dir:           string;
    pressure_mb:        number;
    pressure_in:        number;
    precip_mm:          number;
    precip_in:          number;
    humidity:           number;
    cloud:              number;
    feelslike_c:        number;
    feelslike_f:        number;
    windchill_c:        number;
    windchill_f:        number;
    heatindex_c:        number;
    heatindex_f:        number;
    dewpoint_c:         number;
    dewpoint_f:         number;
    vis_km:             number;
    vis_miles:          number;
    uv:                 number;
    gust_mph:           number;
    gust_kph:           number;
}

export interface Condition {
    text: string;
    icon: string;
    code: number;
}

export interface LocationClass {
    name:            string;
    region:          string;
    country:         string;
    lat:             number;
    lon:             number;
    tz_id:           string;
    localtime_epoch: number;
    localtime:       string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toLocation(json: string): LocationData {
        return cast(JSON.parse(json), r("Location"));
    }

    public static locationToJson(value: LocationData): string {
        return JSON.stringify(uncast(value, r("Location")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Location": o([
        { json: "location", js: "location", typ: r("LocationClass") },
        { json: "current", js: "current", typ: r("Current") },
    ], false),
    "Current": o([
        { json: "last_updated_epoch", js: "last_updated_epoch", typ: 0 },
        { json: "last_updated", js: "last_updated", typ: "" },
        { json: "temp_c", js: "temp_c", typ: 0 },
        { json: "temp_f", js: "temp_f", typ: 3.14 },
        { json: "is_day", js: "is_day", typ: 0 },
        { json: "condition", js: "condition", typ: r("Condition") },
        { json: "wind_mph", js: "wind_mph", typ: 0 },
        { json: "wind_kph", js: "wind_kph", typ: 3.14 },
        { json: "wind_degree", js: "wind_degree", typ: 0 },
        { json: "wind_dir", js: "wind_dir", typ: "" },
        { json: "pressure_mb", js: "pressure_mb", typ: 0 },
        { json: "pressure_in", js: "pressure_in", typ: 3.14 },
        { json: "precip_mm", js: "precip_mm", typ: 3.14 },
        { json: "precip_in", js: "precip_in", typ: 3.14 },
        { json: "humidity", js: "humidity", typ: 0 },
        { json: "cloud", js: "cloud", typ: 0 },
        { json: "feelslike_c", js: "feelslike_c", typ: 3.14 },
        { json: "feelslike_f", js: "feelslike_f", typ: 3.14 },
        { json: "windchill_c", js: "windchill_c", typ: 0 },
        { json: "windchill_f", js: "windchill_f", typ: 3.14 },
        { json: "heatindex_c", js: "heatindex_c", typ: 3.14 },
        { json: "heatindex_f", js: "heatindex_f", typ: 3.14 },
        { json: "dewpoint_c", js: "dewpoint_c", typ: 3.14 },
        { json: "dewpoint_f", js: "dewpoint_f", typ: 3.14 },
        { json: "vis_km", js: "vis_km", typ: 0 },
        { json: "vis_miles", js: "vis_miles", typ: 0 },
        { json: "uv", js: "uv", typ: 0 },
        { json: "gust_mph", js: "gust_mph", typ: 3.14 },
        { json: "gust_kph", js: "gust_kph", typ: 3.14 },
    ], false),
    "Condition": o([
        { json: "text", js: "text", typ: "" },
        { json: "icon", js: "icon", typ: "" },
        { json: "code", js: "code", typ: 0 },
    ], false),
    "LocationClass": o([
        { json: "name", js: "name", typ: "" },
        { json: "region", js: "region", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "lat", js: "lat", typ: 3.14 },
        { json: "lon", js: "lon", typ: 3.14 },
        { json: "tz_id", js: "tz_id", typ: "" },
        { json: "localtime_epoch", js: "localtime_epoch", typ: 0 },
        { json: "localtime", js: "localtime", typ: "" },
    ], false),
};