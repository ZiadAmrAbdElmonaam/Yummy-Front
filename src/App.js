import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KitchenDetails from "./pages/Kitchen/KitchenDetails";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/UserSignUp";
import JoinUS from "./pages/SignUp/KitchenSignUP";
import PilotSignUP from "./pages/SignUp/PliotSignUp";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/kitchendetails/:id" component={KitchenDetails} />
        <Route path="/login" component={Login} />
        <Route path="/kitchenSignUP" component={JoinUS} />
        <Route path="/PilotSignUp" component={PilotSignUP} />
        <Route path="/userSignUp" component={SignUp} />
        <Route path="/" exact component={Home} />
        {/* <Route path="*" exact component={NotFound}/> */}
      </Switch>
    </Router>
  );
}

export default App;
