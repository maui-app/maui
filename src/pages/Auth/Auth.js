import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";
import Footer from "../../components/Footer/Footer";

const Auth = () => {
  const [signup, setSignup] = useState(
    window.location.pathname === "/accounts/new"
  );

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="w-screen">
      <div className={signup ? "h-screen mb-20" : "h-screen"} style={{ height:'90vh' }}>
        <div className="h-2/6 px-24 pt-8 w-full bg-light-grey">
          <div className="flex justify-between items-center">
            <div className="flex nunito text-lg">
              <Link to="/">Maui</Link>
              <p className="mx-1">|</p>
              {signup ? (
                <Link
                  onClick={() => {
                    setSignup(!signup);
                  }}
                  to="/session/new"
                >
                  Login
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    setSignup(!signup);
                  }}
                  to="/accounts/new"
                >
                  Signup
                </Link>
              )}
            </div>
            <div className="invisible">
              <Button type="outlined">Login</Button>
            </div>
          </div>
        </div>
        <div className="h-4/6 px-24 flex justify-around">
          <div
            className="relative w-1/4"
            style={{ top: "-10%", height: "370px" }}
          >
            <img
              src="/images/auth/woman-standing.jpg"
              className="object-cover w-full h-full"
              alt="woman smiling"
              style={{ height: "370px" }}
            />
          </div>
          <div
            className="relative w-1/3 bg-white h-fc"
            style={{ top:signup ? '-25%' : '-10%', border: "1px solid rgba(0,0,0,0.05)" }}
          >
            <Switch>
              <Route exact path="/accounts/new">
                <Signup />
              </Route>
              <Route exact path="/session/new">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;