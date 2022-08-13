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
import Pilot from "./pages/Pilot/Pilot";
import PilotOnlineOrder from "./pages/OnlineOrders/PilotOnlineOrder";

import { useSelector } from "react-redux";
import NotFound from "./pages/Not Found/Notfound";

import PilotOrders from "./pages/Pilot/PilotOrders";
import PilotHistory from "./pages/Pilot/PilotHistory";
import KitchenProfile from "./pages/KitchenProfile/KitchenProfile";
import AddKitchenItem from "./pages/KitchenProfile/AddKitchenItem";
import UserProfile from "./pages/UserProfile/UserProfile";
import EditKitchenItems from "./pages/KitchenProfile/EditKitchenItems";
import Footer from "./components/Footer/Footer";
import AboutUS from "./components/AboutUs/AboutUS";
import ContactUS from "./components/ContactUS/ContactUS";
// import EditForm from "./pages/KitchenProfile/editForm";
function App() {
  let auth = useSelector((state) => {
    // console.log("state is => ", state);
    return state.login.auth;
  });
  if (auth) {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/home/:userid?" exact component={Home} />
          <Route path="/kitchendetails/:id" component={KitchenDetails} />
          <Route path="/login" component={Login} />
          <Route path="/kitchenSignUP" component={JoinUS} />
          <Route path="/PilotSignUp" component={PilotSignUP} />
          <Route path="/userSignUp" component={SignUp} />
          <Route path="/pilot/:id" component={Pilot} />
          <Route path="/onlineOrders/:id" component={PilotOnlineOrder} />
          <Route path="/pilotOnlineOrders/:id" exact component={PilotOrders} />
          <Route path="/pilotHistory/:id" exact component={PilotHistory} />
          <Route path="/kitchen/:kitchenId" component={KitchenProfile} />
          <Route path="/user/:id" component={UserProfile} />
          <Route path="/addKitchenItem/:kitchenId" component={AddKitchenItem} />
          <Route path="/aboutUs" component={AboutUS} />
          <Route path="/contactUs" component={ContactUS} />
          {/* <Route path="/editForm/:kitchenId" component={EditForm} /> */}
          <Route
            path="/editKitchenItems/:kitchenId"
            component={EditKitchenItems}
          />
          <Route path="/" exact component={Home} />
          <Route path="*" exact component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  } else {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
