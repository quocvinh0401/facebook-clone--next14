"use client";

import { useEffect, useRef } from "react";

const Game = () => {
  let canvasElement = useRef<null | HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null = null;

  let timeOutLoop: NodeJS.Timeout;

  const loop = () => {
    draw();
    update();
    // console.log("loop");
    timeOutLoop = setTimeout(() => loop(), 100);
  };

  const draw = () => {};

  const update = () => {};

  const init = () => {
    canvasElement.current = document.querySelector("canvas")!;
    const canvas = canvasElement.current;

    context = canvas.getContext("2d")!;

    canvas.width = 320;
    canvas.height = 600;
  };

  useEffect(() => {
    init();
    loop();

    return () => clearTimeout(timeOutLoop);
  }, []);

  return (
    <div>
      <canvas></canvas>
    </div>
  );
};
export default Game;
