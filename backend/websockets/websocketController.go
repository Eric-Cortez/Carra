package websocket

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var Upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		allowedOrigins := []string{"http://localhost:5173", "https://yourfrontend.com"}
		origin := r.Header.Get("Origin")
		for _, o := range allowedOrigins {
			if o == origin {
				return true
			}
		}
		return false
	},
}

type WebSocketHandler struct {
	clients   map[string]*websocket.Conn
	clientMux sync.Mutex
}

func NewWebSocketHandler() *WebSocketHandler {
	return &WebSocketHandler{
		clients: make(map[string]*websocket.Conn),
	}
}

func (wsHandler *WebSocketHandler) HandleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := Upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade failed:", err)
		return
	}
	defer conn.Close()

	clientUUID := uuid.New().String()

	wsHandler.clientMux.Lock()
	wsHandler.clients[clientUUID] = conn
	wsHandler.clientMux.Unlock()

	response := map[string]interface{}{
		"type":    "id",
		"content": clientUUID,
	}
	responseJSON, _ := json.Marshal(response)
	conn.WriteMessage(websocket.TextMessage, responseJSON)

	log.Printf("New connection established. Client UUID: %s", clientUUID)

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}

		log.Printf("Received from %s: %s\n", clientUUID, p)

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println("Error sending message:", err)
			break
		}
	}

	wsHandler.clientMux.Lock()
	delete(wsHandler.clients, clientUUID)
	wsHandler.clientMux.Unlock()
	log.Printf("Client %s disconnected", clientUUID)
}

func (wsHandler *WebSocketHandler) StartServer(port string) {
	http.HandleFunc("/ws", wsHandler.HandleConnection)

	server := &http.Server{
		Addr:    ":" + port,
		Handler: nil,
	}

	go func() {
		log.Printf("WebSocket server started on ws://localhost:%s\n", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("ListenAndServe error: %v", err)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)
	<-stop

	log.Println("Shutting down the server...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown Failed: %v", err)
	}
	log.Println("Server gracefully stopped")
}
