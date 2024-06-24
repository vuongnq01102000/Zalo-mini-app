import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate, Header, Box } from "zmp-ui";
import UserCard from "components/user-card";
import NewsPage from "./news";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Page >
      <Header title="Home" showBackIcon = {false}></Header>
      <Box height={50}></Box>
      <NewsPage></NewsPage>
    </Page>
  );
};

export default HomePage;
