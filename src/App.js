import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KitchenDetails from "./pages/Kitchen/KitchenDetails";
import NavBar from "./components/NavBar/NavBar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/kitchendetails/:id" component={KitchenDetails} />
        {/* <Route path="/login" component={SignIn} /> */}
        {/* <Route path="/signUp" component={SignUp} /> */}
        <Route path="/" exact component={Home} />
        {/* <Route path="*" exact component={NotFound}/> */}
      </Switch>
    </Router>
  );
}

export default App;
