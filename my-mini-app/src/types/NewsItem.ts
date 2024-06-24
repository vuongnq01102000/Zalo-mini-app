

export interface NewsItem {
    id: number;
    fullName: string;
    avatar: string;
    content: string;
    listImg: Array<String>;
}


export interface NewsCardProps {
    item: NewsItem;
}