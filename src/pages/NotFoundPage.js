import Navbar from "../components/NavBar";
import SideBarLeft from "../components/SideBarLeft";
import SideBarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div className="containerBody">
        <SideBarLeft />
        <div className="content">
          <Navbar />
          <div className="notfound">
            <Link className="link-link notfoundBtn" to={"/"}>
              GO HOME
            </Link>
          </div>
          <Footer />
        </div>
        <SideBarRight />
      </div>
    </>
  );
};

export default NotFoundPage;
