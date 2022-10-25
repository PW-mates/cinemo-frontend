import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import Movies from "./components/Movies/Movies";
import Cinemas from "./components/Cinemas/Cinemas";

const App: React.FC = (): JSX.Element => {
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);

  return (
    <MainLayout>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        {!isAuth && (
          <Route path="/login">
            <LoginPage />
          </Route>
        )}
        {isAuth && (
          <>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/cinemas">
              <Cinemas />
            </Route>
          </>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </MainLayout>
  );
};

export default App;
