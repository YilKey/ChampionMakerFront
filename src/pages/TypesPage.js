import Navbar from "../components/NavBar";
import SideBarLeft from "../components/SideBarLeft";
import SideBarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import TitleLine from "../components/TitleLine";
import { useTypes } from "../api/useTypes";
import TypesList from "../components/TypesList";

const TypePage = () => {
  const { status, data } = useTypes();
  return (
    <div className="containerBody">
      <SideBarLeft />
      <div className="content">
        <Navbar />
        <TitleLine small={"Learn more about our"} big={"TYPES"} />
        <div>
          {status === "loading" && <div> Loading data ... </div>}
          {status === "error" && <div> Error fetching data </div>}
          {status === "success" && (
            <TypesList status={status} types={data.data} />
          )}
        </div>
        <Footer />
      </div>
      <SideBarRight />
    </div>
  );
};

export default TypePage;
