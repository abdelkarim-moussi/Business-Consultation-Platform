import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Pusher from "pusher-js";

const ChatBox = ({ currentUser, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/messages/${otherUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    const pusher = new Pusher("3e9c83178cddfab8b1f2", {
      cluster: "eu",
      forceTLS: true,
      authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
    });

    Pusher.logToConsole = true;

    const channelName = `chat.${currentUser.id}`;

    const channel = pusher.subscribe(`${channelName}`);

    channel.bind("message.sent", (data) => {
      if (data.message && data.message.sender_id === otherUser.id) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [currentUser.id, otherUser.id]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(
        ` http://127.0.0.1:8000/api/messages/${otherUser.id}`,
        {
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 className="font-semibold flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          Chat with {otherUser.firstName}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 flex ${
                message.sender_id === currentUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg px-2 py-1 text-xs ${
                  message.sender_id === currentUser.id
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow"
                }`}
              >
                <p className="break-words">{message.message}</p>
                <span
                  className={`text-xs mt-1 block text-right ${
                    message.sender_id === currentUser.id
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {formatTime(message.created_at)}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="p-3 bg-white border-t border-gray-200 rounded-b-lg flex"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || newMessage.trim() === ""}
          className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
