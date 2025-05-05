import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import ChatBox from "../../components/chat/chatBox";

const Chat = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const [otherUser, setOtherUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.log("there was an error", error);
    }
  };

  const fetchAuthUser = async () => {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    const response = await axios.get(
      `http://127.0.0.1:8000/api/user/${decoded.sub}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    setAuthUser(response.data.user);
  };

  useEffect(() => {
    fetchUsers();
    fetchAuthUser();
  }, []);

  return (
    <div className="chat-app grid grid-cols-4 px-5 gap-2 relative pt-20 h-[100vh]">
      <div className="col-span-1 p-5 shadow-md rounded-md sticky top-0">
        <h2 className="font-semibold mb-5 border-b pb-3">
          Select a user to chat with:
        </h2>
        {users.map((user) => (
          <div className="flex gap-2 mb-2" key={user.id}>
            <div className="rounded-full border-2 bg-indigo-500 text-white border-white w-10 h-10 flex items-center justify-center uppercase">
              {user.firstName[0] + user.lastName[0]}
            </div>
            <button
              onClick={() => setOtherUser(user)}
              className={
                otherUser?.id === user.id
                  ? "text-indigo-600 capitalize"
                  : "" + "hover:text-indigo-600 capitalize"
              }
            >
              {user.firstName + " " + user.lastName}
            </button>
          </div>
        ))}
      </div>

      <div className="col-span-3">
        {otherUser ? (
          <ChatBox currentUser={authUser} otherUser={otherUser} />
        ) : (
          <div>Please select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
