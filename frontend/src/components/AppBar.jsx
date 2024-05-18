import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function AppBar({}) {
  const navigate = useNavigate();

  function onClick() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex pr-2">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
        <div className="flex flex-col justify-center h-full mr-4 pl-1 pt-2">
          <Button label={"Logout"} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
