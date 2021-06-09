import OT from "@opentok/client";

function handleError(error: any) {
  if (error) {
    alert(error.message);
  }
}

let session: any, publisher: any, subscriber;

export function initializeSession(apiKey: string, sessionId: string, token: string) {
  session = OT.initSession(apiKey, sessionId);

  // Create a publisher
  publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      style: { buttonDisplayMode: "on" },
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Subscribing to stream
  session.on("streamCreated", function (event: any) {
    subscriber = session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        style: { buttonDisplayMode: "on" },
        width: "100%",
        height: "100%",
       
      },
      handleError
    );
  });

  // Do some action on destroying the stream
  session.on("streamDestroyed", function (event: any) {
    console.log("The Video chat has ended");
  });

  // Connect to the session
  session.connect(token, function (error: any) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

export function stopStreaming() {
  session && session.unpublish(publisher);
}

export function streamingService(isActive: any) {
  OT.checkScreenSharingCapability(function(response: any) {
    if(!response.supported || response.extensionRegistered === false) {
      // This browser does not support screen sharing.
      console.log(' This browser does not support screen sharing')
    } else if (response.extensionInstalled === false) {
      // Prompt to install the extension.
      console.log('Prompt to install the extension.')
    } else {
      // Screen sharing is available. Publish the screen.
      let publisher = OT.initPublisher('screen-preview',
        {videoSource: 'screen',
        insertMode: "append",
        width: "100%",
        height: "100%",
        publishAudio: true
        },
        function(error: any) {
          if (error) {
            // Look at error.message to see what went wrong.
            console.log(error)
          } else {
            if(isActive){
              session.publish(publisher, function(error: any) {
                if (error) {
                  // Look error.message to see what went wrong.
                  console.log(error)
                }
              });    
            } else {
              publisher.destroy()
            }
          }
        }
      );
    }
  });
}

export function sendMessage(message: string){
  console.log(message)
  session.signal({
    type: 'msg',
    data: message
   
  }, function(error: any) {
  if (error) {
    console.log('Error sending signal:', error.name, error.message);
  }
});
}

export function getSession(){

  return(session)
}
