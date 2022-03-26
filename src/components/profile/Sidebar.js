import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import logo from "../../assets/logo_transparent.png";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { baseUrl } from "../constants/BaseUrl";
const Sidebar = (props) => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [inUp, setInUp] = useState(true);
  const { isFetching, dispatch } = useContext(AuthContext);

  const adminLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${baseUrl}/api/adminlogin`, {
        email: email,
        password: password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  const adminSignup = async () => {
    console.log("signup called");
    try {
      const signup = await axios.post(`${baseUrl}/api/adminsignup`, {
        email,
        password,
      });
      console.log(signup);
      if (signup.data.success) {
        alert("signup successfull");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    adminSignup();
  };
  return (
    <>
      {inUp ? (
        <>
          <Container>
            <LogoWrapper
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "40px",
              }}
            >
              <img
                style={{ width: "50%" }}
                src="https://primundus.de/wp-content/uploads/2021/04/Logo.svg"
                alt="logo"
              />
            </LogoWrapper>
            <Form>
              <div>
                <h3>
                  <span style={{ color: "#5dc399" }}>Admin</span> Login
                </h3>
              </div>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <button onClick={handleLogin} style={{ marginRight: "30px" }}>
                Sign In
              </button>
            </Form>
            <div>
              <Terms>
                By signing up, I agree to the Privacy Policy <br /> and Terms of
                Service
              </Terms>
              <h4 onClick={() => setInUp(!inUp)}>
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                  Don't have an account? Sign Up
                </Link>
              </h4>
            </div>
          </Container>
        </>
      ) : (
        <Container>
          <LogoWrapper
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "40px",
            }}
          >
            <img
              style={{ width: "50%" }}
              src="https://primundus.de/wp-content/uploads/2021/04/Logo.svg"
              alt="logo"
            />
          </LogoWrapper>
          <Form>
            <div>
              <h3>
                <span style={{ color: "#5dc399" }}>Admin</span> Signup
              </h3>
            </div>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button onClick={handleSignup} style={{ marginRight: "30px" }}>
              Sign Up
            </button>
          </Form>
          <div>
            <Terms>
              By signing up, I agree to the Privacy Policy <br /> and Terms of
              Service
            </Terms>
            <h4 onClick={() => setInUp(!inUp)}>
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                Already have an account? Sign In
              </Link>
            </h4>
          </div>
        </Container>
      )}
    </>
  );
};

const Terms = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 13px;
  color: #808080;
  font-weight: 300;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #666666;
    font-size: 25px;
    margin-left:
    margin-bottom: 10px;
  }

  button {
    max-width: 400px;
    min-width: 300px;
    height: 55px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
    @media (max-width: 550px) {
      min-width: 200px;
      height:45px;
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 12rem;
    padding-left: 15px;
  }

  h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 28px;
  }

  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 24px;
  }
`;

const Container = styled.div`
  width: 550px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100%;
    position: absolute;
    padding: 0;
  }

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 17px;
    margin-top: 2rem;

    span {
      color: #ff8d8d;
      cursor: pointer;
    }
  }
`;
export default Sidebar;
