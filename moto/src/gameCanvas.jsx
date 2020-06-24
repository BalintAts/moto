import React, { useRef, useEffect, useState } from 'react';



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
            frame += 1;
            context.fillStyle = "#0000ff";
            context.fillRect(0, 0, 500, frame);
            console.log(frame);
            console.log("loop called");
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
