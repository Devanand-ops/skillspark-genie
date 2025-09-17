import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, MessageCircle, ArrowLeft } from "lucide-react";
import { InteractiveForm } from "@/components/InteractiveForm";
import { CareerResults } from "@/components/CareerResults";
import { AIChat } from "@/components/AIChat";

interface DashboardProps {
  onBack: () => void;
  formData: any;
  setFormData: (data: any) => void;
  results: any;
  setResults: (results: any) => void;
  chatHistory: any[];
  setChatHistory: (history: any[]) => void;
  hasCompletedForm: boolean;
  setHasCompletedForm: (completed: boolean) => void;
}

const Dashboard = ({ 
  onBack, 
  formData, 
  setFormData, 
  results, 
  setResults, 
  chatHistory, 
  setChatHistory, 
  hasCompletedForm, 
  setHasCompletedForm 
}: DashboardProps) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (hasCompletedForm && results) return 'results';
    return 'profile';
  });

  const tabs = [
    { id: 'profile', label: 'Profile Setup', icon: Users, description: 'Complete your career profile' },
    { id: 'results', label: 'Career Results', icon: Trophy, description: 'View your personalized recommendations', disabled: !hasCompletedForm },
    { id: 'chat', label: 'AI Advisor', icon: MessageCircle, description: 'Chat with your career advisor', disabled: !hasCompletedForm }
  ];

  const handleFormSubmit = (profile: any) => {
    setFormData(profile);
    setHasCompletedForm(true);
    setActiveTab('results');
  };

  const handleStartChat = () => {
    setActiveTab('chat');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Dashboard Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl hero-gradient mb-2">Career Dashboard</CardTitle>
              <p className="text-muted-foreground">Manage your career development journey</p>
            </div>
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Dashboard Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isDisabled = tab.disabled;
          
          return (
            <Card 
              key={tab.id}
              className={`
                glass-card interactive-hover cursor-pointer transition-all duration-300
                ${isActive ? 'neon-border scale-105' : ''}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => !isDisabled && setActiveTab(tab.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`
                    p-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground' 
                      : 'bg-muted'
                    }
                  `}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tab.label}</h3>
                    <p className="text-sm text-muted-foreground">{tab.description}</p>
                  </div>
                </div>
                {isActive && (
                  <Badge variant="secondary" className="w-full justify-center">
                    Currently Active
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dashboard Content */}
      <div className="min-h-[600px]">
        {activeTab === 'profile' && (
          <div className="animate-scale-in">
            <InteractiveForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {activeTab === 'results' && hasCompletedForm && formData && (
          <div className="animate-scale-in">
            <CareerResults 
              profile={formData} 
              results={results}
              setResults={setResults}
              onStartChat={handleStartChat} 
            />
          </div>
        )}

        {activeTab === 'chat' && hasCompletedForm && formData && (
          <div className="animate-scale-in">
            <AIChat 
              profile={formData} 
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;