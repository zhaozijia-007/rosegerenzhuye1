"use client";

import React, { useState } from "react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "你好！我是 Rose 的数字分身，有什么可以帮助你的吗？",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      isUser: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setError(null);
    setIsLoading(true);

    try {
      // 调用后端 API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((msg) => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.content,
            })),
            {
              role: "user",
              content: inputText.trim(),
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        isUser: false,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("无法获取 AI 回复，请稍后再试");
      
      // 添加错误提示消息
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "抱歉，我暂时无法回复你的消息。请稍后再试。",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  const handleToggleChat = () => {
    if (!isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    } else {
      setIsOpen(false);
      setIsAnimating(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInputText(text);
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 气泡引导 */}
      {!isOpen && (
        <div
          className="absolute -left-32 -top-8 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center animate-bounce"
          style={{
            animationDuration: "3s",
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        >
          <span className="text-sm font-bold text-gray-800">你好呀阿鲁 👋</span>
          <div className="absolute right-0 bottom-0 transform translate-x-[80%] translate-y-[70%] w-0 h-0 border-t-8 border-l-8 border-t-transparent border-l-white"></div>
        </div>
      )}

      {/* 悬浮按钮 */}
      <button
        onClick={handleToggleChat}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/70 to-indigo-500/70 text-white flex items-center justify-center shadow-lg hover:from-purple-600/80 hover:to-indigo-600/80 transition-all duration-300 hover:scale-110 hover:rotate-5 active:scale-95"
        aria-label={isOpen ? "关闭聊天" : "打开聊天"}
      >
        <img
          src="/images/avatar.png"
          alt="Rose"
          className="w-12 h-12 rounded-full object-cover"
        />
      </button>

      {/* 聊天框 */}
      {(isOpen || isAnimating) && (
        <div
          className={`absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55) ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        >
          {/* 聊天框头部 */}
          <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src="/images/avatar.png"
                alt="Rose"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900">Rose 的数字分身</h3>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="text-green-500">🟢</span>
                  <span className="text-xs text-gray-500">AI 在线中</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleToggleChat}
              className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
              aria-label="关闭"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 消息列表 */}
          <div className="p-4 h-80 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4 items-start`}
              >
                {!message.isUser && (
                  <img
                    src="/images/avatar.png"
                    alt="AI"
                    className="w-8 h-8 rounded-full mr-2 flex-shrink-0 object-cover"
                  />
                )}
                <div
                  className={`max-w-[80%] px-4 py-2 shadow-sm ${message.isUser
                    ? "bg-black text-white rounded-2xl rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none"
                    }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {/* 快捷提问 */}
            {messages.length === 1 && !isLoading && !error && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleSuggestionClick("介绍一下加班倒计时")}
                  className="w-full text-left px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                >
                  介绍一下加班倒计时
                </button>
                <button
                  onClick={() => handleSuggestionClick("你的技术栈是？")}
                  className="w-full text-left px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                >
                  你的技术栈是？
                </button>
                <button
                  onClick={() => handleSuggestionClick("联系方式")}
                  className="w-full text-left px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                >
                  联系方式
                </button>
              </div>
            )}

            {/* 加载状态 */}
            {isLoading && (
              <div className="flex justify-start mb-4 items-start">
                <img
                  src="/images/avatar.png"
                  alt="AI"
                  className="w-8 h-8 rounded-full mr-2 flex-shrink-0 object-cover"
                />
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="flex justify-center mb-4">
                <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-red-100 text-red-600">
                  {error}
                </div>
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入消息..."
                disabled={isLoading}
                className={`flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputText.trim() === ""}
                className={`p-2 rounded-full transition-colors duration-300 ${isLoading || inputText.trim() === "" ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                aria-label="发送"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;