/**
 * 刮刮乐
 */

import { useEffect, useRef, useState } from "react";

import Button from "antd/lib/button";

const Lottery = () => {
  const awards = ["谢谢惠顾", "0.5元", "1元", "5元", "10元", "20元", "50元"];
  const [award, setAward] = useState("谢谢惠顾");
  const canvas = useRef();
  const draw = useRef();
  const isDraw = useRef(false);

  useEffect(() => {
    // 设置奖品
    const random = Math.floor(Math.random() * 7);
    setAward(awards[random]);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // 获取canvas的ctx上下文对象
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");

    ctx.clearRect(0, 0, 400, 250);

    // 设置刮刮奖初始图案
    ctx.fillStyle = "grey"; // 设置背景图为灰色
    ctx.fillRect(0, 0, 400, 250);
    ctx.fillStyle = "white";
    ctx.font = "24px SimSun, Songti SC";
    ctx.fillText("刮刮乐", 160, 140);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   鼠标按下
  const mouseDown = () => {
    isDraw.current = true;
  };

  //   鼠标抬起
  const mouseUp = () => {
    isDraw.current = false;
  };

  //   鼠标移动
  const mouseMove = (e) => {
    if (!isDraw.current) return;
    const x = e.pageX - draw.current.offsetLeft; // 获取到相对与画布左上角的位置
    const y = e.pageY - draw.current.offsetTop;

    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  return (
    <div
      style={{
        position: "relative",
        width: 400,
        height: 250,
      }}
      ref={draw}
    >
      <canvas
        style={{
          position: "absolute",
          zIndex: 2,
        }}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        ref={canvas}
        width={400}
        height={250}
      ></canvas>

      <div
        style={{
          position: "absolute",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 400,
            height: 250,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 32,
            zIndex: -1,
          }}
        >
          {award === "谢谢惠顾" ? award : `恭喜您获得 ${award}`}
        </div>
      </div>
    </div>
  );
};

export default Lottery;
