import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Bot, User, Send, MessageCircle, Code, GraduationCap } from "lucide-react";
import type { ChatMessage } from "@shared/schema";

interface ChatResponse {
  userMessage: ChatMessage;
  aiMessage: ChatMessage;
}

export default function AIChat() {
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: chatHistory = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/history"],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat", {
        content,
        sender: "user"
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/history"] });
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "خطأ في الإرسال",
        description: "فشل في إرسال الرسالة. تأكد من أن مفتاح Gemini API مُعرف بشكل صحيح.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessageMutation.mutate(message.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="pt-20 pb-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] bg-clip-text text-transparent">
            <Bot className="inline mr-4 text-[var(--accent-purple)]" />
            مساعد الذكاء الاصطناعي Gemini
          </h1>
          <p className="text-lg text-gray-300">تحدث معي واحصل على إجابات ذكية لأسئلتك</p>
        </div>

        {/* Chat Container */}
        <Card className="glass-card rounded-2xl mb-6 border-white/10">
          <CardContent className="p-6">
            <ScrollArea className="h-96 pr-4" ref={scrollRef}>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-blue)]"></div>
                </div>
              ) : chatHistory.length === 0 ? (
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <Card className="glass-card rounded-lg p-4 max-w-xs lg:max-w-md border-white/10">
                    <p className="text-sm">مرحباً! أنا مساعد الذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟</p>
                  </Card>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Welcome message */}
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <Card className="glass-card rounded-lg p-4 max-w-xs lg:max-w-md border-white/10">
                      <p className="text-sm">مرحباً! أنا مساعد الذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم؟</p>
                    </Card>
                  </div>
                  
                  {chatHistory.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start space-x-3 rtl:space-x-reverse ${
                        msg.sender === "user" ? "justify-end" : ""
                      }`}
                    >
                      {msg.sender === "ai" && (
                        <div className="w-10 h-10 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      
                      <Card className={`rounded-lg p-4 max-w-xs lg:max-w-md border-white/10 ${
                        msg.sender === "user" 
                          ? "bg-[var(--accent-blue)] text-white" 
                          : "glass-card"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString("ar-EG", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </p>
                      </Card>
                      
                      {msg.sender === "user" && (
                        <div className="w-10 h-10 bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {sendMessageMutation.isPending && (
                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <Card className="glass-card rounded-lg p-4 max-w-xs lg:max-w-md border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <p className="text-sm">جاري الكتابة...</p>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Input */}
        <Card className="glass-card rounded-xl border-white/10">
          <CardContent className="p-4">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-[var(--dark-tertiary)] border-gray-600 text-white placeholder-gray-400 focus:border-[var(--accent-blue)]"
                disabled={sendMessageMutation.isPending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || sendMessageMutation.isPending}
                className="bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] hover:scale-105 transition-transform duration-300"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-white/10">
            <CardContent className="pt-6">
              <MessageCircle className="text-[var(--accent-blue)] w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">أسئلة عامة</h3>
              <p className="text-gray-300 text-sm">اسأل أي سؤال واحصل على إجابة مفصلة</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-white/10">
            <CardContent className="pt-6">
              <Code className="text-[var(--accent-purple)] w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">مساعدة برمجية</h3>
              <p className="text-gray-300 text-sm">حل مشاكل البرمجة وتعلم تقنيات جديدة</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 border-white/10">
            <CardContent className="pt-6">
              <GraduationCap className="text-[var(--accent-green)] w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">مساعدة تعليمية</h3>
              <p className="text-gray-300 text-sm">شرح المفاهيم والمساعدة في الدراسة</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
