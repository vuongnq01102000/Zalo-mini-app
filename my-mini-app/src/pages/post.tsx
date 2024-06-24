
import React ,{Suspense, useEffect, useRef, useState} from "react";
import {  useRecoilValue } from "recoil";
import { displayNameState, userState } from "state";
import { Avatar, Box, Button, Input, Page, SnackbarProvider, Text, useSnackbar } from "zmp-ui";


export const PostPage = () => {

    const { userInfo: user } = useRecoilValue(userState);
    const [txtValue, setTxtValue] = useState("");
    const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();


    useEffect(
        () => () => {
          closeSnackbar();
        },
        []
      );
      
    return (
        <Page className="initPostPage">
            <Suspense>
                <Box flex flexDirection="row" alignContent="center">
                    <Avatar src={user.avatar} online></Avatar>
                    <Box pl= {2}>
                    <Text.Title>{user.name}</Text.Title>
                    </Box>
                </Box>
            </Suspense>

            <Box p = {2} >
                <Input.TextArea placeholder="Write contents here..." 
                    clearable = {true} 
                    value={txtValue}
                    onChange={e => setTxtValue(e.target.value)}
                    >

                </Input.TextArea>
                <Box height={10}></Box>
                <Button fullWidth = {true} onClick={() => {
                   if (txtValue.length == 0) {
                    openSnackbar({
                        
                        text: txtValue,
                        type:"error",
                        duration: 1000
                      });
                   }else {
                    openSnackbar({
                        
                        text: txtValue,
                        type: "success",
                        duration: 1000
                      });
                   }
                }}>
                    <Text.Title>Post</Text.Title>
                </Button>
            </Box>
            <SnackbarProvider  >

            </SnackbarProvider>
        </Page>
    );
}