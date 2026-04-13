'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export default function AIAssistantPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/recommendations-chat',
    body: {
      userId,
    },
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              AI
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Career Advisor Assistant</h1>
              <p className="text-gray-600">Get personalized guidance on your internship search</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="text-3xl">💬</div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Welcome to Your Career Advisor
                  </h2>
                  <p className="text-gray-600 max-w-md">
                    Ask me anything about internships, career guidance, interview prep, or how your skills match with opportunities.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 w-full">
                  <button
                    onClick={() => {
                      handleInputChange({
                        target: { value: 'What internships would be best for me based on my profile?' },
                      } as any);
                    }}
                    className="p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-700 transition"
                  >
                    What internships suit me?
                  </button>
                  <button
                    onClick={() => {
                      handleInputChange({
                        target: { value: 'How can I prepare for internship interviews?' },
                      } as any);
                    }}
                    className="p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-700 transition"
                  >
                    Interview prep tips
                  </button>
                  <button
                    onClick={() => {
                      handleInputChange({
                        target: { value: 'What skills do I need to develop?' },
                      } as any);
                    }}
                    className="p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-700 transition"
                  >
                    Skill development
                  </button>
                  <button
                    onClick={() => {
                      handleInputChange({
                        target: { value: 'Tell me about the companies hiring' },
                      } as any);
                    }}
                    className="p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-700 transition"
                  >
                    Hiring companies
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                      <Spinner className="w-4 h-4" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about internships, career advice, or interview tips..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <Spinner className="w-4 h-4" />
                ) : (
                  'Send'
                )}
              </Button>
            </form>
          </div>
        </Card>

        {/* Info Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            This AI assistant is here to help guide your internship search and career development. 
            Always research opportunities independently and verify all information.
          </p>
        </div>
      </div>
    </div>
  );
}
