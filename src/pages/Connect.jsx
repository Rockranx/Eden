import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/images/logo.png";
import logow from "../images/images/logow.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeButton from "./buttons&loaders/ThemeButton";

const Connect = ({ myFunction }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [Accountaddress1, setAccountaddress1] = useState("");
  const [Accountaddress2, setAccountaddress2] = useState("");

  return (
    <div>
      <div className="header landing">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <div className="brand-logo">
                    <NavLink to="/">
                      <img src={logo} alt="" className="logo-primary" />
                      <img src={logow} alt="" className="logo-white" />
                    </NavLink>
                  </div>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto">
                      <li className="nav-item dropdown"></li>
                      <li className="nav-item dropdown"></li>
                      <li className="nav-item"></li>
                    </ul>
                  </div>
                  <div className="signin-btn d-flex align-items-center">
                    <div className="sharer">
                      {!currentAccount ? (
                        <ConnectButton.Custom>
                          {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                          }) => {
                            if (account) {
                              setAccountaddress1(account.address.slice(0, 4));
                              setAccountaddress2(account.address.slice(38, 42));

                              try {
                              } catch (error) {}
                            }
                            return (
                              <>
                              
                              </>
                            );
                          }}
                        </ConnectButton.Custom>
                      ) : (
                        <div className="btn btn-primary">
                        </div>
                      )}
                      <div className="togglebutton">
                        <ThemeButton myFunction={myFunction} />
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
