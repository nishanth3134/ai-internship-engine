'use client';

import { useChat, DefaultChatTransport } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, MessageCircle, Send } from 'lucide-react';

const QUICK_QUESTIONS = [
  'How do I apply for internships?',
  'What skills should I develop?',
  'How do I prepare for interviews?',
  'How are recommendations calculated?',
  'What is my profile completion status?',
];

export function AIHelpBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input = '', setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai/recommendations-chat',
    }),
    body: { userId },
  });

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');
    if (token) {
      setUserId(token);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!mounted || !userId) {
    return null;
  }

  const handleQuickQuestion = (question: string) => {
    const form = new FormData();
    const newMessages = [
      ...messages,
      { role: 'user', content: question } as any,
    ];

    handleInputChange({ target: { value: question } } as any);
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} } as any);
    }, 0);
  };

  return (
    <>
      {/* Help Bot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:shadow-xl z-40"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold text-lg">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-800 rounded transition-colors"
              aria-label="Close AI Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Quick Questions:
                </p>
                {QUICK_QUESTIONS.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-2 rounded bg-white hover:bg-blue-50 border border-gray-200 text-sm text-gray-700 transition-colors hover:border-blue-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      } text-sm`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-3 flex gap-2"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              className="flex-1 text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input || !input.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
