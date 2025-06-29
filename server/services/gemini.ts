import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI client
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" 
});

export async function chatWithGemini(userMessage: string): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    const systemPrompt = `أنت مساعد ذكي ومفيد تتحدث باللغة العربية. 
اسمك هو مساعد محمود الذكي، وأنت تساعد الزوار في موقع mahmoudotaku24 الشخصي.
محمود هو طالب ثانوية عامة محب للبرمجة والذكاء الاصطناعي.

قدم إجابات مفيدة ومفصلة باللغة العربية، وكن ودودًا ومتعاونًا.
إذا سُئلت عن البرمجة أو الذكاء الاصطناعي، قدم شرحًا واضحًا ومفيدًا.
إذا سُئلت عن محمود، اذكر أنه طالب متحمس للتقنية ويحب تعلم أشياء جديدة.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: userMessage,
    });

    const aiResponse = response.text;
    
    if (!aiResponse) {
      throw new Error("No response received from Gemini AI");
    }

    return aiResponse;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("مفتاح API الخاص بـ Gemini غير صحيح أو غير موجود. يرجى التحقق من إعدادات البيئة.");
      }
      if (error.message.includes("quota") || error.message.includes("limit")) {
        throw new Error("تم تجاوز حد الاستخدام المسموح لـ Gemini AI. يرجى المحاولة لاحقًا.");
      }
      if (error.message.includes("network") || error.message.includes("connection")) {
        throw new Error("مشكلة في الاتصال بخدمة Gemini AI. يرجى التحقق من الاتصال بالإنترنت.");
      }
    }
    
    throw new Error("حدث خطأ غير متوقع أثناء التواصل مع مساعد الذكاء الاصطناعي. يرجى المحاولة مرة أخرى.");
  }
}

// Additional utility function for enhanced chat responses
export async function getChatResponseWithContext(
  userMessage: string, 
  chatHistory: Array<{content: string, sender: string}> = []
): Promise<string> {
  try {
    // Build context from recent chat history (last 5 messages)
    const recentHistory = chatHistory.slice(-5);
    let contextPrompt = "";
    
    if (recentHistory.length > 0) {
      contextPrompt = "\n\nسياق المحادثة السابقة:\n";
      recentHistory.forEach((msg, index) => {
        const role = msg.sender === "user" ? "المستخدم" : "المساعد";
        contextPrompt += `${role}: ${msg.content}\n`;
      });
    }

    const fullPrompt = userMessage + contextPrompt;
    return await chatWithGemini(fullPrompt);
  } catch (error) {
    // Fallback to basic chat if context processing fails
    return await chatWithGemini(userMessage);
  }
}
