import React, { useRef, useEffect, useState } from 'react';

let trackVertices = [];

const createVertices = () => {
    while (trackVertices.length < 255) {
        trackVertices.push(Math.floor(Math.random() * 255));
    }
}



//movement of track
const lerp = (nthTrackVertex, nPlusOnethTrackVertex, t) => {
    return nthTrackVertex + (nPlusOnethTrackVertex - nthTrackVertex) * (1 - Math.cos(t * Math.PI)) / 2;
}

const trackPointWithOffSet = x => {
    let horScale = 0.005;
    let vertScale = 0.5
    x = x * horScale % 255; //repeating
    return lerp(trackVertices[Math.floor(x)], trackVertices[Math.ceil(x)], x - Math.floor(x)) * vertScale;
}

const GameCanvas = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const context = canvas.getContext("2d");
        contextRef.current = context;
        createVertices();



        let frame = 0;
        function loop() {
            console.log("loop");
            frame += 1;
            context.fillStyle = "#0000ff";
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = "black";
            let speed = 4;
            context.beginPath();
            for (let i = 0; i < context.canvas.width; i++) {
                let trackPointMovedToBottom = context.canvas.height - 200 - trackPointWithOffSet(speed * frame + i);
                context.lineTo(i, trackPointMovedToBottom);
            }
            context.lineTo(context.canvas.width, context.canvas.height);
            context.lineTo(0, context.canvas.height);
            console.log(context.canvas.width, context.canvas.height);


            context.fill();
            requestAnimationFrame(loop);

        }

        loop();



    }, [])

    return (
        <div>
            <canvas
                ref={canvasRef} />
        </div>
    )
}

export default GameCanvas;




            // for (let i = 0; i < canvas.width; i++) {
            //     // let currentTrackPoint = context.lineTo(i, lerp(trackPoints[0], trackPoints[1], i));
            //     // console.log(currentTrackPoint);
            // }
            // context.moveTo(200, ((Math.sin(frame / 100)) * 250) + 500);
            // context.lineTo(((Math.sin(frame / 50)) * 250) + 500, 500);
            // context.lineTo(((Math.sin(frame / 30)) * 250) + 800, ((Math.sin(frame / 50)) * 250) + 500);
            // context.lineTo(200, ((Math.sin(frame / 100)) * 250) + 500);

            // context.fill();
            // console.log("fill");