
import "./header.scss";
import { MenuOutlined } from "@ant-design/icons";


function Header({ setIsCollapsed, isCollapsed }) {
  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <nav className="headerEmployer text-left">
        <div className="flex-div gx-1 align-items-center">
          <div className="headerEmployer__header">
            <button
              onClick={handleCollapsed}
              className="headerEmployer__button"
            >
              <MenuOutlined />
            </button>
            <a href="#!">
              <span className=" headerEmployer__logo">Tĩnh Gia Tự</span>
            </a>
          </div>

          
        </div>
      </nav>
    </>
  );
}
export default Header;
