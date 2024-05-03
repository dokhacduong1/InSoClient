import "./SliderHome.scss";

import { ConfigProvider, Menu } from "antd";
import { FaUsers } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { LuFileSpreadsheet } from "react-icons/lu";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { FaUserPlus } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { IoPrint } from "react-icons/io5";


function SliderHome() {

const items = [
 
  {
    key: "/",

    label: <Link to="/">Trang chủ</Link>,
    icon: <IoHomeOutline />,
  },
  {
    key: "/print-sheet",

    label: <Link to="/print-sheet">In sớ</Link>,
    icon: <IoPrint />,
  },
  {
    key: "/add-info",

    label: <Link to="/add-info">Thêm thông tin</Link>,
    icon: <FaUserPlus />,
  },
  {
    key: "/manage-info",
    label: <Link to="/manage-info"> Quản lý thông tin</Link>,
    icon: <FaUsers />,
  },
  {
    key: "/add-sheet",

    label: <Link to="/add-sheet"> Thêm sớ mới</Link>,
    icon: <HiOutlineDocumentPlus />,
  },
  {
    key: "/manage-sheet",

    label: <Link to="/manage-sheet">Quản lý sớ</Link>,
    icon: <LuFileSpreadsheet />,
  },
  {
    key: "/1",
  },
  {
    key: "/2",
  },
  {
    key: "/3",
  },
];
  //Lấy thông tin quyền từ store của  redux
  let location = useLocation();

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "#363636",
              popupBg: "#000",
              itemColor: "#fff",
              horizontalItemSelectedColor: "#ff0000",
              horizontalItemHoverColor: "#ff0000",
              itemSelectedColor: "#ff0000",
              itemActiveBg: "#ff0000",
              itemHoverColor: "#ff0000",
              itemSelectedBg: "#fff",
              itemHoverBg: "#fff",

              itemHeight: 80,
              dangerItemActiveBg: "#fff",
              subMenuItemBg: "#000",
              itemDisabledColor: "#fff",
            },
          },
          token: {
            colorSplit: "#fff",
            fontSize: 14,
            lineHeight: 1.8,
            borderRadius: 0,
          },
        }}
      >
        <Menu
       
         
         defaultSelectedKeys={['/']}
         defaultOpenKeys={['/']}
          selectedKeys={location.pathname}
        
         
          items={items}
        />
      </ConfigProvider>
    </>
  );
}
export default SliderHome;
