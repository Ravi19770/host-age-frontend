import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { sendMessage } from "../services/ai.service";

export default function ChatBot({ onClose }) {
  // ===========================
  // STATES
  // ===========================
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Welcome to Host-Age Support! How can I help you today?",
    },
  ]);

  // ===========================
  // AUTO SCROLL
  // ===========================
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ===========================
  // SEND MESSAGE
  // ===========================
  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const text = message.trim();

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await sendMessage(text);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // UI
  // ===========================
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="flex h-[85vh] w-[95%] max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* LEFT CHAT */}
        <div className="flex flex-1 flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-5 text-white">

            <div>
              <h2 className="text-2xl font-bold">
                Host-Age AI Support
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                Ask anything about Hosting, Domains, Billing & Email.
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
            >
              ✕
            </button>

          </div>

          {/* CHAT BODY */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-6">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 shadow ${msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "border bg-white text-gray-800"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border bg-white px-5 py-3 text-gray-500 shadow">
                  AI is typing...
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="border-t bg-white p-5">

            <div className="flex gap-3">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask anything..."
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className={`rounded-xl px-6 text-white transition ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Sending..." : "Send"}
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 border-l bg-gray-50 p-6">

          <h2 className="text-xl font-bold">
            Support Center
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage your tickets and get instant help.
          </p>

          <Link
            to="/tickets/create"
            onClick={onClose}
            className="mt-6 block rounded-xl bg-blue-600 py-3 text-center font-medium text-white transition hover:bg-blue-700"
          >
            ➕ Create Ticket
          </Link>

          <Link
            to="/tickets"
            onClick={onClose}
            className="mt-3 block rounded-xl border border-blue-600 py-3 text-center font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            🎫 My Tickets
          </Link>

          <hr className="my-6" />

          <h3 className="mb-4 font-semibold">
            Quick Help
          </h3>

          <div className="space-y-3">

            <button
              onClick={() => setMessage("I need help with my domain")}
              className="w-full rounded-lg border bg-white p-3 text-left hover:bg-gray-100"
            >
              🌐 Domain Issues
            </button>

            <button
              onClick={() => setMessage("Help me configure my email")}
              className="w-full rounded-lg border bg-white p-3 text-left hover:bg-gray-100"
            >
              📧 Email Setup
            </button>

            <button
              onClick={() => setMessage("I have a billing problem")}
              className="w-full rounded-lg border bg-white p-3 text-left hover:bg-gray-100"
            >
              💳 Billing
            </button>

            <button
              onClick={() => setMessage("SSL Certificate issue")}
              className="w-full rounded-lg border bg-white p-3 text-left hover:bg-gray-100"
            >
              🔒 SSL Certificate
            </button>

            <button
              onClick={() => setMessage("Hosting support")}
              className="w-full rounded-lg border bg-white p-3 text-left hover:bg-gray-100"
            >
              🚀 Hosting Support
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}