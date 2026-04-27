"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { ChatMessage } from "@/lib/types";
import { sendChatMessage } from "@/lib/api";

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Annyeonghaseyo! 💜 Sou o ARMY Bot, seu companheiro de conhecimento do BTS. Pergunte-me qualquer coisa sobre o BTS — história, membros, álbuns, conquistas ou curiosidades! Borahae! 🫰",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const assistantId = `assistant-${Date.now()}`;
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const stream = await sendChatMessage(userMessage.content);
      const reader = stream.getReader();

      let fullContent = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullContent += value;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: fullContent } : m
          )
        );
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Mianhe! 😅 Não consegui conectar ao serviço de IA. Verifique se o servidor e o ChromaDB estão rodando. Tente novamente mais tarde! 💜",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const suggestedQuestions = [
    "Quem são os membros do BTS?",
    "O que significa Borahae?",
    "Fale-me sobre a era Wings",
    "Conquistas do BTS na Billboard",
  ];

  return (
    <section id="chat" className="w-full py-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Section header */}
        <div className="text-center mb-10 animate-fade-in-up flex flex-col items-center">
          <span
            className="text-sm tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--theme-primary)" }}
          >
            Distribuído por Gemini AI
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ color: "var(--theme-text)" }}
          >
            ARMY Bot 🤖
          </h2>
          <p
            className="text-center text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Pergunte qualquer coisa sobre o BTS. Nossa IA sabe todos os fatos! 💬
          </p>
        </div>

        {/* Chat container */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Messages area */}
          <div
            className="h-[450px] overflow-y-auto px-8 py-6 space-y-6"
            style={{ scrollbarGutter: "stable" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] px-6 py-4 ${
                    msg.role === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-assistant"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: "var(--theme-primary)" }}>
                        ARMY Bot
                      </span>
                      <span className="text-xs" style={{ color: "var(--theme-text-muted)" }}>💜</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                    {isLoading && msg.id.startsWith("assistant-") && msg.content === "" && (
                      <span className="typing-indicator inline-flex gap-1 ml-1">
                        <span />
                        <span />
                        <span />
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div className="px-8 pb-5 pt-2 flex flex-wrap gap-3">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    background: "rgba(var(--theme-primary-rgb), 0.1)",
                    color: "var(--theme-primary)",
                    border: "1px solid rgba(var(--theme-primary-rgb), 0.2)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="p-6 flex gap-4"
            style={{
              borderTop: "1px solid var(--theme-border)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre o BTS..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 placeholder:opacity-50"
              style={{
                background: "var(--theme-surface)",
                color: "var(--theme-text)",
                border: "1px solid var(--theme-border)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--theme-primary)";
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(var(--theme-primary-rgb), 0.1)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--theme-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-primary px-6 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="typing-indicator inline-flex gap-1">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                "Enviar"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
