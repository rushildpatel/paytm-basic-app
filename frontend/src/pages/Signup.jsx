import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  async function onClick() {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
    // localStorage.setItem("currentUserId", )
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
          <InputBox onChange={(e) => setEmail(e.target.value)} placeholder="jdoe@email.com" label={"Email"} type="email" />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="jdrocks" label={"Password"} type="password" />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={onClick} />
          </div>
          <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
