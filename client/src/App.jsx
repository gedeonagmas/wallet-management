import { Route, Routes } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HomeTemplate from "./pages/HomeTemplate";
import SignUp from "./pages/SignUp";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import ChangePassword from "./pages/dashboard/ChangePassword";
import UsersProfile from "./pages/dashboard/UsersProfile";
import Login from "./pages/Login";
import Overview from "./pages/dashboard/Overview";
import Topup from "./pages/dashboard/Topup";
import Use from "./pages/dashboard/Use";
import Status from "./pages/dashboard/Status";

function App() {
  const user = JSON.parse(localStorage.getItem("wallet_user"));

  return (
    <Flowbite>
      <div className="font-poppins text-black overflow-hidden text-dark bg-dark">
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route path="/" element={<Home />}></Route>
            {!user && (
              <Route path="/signup" element={<SignUp type="user" />}></Route>
            )}

            {!user && <Route path="/login" element={<Login />}></Route>}
            <Route path="/forget" element={<Forget />}></Route>
            <Route path="/reset" element={<Reset />}></Route>
          </Route>

          {user && (
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path={`/dashboard`} element={<Overview />}></Route>

              <Route
                path="/dashboard/profile"
                element={<UsersProfile />}
              ></Route>
              <Route path="/dashboard/status" element={<Status />}></Route>
              <Route path="/dashboard/topup" element={<Topup />}></Route>
              <Route path="/dashboard/withdraw" element={<Use />}></Route>

              <Route
                path="/dashboard/change-password"
                element={<ChangePassword />}
              ></Route>
            </Route>
          )}
          <Route path="*" element={<HomeTemplate />}></Route>
        </Routes>
      </div>
    </Flowbite>
  );
}

export default App;
