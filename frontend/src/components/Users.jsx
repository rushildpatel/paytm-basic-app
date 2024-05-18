import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([{ firstName: "Rushil", lastName: "Patel", _id: 1 }]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUsers(response.data.user);
        });
    }, 2000);
    return () => clearTimeout(getData);
  }, [filter]);

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input onChange={(e) => setFilter(e.target.value)} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
      {/* <div>{users.map((user) => localStorage.getItem("currentUserId") !== user._id && <User key={user._id} user={user} />)}</div> */}
    </div>
  );
}
