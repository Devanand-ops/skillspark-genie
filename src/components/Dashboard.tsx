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
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile Setup', icon: Users, description: 'Complete your career profile' },
    { id: 'results', label: 'Career Results', icon: Trophy, description: 'View your personalized recommendations', disabled: !showResults },
    { id: 'chat', label: 'AI Advisor', icon: MessageCircle, description: 'Chat with your career advisor', disabled: !showResults }
  ];

  const handleFormSubmit = (profile: any) => {
    setUserProfile(profile);
    setShowResults(true);
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

        {activeTab === 'results' && showResults && userProfile && (
          <div className="animate-scale-in">
            <CareerResults 
              profile={userProfile} 
              onStartChat={handleStartChat} 
            />
          </div>
        )}

        {activeTab === 'chat' && showResults && userProfile && (
          <div className="animate-scale-in">
            <AIChat profile={userProfile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;