import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { initializeSession, stopStreaming, streamingService, sendMessage } from "../VideoIntegration"
import { apiKey, sessionId, token } from "../keys";
import { Button, Container, Grid } from "@material-ui/core";
import styled from 'styled-components';
import useSession from '../useChat'

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'gray'
        
    },
    video: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: 'lighgray'
    },
    subscriber: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 10
    },
    publisher: {
        position: 'absolute',
        left: '10px',
        width: '360px%',
        height: '240px',
        bottom: '10px',
        zIndex: 100,
        border: '10px solid white',
        borderRadius: '3px'
    }

    


}))



const VideoComponent = () => {
    const { messages } = useSession()
    console.log(messages)
    const classes = useStyles()
    const [isInterviewStarted, setIsInterviewStarted] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        isInterviewStarted
            ? initializeSession(apiKey, sessionId, token)
            : stopStreaming();
    }, [isInterviewStarted]);

    return (<>
        <Container maxWidth={false} className={classes.container}>
            <Grid container direction='row' className='actions-btns'>
                <Button
                    onClick={() => setIsInterviewStarted(true)}
                    disabled={isInterviewStarted}
                    color='primary'
                    variant="contained"
                    
                >
                    Start chat
                </Button>
                <Button
                    onClick={() => setIsInterviewStarted(false)}
                    disabled={!isInterviewStarted}
                    color='secondary'
                    variant="contained"
                >
                    Finish chat
                </Button>
                <Button
                    onClick={() => streamingService(true)}
                    color='secondary'
                    variant="contained">
                    start screensharing
                </Button>
            </Grid>
            <Grid container>
                {messages && messages.map((item: any) => <div style={{ backgroundColor: 'yellow'}}> <div  style={{height:'50px'}}></div> <div style={{width:'400px'}}></div> {item.message} </div>)}
                <input placeholder='enter message' value={message} onChange={(e) => setMessage(e.target.value)} />

                <Button
                    onClick={() => sendMessage(message)}
                    color='primary'
                    variant="contained"

                >
                    Send Message
                </Button>
                <Wrapper id="videos">
                    <SubscriberWrapper id="subscriber"></SubscriberWrapper>
                    <PublisherWrapper id="publisher"></PublisherWrapper>
                    <Screenpreview id="screen-preview"></Screenpreview>
                </Wrapper>
            </Grid>
        </Container>
    </>)
}

export default VideoComponent

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: lightgray;
`;
const SubscriberWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;
const PublisherWrapper = styled.div`
  position: absolute;
  width: 360px;
  height: 240px;
  bottom: 10px;
  left: 10px;
  z-index: 100;
  border: 3px solid white;
  border-radius: 3px;
`;

const Screenpreview = styled.div`
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
z-index: 10;
`;