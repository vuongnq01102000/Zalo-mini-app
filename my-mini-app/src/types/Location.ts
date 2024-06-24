export interface Location {
    name:         string;
    local_names?: { [key: string]: string };
    lat:          number;
    lon:          number;
    country:      string;
    state:        string;
}
// Converts JSON strings to/from your types
export class Convert {
    public static toLocation(json: string): Location[] {
        return JSON.parse(json);
    }

    public static locationToJson(value: Location[]): string {
        return JSON.stringify(value);
    }
}
