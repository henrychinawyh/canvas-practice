import { Layout, Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";

import routes from "./config/routes";

const { Sider, Content, Header } = Layout;

function App() {
  const [activeKey, setActiveKey] = useState("");

  useLayoutEffect(() => {
    setActiveKey(window.location.pathname);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div
          style={{
            padding: 24,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Canvas
        </div>

        {/* 菜单配置 */}
        <Menu
          selectedKeys={[activeKey]}
          onClick={({ key }) => setActiveKey(key)}
        >
          {routes.map((item) => (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#ffffff" }}></Header>
        <Content
          style={{
            margin: 16,
            background: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            {routes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
