import { useEffect, useState } from "react";

const useWebsocket = () => {
  const url = "ws://localhost:8080/ws";
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection open");
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "id":
          setSocketId(data.content);
          break;
        default:
          console.log("Unknown message type:", data.type);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    ws.onerror = error => {
      /*
      if the websocket connection opens twice it's because of react strict mode.
      This will not happen in a production environment. We can ignore it.
      */
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return { socket, isConnected, sendMessage, socketId };
};

export default useWebsocket;
