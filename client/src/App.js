import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import AnotherHome from "./pages/AnotherHome";
import Header from "./pages/Header";
import Home from "./pages/Home";
import View from "./pages/View";
import Register from "./pages/Register";
import Caterer from "./pages/caterer/Caterer";
import Menu from "./pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={AnotherHome} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/addContact" component={AddEdit} />
          <Route exact path="/update/:id" component={AddEdit} />
          <Route exact path="/view/:id" component={View} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/caterer" component={Menu} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
