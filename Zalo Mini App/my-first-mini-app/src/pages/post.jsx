import React, { Suspense } from "react";

import {  Page, useNavigate,   } from "zmp-ui";
import PostCard from "../components/post-card";



const PostPage = (props) => {
    const navigate = useNavigate();


const images = [
  {
    src: "https://stc-zmp.zadn.vn/zmp-zaui/images/e2e10aa1a6087a5623192.jpg",
    alt: "img 1",
    key: "1"
  },
  {
    src: "https://stc-zmp.zadn.vn/zmp-zaui/images/fee40cbea0177c4925061.jpg",
    alt: "img 2",
    key: "2"
  },
  {
    src: "https://stc-zmp.zadn.vn/zmp-zaui/images/82ca759bd932056c5c233.jpg",
    alt: "img 3",
    key: "3"
  },
  {
    src: "https://stc-zmp.zadn.vn/zmp-zaui/images/77f5b8cd1464c83a91754.jpg",
    alt: "img 4",
    key: "4"
  }
];

   return (
    <Page className="page"> 
    <div>Hello</div>
    <Suspense>
      <div className="section-container">
        <PostCard images = {images}/>
      </div>
    </Suspense>
    <div color="pink"> Hello</div>
    </Page>
   );
};

export default PostPage;