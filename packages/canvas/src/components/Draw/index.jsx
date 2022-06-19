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
  const typeRef = useRef("");
  const isDraw = useRef(false);
  const color = useRef("#000000");
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "#000000"; // 默认颜色
    const canvasDiv = document.querySelector("#canvas");
    setSize([canvasDiv.offsetWidth, canvasDiv.offsetHeight]);
  }, []);

  //   修改颜色
  const changeColor = (e) => {
    color.current = e.target.value;
  };

  // 切换画笔类型
  const changeType = (type) => {
    typeRef.current = type;
    message.success(`已成功切换成：${TYPE[type]}`);
  };

  //   鼠标按下
  const mouseDown = () => {
    if (!typeRef.current) {
      message.error("请选择画笔类型");
    } else {
      isDraw.current = true;
    }
  };

  //   鼠标抬起
  const mouseUp = () => {
    isDraw.current = false;
  };

  //   鼠标移动
  const mouseMove = (e) => {
    if (!isDraw.current) return;
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");
    const x = e.pageX - 216;
    const y = e.pageY - 136;

    switch (typeRef.current) {
      case "huabi":
        huabiFn(ctx, x, y);
        break;
      default:
        break;
    }
  };

  //   画笔操作
  const huabiFn = (ctx, x, y) => {
    ctx.beginPath();
    ctx.fillStyle = color.current;
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  // 清空操作
  const clearDraw = () => {
    const canvasRef = canvas.current;
    const ctx = canvasRef.getContext("2d");
    ctx.clearRect(0, 0, size[0], size[1]);
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
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          onMouseMove={mouseMove}
          ref={canvas}
          width={size[0]}
          height={size[1]}
        ></canvas>
      </div>
    </div>
  );
};

export default Draw;
