import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useLogout, useSession } from "../authContext/AuthProvider";

const NavigationBar = () => {
  //TODO: navbar element active on current page
  // const { pathname } = useLocation();
  const { isAuthed, user } = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);
  return (
    <>
      <div className="nav">
        <div className="nav-title">CHAMPION MAKER</div>
        <div className="nav-links">
          <ul className="nav-ul">
            <div className="div-link-con">
              <Link className={"link-link"} to="/champions">
                <li className="nav-li">CHAMPIONS</li>
              </Link>
            </div>
            <div className="div-link-con">
              <Link to="/types" style={{ textDecoration: "none" }}>
                <li className="nav-li">TYPES</li>
              </Link>
            </div>
            <div className="div-link-con">
              <Link to="/" style={{ textDecoration: "none" }}>
                <li className="nav-li" id="home">
                  HOME
                </li>
              </Link>
            </div>
            {isAuthed ? (
              <>
                <div className="div-link-con" data-cy="nav-collection">
                  <Link
                    to={
                      isAuthed ? `/collection/${user?.userName}/champions` : `/`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <li className="nav-li">COLLECTION</li>
                  </Link>
                </div>
                <div className="div-link-con" data-cy="nav-logout">
                  <li className="nav-li">
                    <button className="logout-btn" onClick={handleLogout}>
                      SIGN OUT
                    </button>
                  </li>
                </div>
              </>
            ) : (
              <>
                <div className="div-link-con" data-cy="nav-login">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <li className="nav-li">LOG IN</li>
                  </Link>
                </div>
                <div className="div-link-con" data-cy="nav-register">
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    <li className="nav-li">REGISTER</li>
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
