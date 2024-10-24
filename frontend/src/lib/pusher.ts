import Pusher from "pusher-js";

const pusher = new Pusher(
  import.meta.env.VITE_PUSHER_APP_KEY || "default-key",
  {
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || "default-cluster",
  }
);
Pusher.logToConsole = true;

export default pusher;
