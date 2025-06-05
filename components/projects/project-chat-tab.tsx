"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/project';

interface ProjectChatTabProps {
  projectId: string;
  projectName: string;
}

export default function ProjectChatTab({ projectId, projectName }: ProjectChatTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'system',
      message: `Välkommen till chattfunktionen för "${projectName}". Här kan du ställa frågor om normativa krav för ditt projekt.`,
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      sender: 'user',
      message: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        sender: 'bot',
        message: `Detta är ett platshållarsvar. I den fullständiga versionen kommer vi att implementera RAG (Retrieval Augmented Generation) för att hämta relevanta svar om infrastrukturnormer baserat på ditt projekt "${projectName}".`,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-300px)] min-h-[500px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          Normassistenten
        </CardTitle>
        <CardDescription>
          Ställ frågor om normativa krav för ditt projekt
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pr-2 mb-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={cn(
                  "flex",
                  msg.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {msg.sender !== 'user' && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className={
                      msg.sender === 'bot' 
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" 
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }>
                      {msg.sender === 'bot' ? 'AI' : 'I'}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={cn(
                    "max-w-[80%] md:max-w-[70%] rounded-lg px-4 py-3",
                    msg.sender === 'user'
                      ? "bg-blue-600 text-white dark:bg-blue-700"
                      : msg.sender === 'system'
                        ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                        : "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                  )}
                >
                  <p>{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {msg.sender === 'user' && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarFallback className="bg-blue-600 text-white">
                      AS
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-slate-200 dark:bg-slate-700 rounded-lg px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              <span>Minsta djup för 10 kV-kabel?</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              <span>Vilka standarder gäller för {projectName}?</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              placeholder="Skriv en fråga om infrastrukturnormer..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}