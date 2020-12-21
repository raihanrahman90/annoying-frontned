import './App.css';
import LoginUser from './page/User/Login';
import LoginAdmin from './page/Admin/LoginAdmin';
import Register from './page/User/Register';
import Admin from './page/Admin/Admin';
import ShopNow from './page/User/ShopNow';
import Home from './page/User/Home'
import './style/custom.css';
import PrivateRouter from './components/PrivateRoute';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App font-poppins w-screen">
          <PrivateRouter path="/admin" component={Admin} authed={["Admin", "Super Admin"]}/>
          <Route exact path="/login" component={LoginUser}/>
          <Route exact path="/loginAdmin" component={LoginAdmin}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/barang/:kategori" component={ShopNow}/>
          <Route path="/dashboard" component={Home}/>
          <Route exact path="/">
          <Redirect to="/dashboard/Laki-laki" />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
