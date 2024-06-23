
import NewsCard from "components/news/news_card";
import React from "react";
import { NewsItem } from "types/NewsItem";
import { Page } from "zmp-ui";


import mockData from 'mocks/mocks_news.json';

const NewsPage : React.FunctionComponent = () => {
    return (
        <Page className="page" color="red">
            {mockData.map(item  => (
                <NewsCard key={item.id} item={item}/>
            ))}
        </Page>
    );
}

export default NewsPage;