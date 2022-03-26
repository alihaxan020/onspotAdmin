import React, { useState, useEffect } from "react";
import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import axios from "axios";
import { baseUrl } from "../constants/BaseUrl";
const Main = () => {
  const [userData, setUserData] = useState([]);
  const [counselorData, setCounselorData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [appointmentPrice, setAppointmentPrice] = useState("");
  const [requestedCounselors, setRequestedCounselors] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUsersInfo();
  }, []);

  const getUsersInfo = async () => {
    const res = await axios.get(`${baseUrl}/api/getuseraccess`);
    console.log(res.data.data);
    setUserInfo(res.data.data);
  };

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello Ali Hassan</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div>
        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Users</p>
              <span className="font-bold text-title">
                {userInfo?.totalUsers}
              </span>
            </div>
          </div>
          <div className="card">
            <i className="fa fa-calendar fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Unblock Users</p>
              <span className="font-bold text-title">
                {userInfo?.unblockedUsers}
              </span>
            </div>
          </div>
          <div className="card">
            <i
              className="fa fa-user-secret fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Total Block Users</p>
              <span className="font-bold text-title">
                {userInfo?.blockedUsers}
              </span>
            </div>
          </div>
          <div className="card">
            <i
              className="fa fa-thumbs-up fa-2x text-green"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Current Month Users</p>
              <span className="font-bold text-title">4</span>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Website Statistics</h1>
                <p>Website statistics based on users searches</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <div className="charts__right__cards">
              <div className="card1">
                <h3>Currently Active</h3>
                <p>${appointmentPrice}</p>
              </div>
              <div className="card2">
                <h3>Daily Searches</h3>
                <p>{requestedCounselors.length}</p>
              </div>
              <div className="card2">
                <h3>Total Brands</h3>
                <p>6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
