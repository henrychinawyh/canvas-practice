/**
 * 时钟
 */

import { useEffect, useRef } from "react";

const Clock = () => {
  const canvasRef = useRef();
  const timer = useRef();
  console.log(1)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 400;

    // 获取canvas绘制上下文对象
    const ctx = canvas.getContext("2d"); // 获取二维、平面的绘制

    timer.current = setInterval(() => {
      getClock(ctx);
    }, 1000);
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  //   获取时分秒并画指针和刻度
  const getClock = (ctx) => {
    ctx.save(); // 初始状态
    ctx.clearRect(0, 0, 400, 400); // 清除上一次画在画布的内容
    ctx.translate(200, 200); // 设置中心点
    ctx.save();

    // 画外圆和中心圆
    ctx.beginPath(); // 开始设置画线路径
    ctx.arc(0, 0, 150, 0, 2 * Math.PI); // 设置圆的路径
    ctx.stroke(); // 画线操作
    ctx.closePath(); // 结束画线路径

    ctx.beginPath(); // 开始设置画线路径
    ctx.arc(0, 0, 5, 0, 2 * Math.PI); // 设置圆的路径
    ctx.stroke(); // 画线操作
    ctx.closePath(); // 结束画线路径

    // 绘制小时的刻度
    for (let i = 0; i < 12; i++) {
      ctx.save();
      ctx.lineWidth = 5;
      ctx.rotate((i * 2 * Math.PI) / 12 - Math.PI / 2);
      ctx.beginPath();
      ctx.moveTo(150, 0);
      ctx.lineTo(140, 0);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    for (let i = 0; i < 60; i++) {
      ctx.save();
      ctx.lineWidth = 2;
      ctx.rotate((i * 2 * Math.PI) / 60 - Math.PI / 2);
      if (i % 5) {
        ctx.beginPath();
        ctx.moveTo(150, 0);
        ctx.lineTo(145, 0);
        ctx.stroke();
        ctx.closePath();
      }
      ctx.restore();
    }

    // 获取时分秒
    let date = new Date();
    let hour = date.getHours() % 12; // 取余得到12小时制
    let min = date.getMinutes();
    let sec = date.getSeconds();

    // 画时针
    ctx.save();
    ctx.rotate(
      hour * ((2 * Math.PI) / 12) +
        ((2 * Math.PI) / 12) * (min / 60) -
        Math.PI / 2
    ); // 时针转的度数 + 分针转的度数带动时针转的度数
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(50, 0);
    ctx.lineWidth = 12;
    ctx.stroke();
    ctx.restore();

    // 画分针
    ctx.save();
    ctx.rotate(
      ((2 * Math.PI) / 60) * min +
        ((2 * Math.PI) / 60) * (sec / 60) -
        Math.PI / 2
    ); // 分针转的度数 + 秒针转的度数带动分针转的度数
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(100, 0);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.restore();

    // 画秒针
    ctx.save();
    ctx.rotate(((2 * Math.PI) / 60) * sec - Math.PI / 2); // 秒针转的度数
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(130, 0);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.restore();

    ctx.restore();
    ctx.restore();
  };

  return <canvas ref={canvasRef}></canvas>;
};

export default Clock;
