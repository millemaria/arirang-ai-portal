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
    <section
      id="chat"
      className="w-full py-12 sm:py-12 px-3 sm:px-10 flex flex-col items-center"
    >
      <div className="w-full max-w-3xl">
        {/* Section header */}
        <div className="text-center pb-6 sm:pb-10 animate-fade-in-up flex flex-col items-center">
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-medium"
            style={{ color: "var(--theme-primary)" }}
          >
            Distribuído por Gemini AI
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-4"
            style={{ color: "var(--theme-text)" }}
          >
            ARMY Bot 🤖
          </h2>
          <p
            className="text-center text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-5 pb-12 sm:pb-16"
            style={{ color: "var(--theme-text-muted)" }}
          >
            Pergunte qualquer coisa sobre o BTS. Nossa IA sabe todos os fatos! 💬
          </p>
        </div>

        {/* Chat container */}
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col pt-10 sm:pt-14">

          {/* Messages area */}
          <div
            className="h-[500px] sm:h-[520px] overflow-y-auto"
            style={{ scrollbarGutter: "stable" }}
          >
            {/* Inner padding separado para não cortar sombras nas bordas */}
            <div className="px-5 sm:px-8 py-6 flex flex-col gap-8">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  {/* Avatar assistente */}
                  {msg.role === "assistant" && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mb-0.5"
                      style={{
                        background: "rgba(var(--theme-primary-rgb), 0.15)",
                      }}
                    >
                      🤖
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] sm:max-w-[72%] px-5 sm:px-8 py-4 sm:py-5 rounded-2xl ${
                      msg.role === "user"
                        ? "chat-bubble-user rounded-br-sm"
                        : "chat-bubble-assistant rounded-bl-sm"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "var(--theme-primary)" }}
                        >
                          ARMY Bot
                        </span>
                        <span className="text-xs">💜</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                      {isLoading &&
                        msg.id.startsWith("assistant-") &&
                        msg.content === "" && (
                          <span className="typing-indicator inline-flex gap-1 ml-1">
                            <span />
                            <span />
                            <span />
                          </span>
                        )}
                    </p>
                  </div>

                  {/* Avatar usuário */}
                  {msg.role === "user" && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mb-0.5"
                      style={{
                        background: "rgba(var(--theme-primary-rgb), 0.25)",
                      }}
                    >
                      🫰
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div
              className="px-6 sm:px-10 py-6 sm:py-8 flex flex-wrap gap-3 gap-y-5"
              style={{ borderTop: "1px solid var(--theme-border)" }}
            >
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
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
            className="px-5 sm:px-6 py-4 sm:py-5 flex gap-3"
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
              className="flex-1 min-w-0 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 placeholder:opacity-50"
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
              className="btn-primary px-5 sm:px-6 py-3 text-sm rounded-xl flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
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