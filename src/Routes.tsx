import { Suspense, lazy } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import App from "./containers/App";
import { routeCodes } from "./constants/routes";

const Home = lazy(() => import("./containers/Home"));
const GamesList = lazy(() => import("./containers/GamesList"));
const Game = lazy(() => import("./containers/Game"));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading... </div>}>
        <App>
          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path={routeCodes.GAMES_LIST} component={GamesList} />
            <Route path={routeCodes.GAME} component={Game} />
          </Switch>
        </App>
      </Suspense>
    </Router>
  );
};

export default Routes;
