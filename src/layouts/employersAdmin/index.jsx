/* eslint-disable react/jsx-no-comment-textnodes */
import { Layout } from "antd";
import Header from "./header";
import { Outlet } from "react-router-dom";
// import FooterMain from "./footer";
import Sider from "antd/es/layout/Sider";
import SliderHome from "./SliderHome";
import {useState } from "react";
import "./layout.scss";
const { Content } = Layout;

function LayoutMainEmployerAdmin() {

  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Layout className="layout__employer-admin">
        <Header
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          className="layout__header"
        />
        <Layout className="employer-full">
          <Sider
            style={{ marginTop: "4.0rem" }}
            breakpoint="xxl"
            onBreakpoint={(boolean) => {
              setIsCollapsed(boolean);
            }}
            collapsed={isCollapsed}
          >
            <SliderHome   />
          </Sider>
          <Content className="layout__main">
            <Outlet />
          </Content>
        </Layout>

        {/* <FooterMain /> */}
      </Layout>
    </>
  );
}
export default LayoutMainEmployerAdmin;
