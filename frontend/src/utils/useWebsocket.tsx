import { useEffect, useState } from "react";

const useWebsocket = () => {
  const url = "ws://localhost:8080/ws";
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection established");
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
      setMessages(prevMessages => [...prevMessages, data]);
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    ws.onerror = error => {
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

  return { socket, messages, isConnected, sendMessage, socketId };
};

export default useWebsocket;
