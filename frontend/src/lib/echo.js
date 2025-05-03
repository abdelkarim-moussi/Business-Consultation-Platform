import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "3e9c83178cddfab8b1f2",
  cluster: "eu",
  forceTLS: true,
  authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  },
});

export default echo;
