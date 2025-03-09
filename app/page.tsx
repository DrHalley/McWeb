"use client";
import { useState } from "react";

export default function Home() {
    const [serverIp, setServerIp] = useState("");
    const [port, setPort] = useState("");
    const [password, setPassword] = useState("");
    const [command, setCommand] = useState("");
    const [message, setMessage] = useState("");

    const sendCommand = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMessage(""); 
  
      try {
          const response = await fetch("/api/sendCommand", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ serverIp, port, password, command }),
          });
  
          const data = await response.json(); 
  
          
          setMessage(typeof data.message === "string" ? data.message : JSON.stringify(data));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
          setMessage("Bir hata oluştu!");
      }
  };

    return (
        <div>
            <h1 className="text-3xl">Minecraft Command Sender</h1>
            <form onSubmit={sendCommand}>
                <input
                    type="text"
                    placeholder="Server IP"
                    value={serverIp}
                    onChange={(e) => setServerIp(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="API Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    required
                />
                <button type="submit">Send Command</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
