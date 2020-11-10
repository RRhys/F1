import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import Drivers from "./screens/Drivers";
import Home from "./screens/Home";
import Seasons from "./screens/Seasons";
import Season from "./screens/Season";
import Race from "./screens/Race";
import Navbar from "./components/Navbar";

const queryCache = new QueryCache();

function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/season/:season/:race">
            <Race />
          </Route>
          <Route path="/season/:season">
            <Season />
          </Route>
          <Route path="/seasons">
            <Seasons />
          </Route>
          <Route path="/drivers">
            <Drivers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
}

export default App;
