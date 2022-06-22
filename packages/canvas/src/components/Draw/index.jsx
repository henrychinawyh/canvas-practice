/**
 * 画板
 */

import { useEffect, useRef, useState } from "react";

import Button from "antd/lib/button/button";
import Space from "antd/lib/space";
import { message } from "antd";

const TYPE = {
  huabi: "画笔",
  juxing: "矩形",
  yuanxing: "圆形",
};

const Draw = () => {
  const canvas = useRef();
  const typeRef = useRef(""); // 画笔类型
  const isDraw = useRef(false); // 是否可以开始画画
  const color = useRef("#000000"); // 画笔颜色
  const prePosition = useRef({ x: 0, y: 0 }); // 画笔按下时的位置
  const imageData = useRef(); // 画布数据对象
  const [size, setSize] = useState([0, 0]); // 存储画布宽度

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "#000000"; // 默认颜色
    ctx.globalCompositeOperation = "destination-in";
    const canvasDiv = document.querySelector("#canvas");
    setSize([canvasDiv.offsetWidth, canvasDiv.offsetHeight]);
  }, []);

  //   修改颜色
  const changeColor = (e) => {
    console.log(e.target.value);
    color.current = e.target.value;
  };

  // 切换画笔类型
  const changeType = (type) => {
    typeRef.current = type;
    message.success(`已成功切换成：${TYPE[type]}`);
  };

  //   鼠标按下
  const onMouseDown = (e) => {
    if (!typeRef.current) {
      message.error("请选择画笔类型");
    } else {
      const x = e.pageX - 216;
      const y = e.pageY - 136;
      prePosition.current = { x, y }; // 设置画笔按下的位置

      isDraw.current = true;
    }
  };

  //   鼠标抬起
  const onMouseUp = () => {
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");
    imageData.current = ctx.getImageData(0, 0, size[0], size[1]);
    isDraw.current = false;
  };

  //   鼠标移动
  const onMouseMove = (e) => {
    if (!isDraw.current) return;
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");
    const x = e.pageX - 216;
    const y = e.pageY - 136;

    switch (typeRef.current) {
      case "huabi":
        huabiFn(ctx, prePosition.current.x, prePosition.current.y, x, y);
        break;
      case "juxing":
        jxFn(ctx, prePosition.current.x, prePosition.current.y, x, y);
        break;
      case "yuanxing":
        hyFn(ctx, prePosition.current.x, prePosition.current.y, x, y);
        break;
      default:
        break;
    }
  };

  //   画笔操作
  const huabiFn = (ctx, preX, preY, x, y) => {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color.current;
    ctx.moveTo(preX, preY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    prePosition.current = { x, y };
  };

  // 画矩形操作
  const jxFn = (ctx, preX, preY, x = 0, y = 0) => {
    ctx.clearRect(0, 0, size[0], size[1]);
    ctx.beginPath();
    imageData.current &&
      ctx.putImageData(imageData.current, 0, 0, 0, 0, size[0], size[1]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color.current;
    ctx.strokeRect(preX, preY, Math.abs(preX - x), Math.abs(preY - y));
    ctx.closePath();
  };

  // 画圆操作
  const hyFn = (ctx, preX, preY, x = 0, y = 0) => {
    ctx.clearRect(0, 0, size[0], size[1]);
    ctx.beginPath();
    imageData.current &&
      ctx.putImageData(imageData.current, 0, 0, 0, 0, size[0], size[1]);
    ctx.lineWidth = 5;
    ctx.strokeStyle = color.current;
    ctx.arc(
      preX,
      preY,
      Math.round(Math.sqrt(Math.abs(preX - x) ** 2 + Math.abs(preY - y) ** 2)),
      0,
      Math.PI * 2
    );
    ctx.stroke();
    ctx.closePath();
  };

  // 清空操作
  const clearDraw = () => {
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");
    ctx.clearRect(0, 0, size[0], size[1]);
    imageData.current = null;
  };

  // 保存操作
  const saveDraw = () => {
    const src = canvas.current.toDataURL(); // 创建canvas位图的base64地址

    // 创建a标签
    const a = document.createElement("a");
    a.download = "画画图像";
    a.href = src;

    // 点击a标签下载
    a.click();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <nav
        style={{
          padding: 24,
          paddingBottom: 0,
        }}
      >
        <Space>
          <Button
            style={{
              background: "yellow",
            }}
            onClick={() => {
              changeType("huabi");
            }}
          >
            画笔
          </Button>
          <Button
            style={{
              background: "cyan",
            }}
            onClick={() => changeType("juxing")}
          >
            矩形
          </Button>
          <Button
            style={{
              background: "#2db7f5",
            }}
            onClick={() => changeType("yuanxing")}
          >
            圆形
          </Button>
          <input type="color" onChange={changeColor} />

          <Button
            style={{
              background: "volcano",
            }}
            onClick={clearDraw}
          >
            清空
          </Button>
          <Button type="primary" onClick={saveDraw}>
            保存
          </Button>
        </Space>
      </nav>
      <div
        style={{
          flex: 1,
        }}
        id="canvas"
      >
        <canvas
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          ref={canvas}
          width={size[0]}
          height={size[1]}
        ></canvas>
      </div>
    </div>
  );
};

export default Draw;
