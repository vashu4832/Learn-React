import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      });

    axios
      .get("http://localhost:8080/api/v1/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
  }, []);

  return (
    <div>
      <AppBar user={user}/>
      <div className="m-8">
        <Balance value={balance.toPrecision(7)} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
