let mic;

let myVideo;
let myVideoPos;
let myOpacity = 0;

let otherVideo;
let otherVideoPos;
let otherOpacity = 0;
let otherVideos = {};
let otherAudio;


let videoWidthConst = 320;
let videoHeightConst = 240;

let p5l;

// Chatroom name 
let yourRoomName = "Alvaro123"

function setup() {
    let myCanvas = createCanvas(800, 600);

    myVideoPos = height - videoHeightConst;

    mic = new p5.AudioIn();
    mic.start();

    let constraints = {
        video: {
            mandatory: {
                maxWidth: videoWidthConst,
                maxHeight: videoHeightConst
            },
            optional: [{
                maxFrameRate: 24
            }]
        },
        audio: true
    };




    // Capture stream from browser
    myVideo = createCapture(constraints,
        function (stream) {
            // Get a stream from the canvas to send
            let canvasStream = myCanvas.elt.captureStream(15);

            // Extract the audio tracks from the stream
            let audioTracks = stream.getAudioTracks();

            // Use the first audio track, add it to the canvas stream
            if (audioTracks.length > 0) {
                canvasStream.addTrack(audioTracks[0]);
            }
            p5l = new p5LiveMedia(this, "CAPTURE", canvasStream, yourRoomName);
            p5l.on('stream', gotStream);
            p5l.on('data', gotData);
            p5l.on('disconnect', gotDisconnect);



        }

    );

    // hide the HTML <video> element
    myVideo.hide();

    myVideo.elt.muted = true;

}

function draw() {
    background(0);

    micLevel = mic.getLevel() * 1000;

    if (myVideo != null) {

        if (micLevel > 10 && myVideoPos > 0) {
            myVideoPos -= 1;
            myOpacity += 1;

            image(myVideo, 100, myVideoPos, videoWidthConst, videoHeightConst);
        }
        /* else if (micLevel < 10 && myVideoPos < videoHeightConst ) {
             myVideoPos += 0.3;
             myOpacity -= 1;

             image(myVideo, 20, myVideoPos, videoWidthConst, videoHeightConst);
             filter(GRAY);

         }*/
        else {
            myVideoPos += 0.3;
            myOpacity -= 1;

            image(myVideo, 100, myVideoPos, videoWidthConst, videoHeightConst);
            filter(GRAY);

        }

        tint(255, myOpacity);

        console.log(`My mic level is ${micLevel}`)
        console.log(`My video pos is ${myVideoPos}`)
        console.log(`My opacity is ${myOpacity}`)

    }

    if (otherVideo != null) {
        //let normalizedAudioLevel = map(micLevel,0,300,0,255)
        sendAudioData(mic, p5l)

        if (otherAudio > 10 && otherVideoPos > 0) {
            otherVideoPos -= 1;
            otherOpacity += 1;
            image(otherVideo, 200, otherVideoPos, videoWidthConst, videoWidthConst);
        } else {
            otherVideoPos += 0.3;
            otherOpacity -= 1;

            image(otherVideo, 200, otherVideoPos, videoWidthConst, videoHeightConst);
            filter(GRAY);

        }


        tint(255, otherOpacity)
    }
}


// Every time there is a new stream
function gotStream(incomingStream, id) {
    // define the incoming stream
    otherVideo = incomingStream;
    //otherVideo.id and id are the same and unique identifiers
    otherVideo.hide();

    otherVideos[id] = stream;
}

// Every time there is a new stream
function gotData(incomingData, id) {
    // define the incoming stream
    let data = JSON.parse(incomingData);
    otherAudio = data.volume
}

function gotDisconnect(id) {
    delete otherVideos[id];
}

function sendAudioData(audioStream) {
    let audioLevel = audioStream.getLevel() * 10000;
    // Package as JSON to send
    let dataToSend = {
        volume: audioLevel
    };

    // Send data
    p5l.send(JSON.stringify(dataToSend));
}