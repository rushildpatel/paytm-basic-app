import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [balance, setBalance] = useState("0");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      });
  }, []);

  return (
    <div>
      <AppBar />
      <div className="m-12">
        <div className="m-8">
          <Balance value={balance} />
          <div className="pt-3"></div>
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
