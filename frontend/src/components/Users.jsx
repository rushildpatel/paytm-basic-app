import { useState } from "react";
import User from "./User";

export default function Users() {
  const [users, setUsers] = useState([{ firstName: "Rushil", lastName: "Patel", _id: 1 }]);

  return (
    <div>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
      </div>
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
}
