import React, { useState } from "react";
import { Avatar, Box, Button, Icon, ImageViewer, Sheet, Swiper,Text } from "zmp-ui";
import { NewsCardProps} from "types/NewsItem";


interface SheetCustomProps {
  sheetVisible: boolean;
  setSheetVisible: Function;
}

const SheetCustom: React.FunctionComponent<SheetCustomProps> = ({
  sheetVisible,
  setSheetVisible,
}) => {
  return (
    <Sheet.Actions
    mask
    visible={sheetVisible}
    title='This is title, it can be one line or two line'
    onClose={() => setSheetVisible(false)}
    swipeToClose
    actions={[
      [
        { text: "Share 1", close: true },
        { text: "Share 2", close: true },
        { text: "Share 3", close: true }
      ],
      [{ text: "Cancel", close: true , danger: true}]
    ]}
  />
  );
};

const NewsCard: React.FunctionComponent<NewsCardProps> = ({ item }) => {

  const [isLike, setIsLike] = useState(true);
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <Box className="newsCard">

      {/*  header card news */}
      <Box flex={true} flexDirection="row" flexWrap={true} alignItems="center" pb={3}>
        <Avatar src={item.avatar || "https://via.placeholder.com/150"} />
        <Box pl={1}><h2>{item.fullName}</h2></Box>
      </Box>

      <Box flex flexWrap={true} pb={2} mr={3}> <p> {item.content}</p></Box>

      {/* List Image */}

      <Swiper key={item.id}>

        {item.listImg?.map((imgUrl: string, index: React.Key) => (
          <Swiper.Slide key={index}>
            <img src={imgUrl} alt={"Img" + index} className='imgNews' />
          </Swiper.Slide>
        ))}

      </Swiper>
      {/* Button Bar */}
      <Box
        className="btnCard"
        flex
      >
        <Button
          variant="tertiary"
          prefixIcon={<Icon icon={(isLike == true ? "zi-heart" : "zi-heart-solid")} />}
          type="neutral"
          size="medium"
          onClick={() => setIsLike(!isLike)}> Like </Button>

        <Button
          variant="tertiary"
          prefixIcon={<Icon icon={"zi-chat"} />}
          type="neutral"
          size="medium"
          onClick={() => { }}> Comment </Button>

        <Button

          variant="tertiary"
          prefixIcon={<Icon icon={"zi-share"} />}
          type="neutral"
          size="medium"
          onClick={() => { setSheetVisible(true) }}> Share </Button>
      </Box>
      <SheetCustom sheetVisible={sheetVisible} setSheetVisible={setSheetVisible} ></SheetCustom>
    </Box>
  );
}

export default NewsCard;
