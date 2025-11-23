"use client";

import { useState, useEffect, useRef } from "react";
import { smartTravelAssistant } from "@/ai/flows/smart-travel-assistant";
import { useFlow } from "@/hooks/use-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Loader2, Send, User, Volume2, VolumeX, Eye, Ear, Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantPage() {
  const t = useTranslations('Assistant');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [displayMode, setDisplayMode] = useState<'audio' | 'visual' | 'sign'>('audio');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [suggestedPlaces, setSuggestedPlaces] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { loading, run } = useFlow(smartTravelAssistant);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    // بدء المحادثة تلقائياً عند تحميل الصفحة
    const startConversation = async () => {
      const welcomeMessage = t('welcomeMessage');
      const initialMessage: Message = { role: "assistant", content: welcomeMessage };
      setMessages([initialMessage]);
      
      // اقتراح أماكن تلقائياً
      const placesQuery = t('suggestPlacesQuery');
      const placesResult = await run({ query: placesQuery });
      if (placesResult && placesResult.answer) {
        const placesMessage: Message = { role: "assistant", content: placesResult.answer };
        setMessages(prev => [...prev, placesMessage]);
        
        // استخراج الأماكن المقترحة من النص
        const places = placesResult.answer.match(/[•\-\*]\s*([^\n]+)/g) || [];
        setSuggestedPlaces(places.map(p => p.replace(/[•\-\*]\s*/, '')));
      }
      
      // قراءة الرسالة صوتياً إذا كان الوضع صوتي
      if (displayMode === 'audio') {
        speakText(welcomeMessage);
      }
    };

    startConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speakText = (text: string) => {
    if (!synthRef.current) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA'; // العربية
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const result = await run({ query: input });

    if (result && result.answer) {
      const assistantMessage: Message = { role: "assistant", content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // قراءة الرد صوتياً إذا كان الوضع صوتي
      if (displayMode === 'audio') {
        speakText(result.answer);
      }
    }
  };

  const handleSuggestedPlaceClick = async (place: string) => {
    const query = `${t('tellMeAbout')} ${place}`;
    setInput(query);
    
    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);

    const result = await run({ query });

    if (result && result.answer) {
      const assistantMessage: Message = { role: "assistant", content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
      
      if (displayMode === 'audio') {
        speakText(result.answer);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto">
        <header className="text-center mb-6">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground mt-2">{t('description')}</p>
            
            {/* اختيار وضع العرض */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <Select value={displayMode} onValueChange={(value: 'audio' | 'visual' | 'sign') => {
                setDisplayMode(value);
                stopSpeaking();
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="audio">
                    <div className="flex items-center gap-2">
                      <Ear className="h-4 w-4" />
                      {t('modes.audio')}
                    </div>
                  </SelectItem>
                  <SelectItem value="visual">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      {t('modes.visual')}
                    </div>
                  </SelectItem>
                  <SelectItem value="sign">
                    <div className="flex items-center gap-2">
                      <Hand className="h-4 w-4" />
                      {t('modes.sign')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {displayMode === 'audio' && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isSpeaking ? stopSpeaking : () => {
                    const lastMessage = messages[messages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                      speakText(lastMessage.content);
                    }
                  }}
                >
                  {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              )}
            </div>
        </header>

        {/* الأماكن المقترحة */}
        {suggestedPlaces.length > 0 && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">{t('suggestedPlaces')}</CardTitle>
              <CardDescription>{t('suggestedPlacesDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
              {suggestedPlaces.map((place, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedPlaceClick(place)}
                >
                  {place}
                </Button>
              ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex-1 flex flex-col border rounded-lg shadow-sm bg-card">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                {messages.map((message, index) => (
                    <div
                    key={index}
                    className={cn(
                        "flex items-start gap-3",
                        message.role === "user" ? "justify-end" : "justify-start"
                    )}
                    >
                    {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={cn(
                        "max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2",
                        message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                    >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        {message.role === "assistant" && displayMode === 'audio' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 h-6"
                            onClick={() => speakText(message.content)}
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        )}
                    </div>
                    {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-4 py-2 flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('placeholder')}
                    className="flex-1"
                    disabled={loading}
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
                </form>
            </div>
        </div>
    </div>
  );
}
