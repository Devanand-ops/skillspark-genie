import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  MessageCircle, 
  Target, 
  Star, 
  Calendar, 
  Award,
  ExternalLink,
  Download,
  Share,
  Zap
} from "lucide-react";

interface CareerResultsProps {
  profile: {
    name: string;
    education: string;
    skills: string;
    experience: string;
    interests: string;
    goals: string;
  };
  results: any;
  setResults: (results: any) => void;
  onStartChat: () => void;
}

export const CareerResults = ({ profile, results, setResults, onStartChat }: CareerResultsProps) => {
  const [loadingProgress, setLoadingProgress] = useState(() => {
    // If we already have results, skip loading
    return results ? 100 : 0;
  });
  const [showResults, setShowResults] = useState(() => {
    return !!results;
  });

  useEffect(() => {
    // If results already exist, don't run the loading simulation
    if (results) {
      setShowResults(true);
      return;
    }

    // Simulate AI analysis with loading animation
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowResults(true);
            // Generate and save results
            const generatedResults = getCareerRecommendations();
            setResults(generatedResults);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [results, setResults]);

  const getCareerRecommendations = () => {
    const interestMap: Record<string, any> = {
      'data-ai': {
        careers: ['Data Scientist', 'Machine Learning Engineer', 'AI Research Scientist', 'Data Analyst'],
        skills: ['Python', 'TensorFlow', 'Statistics', 'Big Data', 'Deep Learning'],
        roadmap: [
          { phase: 'Foundation (Months 1-3)', items: ['Python Programming', 'Statistics & Probability', 'Data Manipulation (Pandas)'] },
          { phase: 'Intermediate (Months 4-6)', items: ['Machine Learning Algorithms', 'Data Visualization', 'SQL Databases'] },
          { phase: 'Advanced (Months 7-12)', items: ['Deep Learning', 'MLOps', 'Portfolio Projects', 'Industry Certifications'] }
        ],
        courses: [
          { title: 'Machine Learning by Stanford', provider: 'Coursera', rating: 4.9 },
          { title: 'Deep Learning Specialization', provider: 'Coursera', rating: 4.8 },
          { title: 'Python for Data Science', provider: 'edX', rating: 4.7 }
        ]
      },
      'cloud-devops': {
        careers: ['Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect'],
        skills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
        roadmap: [
          { phase: 'Foundation (Months 1-3)', items: ['Cloud Fundamentals', 'Linux Administration', 'Networking Basics'] },
          { phase: 'Intermediate (Months 4-6)', items: ['Containerization', 'CI/CD Pipelines', 'Monitoring & Logging'] },
          { phase: 'Advanced (Months 7-12)', items: ['Kubernetes Orchestration', 'Infrastructure as Code', 'Cloud Certifications'] }
        ],
        courses: [
          { title: 'AWS Solutions Architect', provider: 'AWS', rating: 4.9 },
          { title: 'Docker & Kubernetes', provider: 'Udemy', rating: 4.8 },
          { title: 'DevOps Engineering', provider: 'Coursera', rating: 4.7 }
        ]
      },
      'web-development': {
        careers: ['Frontend Developer', 'Full Stack Developer', 'React Developer', 'UI Engineer'],
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS Frameworks'],
        roadmap: [
          { phase: 'Foundation (Months 1-3)', items: ['HTML/CSS Mastery', 'JavaScript ES6+', 'Version Control (Git)'] },
          { phase: 'Intermediate (Months 4-6)', items: ['React/Vue/Angular', 'REST APIs', 'Database Integration'] },
          { phase: 'Advanced (Months 7-12)', items: ['Full Stack Projects', 'Performance Optimization', 'Deployment & Hosting'] }
        ],
        courses: [
          { title: 'Complete React Developer', provider: 'Udemy', rating: 4.8 },
          { title: 'Full Stack Web Development', provider: 'freeCodeCamp', rating: 4.9 },
          { title: 'Advanced JavaScript', provider: 'Pluralsight', rating: 4.7 }
        ]
      }
    };

    return interestMap[profile.interests] || interestMap['web-development'];
  };

  const recommendations = getCareerRecommendations();

  if (!showResults) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl hero-gradient mb-4">
              Analyzing Your Profile
            </CardTitle>
            <CardDescription className="text-lg">
              Our AI is crafting personalized career recommendations for you...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Processing your skills and experience</span>
                <span>{loadingProgress}%</span>
              </div>
              <Progress value={loadingProgress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-background/50">
                <Zap className="h-8 w-8 text-primary mx-auto mb-2 animate-glow" />
                <p className="text-sm">Analyzing Skills</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <Target className="h-8 w-8 text-secondary mx-auto mb-2 animate-float" />
                <p className="text-sm">Matching Careers</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <BookOpen className="h-8 w-8 text-accent mx-auto mb-2 animate-glow" />
                <p className="text-sm">Creating Roadmap</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <Card className="glass-card border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl hero-gradient mb-4">
            Your Personalized Career Plan
          </CardTitle>
          <CardDescription className="text-lg">
            Hi {profile.name}! Based on your profile, here's your AI-generated career development roadmap.
          </CardDescription>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" className="interactive-hover">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" className="interactive-hover">
              <Share className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Career Recommendations */}
        <Card className="glass-card border-border/50 interactive-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.careers.map((career: string, index: number) => (
                <div key={career} className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{career}</h4>
                      <p className="text-sm text-muted-foreground">High match for your profile</p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1" />
                    {95 - index * 5}% Match
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Gap Analysis */}
        <Card className="glass-card border-border/50 interactive-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-secondary" />
              Skills to Develop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.skills.map((skill: string, index: number) => (
                <div key={skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill}</span>
                    <span className="text-sm text-muted-foreground">{85 - index * 10}%</span>
                  </div>
                  <Progress value={85 - index * 10} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Roadmap */}
      <Card className="glass-card border-border/50 interactive-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-accent" />
            12-Month Learning Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.roadmap.map((phase: any, index: number) => (
              <div key={phase.phase} className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-3">{phase.phase}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {phase.items.map((item: string) => (
                        <div key={item} className="p-3 rounded-lg bg-background/50 border border-border/50">
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < recommendations.roadmap.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Courses */}
      <Card className="glass-card border-border/50 interactive-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Award className="h-6 w-6 text-yellow-500" />
            Top Recommended Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.courses.map((course: any) => (
              <Card key={course.title} className="glass-card border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.provider}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <Button variant="outline" className="interactive-hover">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="glass-card border-primary/20 bg-primary/5">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 hero-gradient">Ready to Start Your Journey?</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Get personalized advice and answers to your career questions with our AI advisor.
          </p>
          <Button
            onClick={onStartChat}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transform hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat with CareerGenie
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};