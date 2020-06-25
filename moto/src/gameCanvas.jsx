import React, { useRef, useEffect, useState } from 'react';

let trackPoints = [0, 200, 500, 400, 200, 500, 600, 200]


const testFunc = () => {
    console.log("testFunc_called");
}

const lerp = (a, b, t) => {
    return a + (b - a) * t
}

let noise = x => {
    return lerp(0, 1000, x);
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



        let frame = 0;
        function loop() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            frame += 1;
            context.fillStyle = "#0000ff";

            context.fillStyle = "black";
            context.beginPath();
            // for (let i = 0; i < canvas.width; i++) {
            //     // let currentTrackPoint = context.lineTo(i, lerp(trackPoints[0], trackPoints[1], i));
            //     // console.log(currentTrackPoint);
            // }
            context.moveTo(200, ((Math.sin(frame / 100)) * 250) + 500);
            context.lineTo(600, 1000 - frame);

            context.stroke();
            console.log("fill");
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
