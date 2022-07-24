import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KitchenDetails from "./pages/Kitchen/KitchenDetails";

function App() {
  return (
    <Router>
      {/* <NavComponent /> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/kitchendetails/:id" component={KitchenDetails} />

        {/* <Route path="*" exact component={NotFound}/> */}
      </Switch>
    </Router>
  );
}

export default App;
