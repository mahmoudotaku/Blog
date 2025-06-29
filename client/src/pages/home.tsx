import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import animeProfilePath from "@assets/5811940880590948241_1751205245212.jpg";
import { 
  SiLinkedin, 
  SiInstagram, 
  SiX, 
  SiFacebook, 
  SiGithub 
} from "react-icons/si";
import { Bot, Sparkles, Code, GraduationCap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/محمود-الباشا-7a6a15319/",
      icon: SiLinkedin,
      color: "gradient-linkedin",
      label: "Gravida posuere"
    },
    {
      name: "Instagram", 
      url: "https://www.instagram.com/mahmoudotaku24/",
      icon: SiInstagram,
      color: "gradient-instagram",
      label: "Mattis urna amet"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/Mahmoud_Otaku24", 
      icon: SiX,
      color: "gradient-twitter",
      label: "Arcu lorem"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61554155240416",
      icon: SiFacebook, 
      color: "gradient-facebook",
      label: "Laoreet vulputat"
    },
    {
      name: "GitHub",
      url: "https://github.com/Clowns-gang",
      icon: SiGithub,
      color: "gradient-github",
      label: "Code & Projects"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-20"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
        <div className="max-w-md mx-auto px-4">
          {/* Profile Card - Matching Reference Design */}
          <Card className="profile-card rounded-3xl p-8 transform hover:scale-105 transition-all duration-700 animate-float relative overflow-hidden">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer opacity-30"></div>
            
            <CardContent className="relative z-10 text-center">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-white/20 ring-offset-4 ring-offset-transparent">
                  <img 
                    src={animeProfilePath}
                    alt="mahmoudotaku24 Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name & Title */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2 font-medium">
                  ALIQUAM LOREM
                </p>
                <h1 className="text-2xl font-bold text-white mb-2">
                  mahmoudotaku24
                </h1>
                <p className="text-sm text-gray-300 leading-relaxed px-2">
                  طالب ثانية عام - محب للبرمجة والذكاء الاصطناعي
                </p>
              </div>

              {/* Social Buttons */}
              <div className="space-y-3 mb-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`social-button ${social.color} w-full h-12 rounded-full flex items-center justify-between px-4 text-white text-sm font-medium group`}
                    >
                      <span>{social.label}</span>
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <IconComponent className="text-xs" />
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* AI Chat Button */}
              <Link href="/ai-chat">
                <Button className="gradient-gemini w-full h-12 rounded-full text-white font-medium hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-between w-full px-4">
                    <span>تحدث مع الذكاء الاصطناعي</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <Bot className="text-xs" />
                    </div>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Bottom Text */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 uppercase tracking-[0.15em]">
              Student & Tech Enthusiast
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse-slow"></div>
      <div className="absolute top-40 right-16 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-green-500/20 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-8 w-1 h-1 bg-red-500/30 rounded-full animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
    </div>
  );
}
