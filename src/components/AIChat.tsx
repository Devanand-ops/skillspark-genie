import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  Lightbulb,
  BookOpen,
  Target,
  TrendingUp,
  Star
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  profile: {
    name: string;
    education: string;
    skills: string;
    experience: string;
    interests: string;
    goals: string;
  } | null;
}

export const AIChat = ({ profile }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi ${profile?.name || 'there'}! I'm CareerGenie, your AI career advisor. I've analyzed your profile and I'm ready to help you with career guidance, skill development, job search strategies, and more. What would you like to discuss?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    "What skills should I focus on next?",
    "How can I improve my resume?",
    "What's the job market like in my field?",
    "How do I prepare for technical interviews?",
    "What certifications would help my career?",
    "How can I transition to a new role?"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Comprehensive response system based on keywords
    if (message.includes('skill') || message.includes('learn')) {
      return "Based on your profile in " + (profile?.interests || 'technology') + ", I recommend focusing on these key skills:\n\n• **Technical Skills**: Stay current with the latest frameworks and tools in your field\n• **Soft Skills**: Communication, leadership, and problem-solving are increasingly valuable\n• **Industry-Specific Knowledge**: Understanding business context makes you more effective\n\nConsider taking online courses, attending workshops, or working on personal projects. Would you like specific recommendations for any of these areas?";
    }
    
    if (message.includes('resume') || message.includes('cv')) {
      return "Here are key tips to improve your resume:\n\n• **Quantify achievements**: Use numbers and percentages to show impact\n• **Tailor content**: Customize for each job application using relevant keywords\n• **Skills section**: List both technical and soft skills prominently\n• **Projects**: Include 2-3 relevant projects with technologies used\n• **Format**: Keep it clean, ATS-friendly, and 1-2 pages max\n\nGiven your " + (profile?.experience || '') + " experience level, focus on highlighting your growth and potential. Need help with any specific section?";
    }
    
    if (message.includes('interview')) {
      return "Interview preparation is crucial for career success:\n\n**Technical Preparation**:\n• Practice coding problems on LeetCode or HackerRank\n• Review fundamental concepts in your field\n• Prepare for system design questions (for senior roles)\n\n**Behavioral Preparation**:\n• Use the STAR method (Situation, Task, Action, Result)\n• Prepare stories that showcase leadership and problem-solving\n• Research the company culture and values\n\n**Mock Interviews**: Practice with peers or use platforms like Pramp. Would you like specific question examples for your field?";
    }
    
    if (message.includes('certification') || message.includes('certificate')) {
      const interestMap: Record<string, string> = {
        'data-ai': 'For Data Science/AI: AWS Certified Machine Learning, Google Professional Data Engineer, or Microsoft Azure AI Engineer certifications are highly valued.',
        'cloud-devops': 'For Cloud/DevOps: AWS Solutions Architect, Azure DevOps Engineer, or Google Cloud Professional Cloud Architect are excellent choices.',
        'web-development': 'For Web Development: Consider AWS Developer Associate, Google Mobile Web Specialist, or framework-specific certifications like React or Angular.',
        'cybersecurity': 'For Cybersecurity: CompTIA Security+, CISSP, or Certified Ethical Hacker (CEH) are industry standards.'
      };
      
      return (interestMap[profile?.interests || ''] || "Popular certifications in tech include cloud platforms (AWS, Azure, GCP), project management (PMP, Scrum Master), and specialized technical certifications.") + "\n\nCertifications validate your expertise and can increase salary potential by 15-25%. Choose ones aligned with your career goals and ensure you have practical experience to back them up.";
    }
    
    if (message.includes('salary') || message.includes('pay') || message.includes('money')) {
      return "Salary expectations vary by location, experience, and specialization:\n\n**Research Tools**:\n• Glassdoor, PayScale, and levels.fyi for market data\n• LinkedIn Salary Insights for role-specific information\n• AngelList for startup compensation ranges\n\n**Negotiation Tips**:\n• Know your market value before discussions\n• Consider total compensation (benefits, equity, flexibility)\n• Highlight unique value you bring to the role\n• Be prepared to discuss your achievements quantitatively\n\nWith your background in " + (profile?.interests || 'technology') + ", focus on building specialized skills that command premium salaries.";
    }
    
    if (message.includes('job market') || message.includes('hiring') || message.includes('opportunities')) {
      return "The current job market shows strong demand in several areas:\n\n**High-Growth Fields**:\n• AI/Machine Learning: 35% growth expected\n• Cloud Computing: Continued expansion as companies digitize\n• Cybersecurity: Critical need with rising threats\n• Data Engineering: Supporting AI/ML infrastructure needs\n\n**Market Trends**:\n• Remote work options are now standard\n• Companies value diverse, adaptable skill sets\n• Emphasis on continuous learning and growth mindset\n\nYour profile in " + (profile?.interests || 'technology') + " positions you well in this market. Consider focusing on emerging technologies within your field.";
    }
    
    if (message.includes('career change') || message.includes('transition')) {
      return "Career transitions require strategic planning:\n\n**Assessment Phase**:\n• Identify transferable skills from your current role\n• Research target field requirements and culture\n• Network with professionals in your target industry\n\n**Skill Development**:\n• Bridge gaps through online courses or bootcamps\n• Gain experience through projects, volunteering, or freelancing\n• Consider gradual transition vs. complete career pivot\n\n**Job Search Strategy**:\n• Leverage your network for informational interviews\n• Tailor your story to show why the change makes sense\n• Be prepared to discuss your motivation clearly\n\nBased on your " + (profile?.skills || 'current skills') + ", what specific field are you considering?";
    }
    
    if (message.includes('network') || message.includes('networking')) {
      return "Networking is essential for career growth:\n\n**Online Networking**:\n• Optimize your LinkedIn profile with keywords\n• Engage with industry content and thought leaders\n• Join relevant professional groups and communities\n\n**Offline Networking**:\n• Attend industry meetups, conferences, and workshops\n• Join professional associations in your field\n• Participate in hackathons or collaborative projects\n\n**Relationship Building**:\n• Focus on giving value before asking for help\n• Follow up consistently with new connections\n• Maintain relationships with former colleagues\n\nIn " + (profile?.interests || 'your field') + ", consider joining specialized communities and attending field-specific events.";
    }
    
    if (message.includes('remote') || message.includes('work from home')) {
      return "Remote work has become a permanent fixture:\n\n**Remote Work Skills**:\n• Strong communication and collaboration abilities\n• Self-discipline and time management\n• Proficiency with digital collaboration tools\n• Results-oriented mindset\n\n**Finding Remote Opportunities**:\n• Use remote-specific job boards (RemoteOK, We Work Remotely)\n• Filter for remote options on traditional job sites\n• Network with remote workers in your field\n\n**Success Tips**:\n• Create a dedicated workspace\n• Establish clear work-life boundaries\n• Over-communicate with your team\n• Stay visible through regular check-ins\n\nMany companies in " + (profile?.interests || 'technology') + " offer flexible remote arrangements.";
    }
    
    if (message.includes('freelance') || message.includes('consulting')) {
      return "Freelancing can provide flexibility and higher earning potential:\n\n**Getting Started**:\n• Build a strong portfolio showcasing your best work\n• Start with platforms like Upwork, Fiverr, or Toptal\n• Set competitive but fair pricing based on market research\n\n**Building Your Business**:\n• Focus on a specific niche or specialization\n• Collect testimonials and case studies\n• Develop long-term client relationships\n• Consider transitioning regular clients to retainer agreements\n\n**Essential Skills**:\n• Project management and time tracking\n• Client communication and boundary setting\n• Basic business and tax knowledge\n\nWith your skills in " + (profile?.skills || 'technology') + ", you could offer specialized services to businesses in need of expertise.";
    }
    
    if (message.includes('leadership') || message.includes('management')) {
      return "Developing leadership skills opens up advancement opportunities:\n\n**Core Leadership Competencies**:\n• Emotional intelligence and empathy\n• Clear communication and active listening\n• Decision-making under uncertainty\n• Coaching and mentoring abilities\n\n**Building Leadership Experience**:\n• Volunteer to lead projects or initiatives\n• Mentor junior team members\n• Join professional leadership development programs\n• Seek feedback and work on areas for improvement\n\n**Technical Leadership** (relevant for your background):\n• Balance technical depth with business understanding\n• Learn to translate technical concepts for non-technical stakeholders\n• Stay current with industry trends while focusing on team development\n\nConsider pursuing leadership certifications or an MBA if you're serious about management roles.";
    }
    
    if (message.includes('startup') || message.includes('entrepreneur')) {
      return "The startup ecosystem offers unique opportunities:\n\n**Startup Advantages**:\n• Rapid skill development and diverse responsibilities\n• Equity potential and career acceleration\n• Innovation-focused, fast-paced environment\n• Direct impact on company success\n\n**Considerations**:\n• Higher risk but potentially higher reward\n• Less job security and structured benefits\n• Longer hours and higher stress levels\n• Need for adaptability and wearing multiple hats\n\n**Preparation Tips**:\n• Build a diverse skill set beyond your specialization\n• Develop comfort with ambiguity and change\n• Network within the startup community\n• Consider the company's funding stage and runway\n\nYour background in " + (profile?.interests || 'technology') + " is valuable in the startup world. Research companies solving problems you're passionate about.";
    }
    
    // Default responses for general queries
    const defaultResponses = [
      "That's a great question! Based on your profile and goals, I'd recommend focusing on continuous learning and skill development. What specific area would you like to explore further?",
      "I'm here to help you navigate your career journey. Could you provide more details about what you'd like to know? I can assist with skills development, job search strategies, interview preparation, and more.",
      "Every career path is unique, and yours is no exception. Let's dive deeper into your specific situation. What challenges or opportunities are you currently facing?",
      "Career development is an ongoing process. Given your background in " + (profile?.interests || 'your field') + ", there are many exciting directions we could explore. What interests you most right now?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Chat Header */}
      <Card className="glass-card border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3 text-3xl hero-gradient">
            <MessageCircle className="h-8 w-8" />
            CareerGenie AI Advisor
          </CardTitle>
          <CardDescription className="text-lg">
            Get personalized career advice and insights based on your profile
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Suggested Questions Sidebar */}
        <Card className="glass-card border-border/50 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3 text-sm hover:border-primary/50 transition-colors"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="glass-card border-border/50 lg:col-span-3">
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-6" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-slide-up`}
                  >
                    <Avatar className="shrink-0">
                      <AvatarFallback className={`${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`
                        p-4 rounded-2xl inline-block
                        ${message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-br-sm' 
                          : 'glass-card border-border/50 rounded-bl-sm'
                        }
                      `}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 animate-pulse">
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="glass-card border-border/50 p-4 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="border-t border-border/50 p-6">
              <div className="flex gap-3">
                <Input
                  ref={inputRef}
                  placeholder="Ask me about career paths, skills, interviews, or anything else..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 glass-card border-border/50 focus:border-primary"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-border/50 interactive-hover">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-3 animate-glow" />
            <h3 className="font-semibold mb-2">Learning Resources</h3>
            <p className="text-sm text-muted-foreground">Get personalized course and certification recommendations</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-border/50 interactive-hover">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-secondary mx-auto mb-3 animate-float" />
            <h3 className="font-semibold mb-2">Career Planning</h3>
            <p className="text-sm text-muted-foreground">Strategic advice for your career advancement</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-border/50 interactive-hover">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-accent mx-auto mb-3 animate-glow" />
            <h3 className="font-semibold mb-2">Market Insights</h3>
            <p className="text-sm text-muted-foreground">Stay updated with industry trends and opportunities</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};