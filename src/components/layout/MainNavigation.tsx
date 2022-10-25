import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import classes from "./MainNavigation.module.css";
import { authAction } from "../../store/auth";

const MainNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authAction.logout());
  };

  return (
    <>
      <header className={classes.header}>
        <NavLink
          to="/home"
          className={classes.logo}
          activeClassName={classes.active}>
          Cinema
        </NavLink>
        <nav className={classes.nav}>
          <ul>
            <li>
              {!isAuth && (
                <NavLink to="/login" activeClassName={classes.active}>
                  Login
                </NavLink>
              )}
              {isAuth && (
                <NavLink
                  onClick={logoutHandler}
                  to="/home"
                  activeClassName={classes.active}>
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
      {isAuth && (
        <section className={classes.section}>
          <p>Hello there</p>
        </section>
      )}
    </>
  );
};

export default MainNavigation;
