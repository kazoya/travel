"use client";

import { useState } from "react";
import { smartTravelAssistant } from "@/ai/flows/smart-travel-assistant";
import { useFlow } from "@/hooks/use-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Loader2, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AssistantPage() {
  const t = useTranslations('Assistant');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { loading, run } = useFlow(smartTravelAssistant);

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
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-3xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground mt-2">{t('description')}</p>
        </header>

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
