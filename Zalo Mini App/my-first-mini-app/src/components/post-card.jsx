import { bool } from "prop-types";
import React, {useState} from "react";

import { Avatar, Box, Button, Icon, Swiper, Text, ZBox } from "zmp-ui"; // Đảm bảo `Text` được import đúng cách
const PostCard = ({ images }) => {
    const [isLike, setIsLike] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const handleLikeClick = () => {
        setIsLike(!isLike);
    };
    return (
        <Box verticalAlign="middle">
            <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                pb={3}
            >
                <Avatar
                    story="default"
                    online
                    src={undefined}>
                </Avatar>

                <Box pl={1}>
                    <Text.Title size="small">
                        Van Minh Huy
                    </Text.Title>
                </Box>
            </Box>


            <Box >
                    <Swiper disableSwipe = {false}>
                        {images.map((image, index) => (
                            <Swiper.Slide key={index}>
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </Swiper.Slide>
                        ))}
                    </Swiper>
            </Box>

                { /* Button Bar*/  }  
            <Box  
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center" 
                pt={3}>
                    <Button size = "small" 
                            type="neutral"
                            variant="tertiary" 
                            prefixIcon= {isLike ?<Icon icon="zi-heart_solid"/> : <Icon icon="zi-heart"/>}
                            onClick={handleLikeClick}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            > 
                        Thích
                    </Button>
                    <Button size = "small" 
                            type="neutral"
                            variant="tertiary" 
                            prefixIcon= { <Icon icon="zi-chat"/>}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            > 
                        Bình luận
                    </Button>
                    <Button size = "small" 
                            type="neutral"
                            variant="tertiary" 
                            prefixIcon= {<Icon icon="zi-share" />}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            > 
                        Chia sẻ
                    </Button>
                 
            </Box>


        </Box>
    );
};

export default PostCard;