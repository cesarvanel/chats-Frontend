import { useMemo } from "react";
import "./sidebar.scss";
import { useLocation, Link } from "react-router-dom";
import { useAppSelector } from "../../states/stores/stores";
import { useSessionContext } from "../../context/session.context";

const Sidebar = () => {
  const router = useLocation();

  const { sesUser } = useAppSelector((state) => state.user);
  const { logout } = useSessionContext();

  const likns = [
    { label: "Contact", router: "/", id: 1 },
    { label: "Groupe", router: "/groupe", id: 2 },
    { label: "Profile", router: "/profile", id: 3 },
  ];

  const index = useMemo(() => {
    return likns.findIndex((link) => link.router === router.pathname);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <div className="Sidebar">
      <div className="contains">
        <img src={`data:image/svg+xml;base64,${sesUser?.avatar}`} alt="" />
        <div className="user">
          <div>{sesUser?.username}</div>
          <div>{sesUser?.job}</div>
        </div>
      </div>

      <div className="sideBar">
        {likns.map((link) => {
          const active = link.id === index + 1;
          return (
            <Link key={link.id} to={`${link.router}`}>
              <div key={link.id} className={`item ${active && "active"}`}>
                <li>{link.label}</li>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="setting">
        <hr />

        <div className="item">
          <button>Setting</button>
        </div>
        <div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
