import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Zap, Brain, Rocket, Target, Users, Code, Cloud, Shield, Palette, Star, ArrowRight, MessageCircle, BookOpen, Trophy, ChevronRight } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import { MouseTracker } from "@/components/MouseTracker";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: 'welcome', label: 'Welcome', icon: Star },
    { id: 'dashboard', label: 'Dashboard', icon: Users }
  ];

  const careerCategories = [
    {
      title: "Data & AI",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      careers: ["Data Scientist", "ML Engineer", "AI Specialist", "Data Analyst"],
      description: "Shape the future with intelligent systems"
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "from-blue-500 to-cyan-500",
      careers: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer", "Cloud Architect"],
      description: "Build scalable infrastructure solutions"
    },
    {
      title: "Software Development",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      careers: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer"],
      description: "Create amazing digital experiences"
    },
    {
      title: "Cybersecurity",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      careers: ["Security Analyst", "Ethical Hacker", "Security Engineer", "Incident Response"],
      description: "Protect digital assets and privacy"
    },
    {
      title: "Creative Tech",
      icon: Palette,
      color: "from-indigo-500 to-purple-500",
      careers: ["UI/UX Designer", "Game Developer", "AR/VR Developer", "Creative Technologist"],
      description: "Merge creativity with technology"
    },
    {
      title: "Business Analytics",
      icon: Target,
      color: "from-yellow-500 to-orange-500",
      careers: ["Business Analyst", "Product Manager", "Growth Analyst", "Strategy Consultant"],
      description: "Drive data-driven business decisions"
    }
  ];

  const navigateToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    if (stepIndex === 1) setShowDashboard(true);
  };

  return (
    <div className="min-h-screen particle-bg" ref={containerRef}>
      <MouseTracker />
      
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4 animate-slide-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Sparkles className="h-12 w-12 text-primary animate-glow" />
                <div className="absolute inset-0 h-12 w-12 animate-pulse-ring border-2 border-primary/30 rounded-full"></div>
              </div>
              <h1 className="text-6xl font-bold hero-gradient tracking-tight">
                CareerGenie
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your AI-powered Career & Skills Development Advisor
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-primary">
              <Zap className="h-4 w-4" />
              <span>Powered by Advanced AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            
            return (
              <div key={step.id} className="flex items-center gap-4">
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="lg"
                  className={`
                    relative overflow-hidden group transition-all duration-300
                    ${isActive ? "neon-border scale-105" : ""}
                    ${isCompleted ? "bg-primary/20 text-primary" : ""}
                    ${index === 1 && !showDashboard ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                  onClick={() => navigateToStep(index)}
                  disabled={index === 1 && !showDashboard}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {step.label}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 animate-pulse" />
                  )}
                </Button>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            );
          })}
        </div>

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 0 && (
            <div className="space-y-12 animate-fade-in">
              {/* Welcome Section */}
              <Card className="glass-card text-center p-8 interactive-hover">
                <CardHeader>
                  <CardTitle className="text-4xl mb-4 hero-gradient">
                    Discover Your Perfect Career Path
                  </CardTitle>
                  <CardDescription className="text-lg max-w-3xl mx-auto">
                    CareerGenie uses advanced AI to analyze your skills, interests, and goals to create 
                    personalized career recommendations and learning roadmaps tailored just for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <Badge variant="secondary" className="text-sm py-2 px-4">
                      <Brain className="h-4 w-4 mr-2" />
                      AI-Powered Analysis
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4">
                      <Target className="h-4 w-4 mr-2" />
                      Personalized Roadmaps
                    </Badge>
                    <Badge variant="secondary" className="text-sm py-2 px-4">
                      <Rocket className="h-4 w-4 mr-2" />
                      Career Acceleration
                    </Badge>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transform hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      setShowDashboard(true);
                      setCurrentStep(1);
                    }}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              {/* Career Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Card 
                      key={category.title}
                      className="glass-card interactive-hover group cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <CardTitle className="text-xl">{category.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {category.careers.map((career) => (
                            <div key={career} className="flex items-center justify-between p-2 rounded-lg bg-background/50 text-sm">
                              <span>{career}</span>
                              <Badge variant="outline">Popular</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 1 && showDashboard && (
            <div className="animate-scale-in">
              <Dashboard onBack={() => {
                setCurrentStep(0);
                setShowDashboard(false);
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">CareerGenie © 2024</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-Powered Career Development Advisor | Built with ❤️ for your success
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Badge variant="outline">
                <BookOpen className="h-3 w-3 mr-1" />
                Interactive Learning
              </Badge>
              <Badge variant="outline">
                <Brain className="h-3 w-3 mr-1" />
                AI-Powered Insights
              </Badge>
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-1" />
                Personalized Guidance
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;