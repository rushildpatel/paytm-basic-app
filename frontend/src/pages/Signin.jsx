import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import ButtonWarning from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onClick() {
    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username: email,
      password: password,
    });
    localStorage.setItem("token", response.data.token);
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="jdoe@email.com"
            label={"Email"}
            type={"email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="jdrocks"
            label={"Password"}
            type="password"
          />
          <div className="pt-4">
            <Button onClick={onClick} label={"Sign in"} />
          </div>
          <ButtonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
}

export default Signin;
