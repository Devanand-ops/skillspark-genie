import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, GraduationCap, Code, Briefcase, Target, Linkedin, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  education: string;
  skills: string;
  experience: string;
  interests: string;
  goals: string;
}

interface InteractiveFormProps {
  onSubmit: (profile: FormData) => void;
}

export const InteractiveForm = ({ onSubmit }: InteractiveFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    education: '',
    skills: '',
    experience: '',
    interests: '',
    goals: ''
  });
  
  const [currentSection, setCurrentSection] = useState(0);
  const { toast } = useToast();

  const sections = [
    { title: "Personal Info", icon: User, fields: ['name', 'education'] },
    { title: "Experience", icon: Briefcase, fields: ['experience', 'skills'] },
    { title: "Goals", icon: Target, fields: ['interests', 'goals'] }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const currentFields = sections[currentSection].fields;
    const missingFields = currentFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Please complete all fields",
        description: "Fill in all required information to continue.",
        variant: "destructive"
      });
      return;
    }

    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const allFields = Object.values(formData);
    if (allFields.some(field => !field)) {
      toast({
        title: "Please complete all fields",
        description: "Fill in all required information to generate your career plan.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile Created Successfully! ✨",
      description: "Generating your personalized career recommendations...",
    });

    onSubmit(formData);
  };

  const renderFormSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="form-floating">
              <Input
                id="name"
                placeholder=" "
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="glass-card border-border/50 focus:border-primary text-lg py-6"
              />
              <Label htmlFor="name" className="text-base">Your Name</Label>
            </div>

            <div className="space-y-3">
              <Label className="text-base">Education Level</Label>
              <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                <SelectTrigger className="glass-card border-border/50 focus:border-primary text-lg py-6">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="highschool">High School</SelectItem>
                  <SelectItem value="associate">Associate Degree</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="bootcamp">Bootcamp Graduate</SelectItem>
                  <SelectItem value="self-taught">Self-Taught</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Years of Experience</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger className="glass-card border-border/50 focus:border-primary text-lg py-6">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="0">Less than 1 year</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-floating">
              <Textarea
                id="skills"
                placeholder=" "
                value={formData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                className="glass-card border-border/50 focus:border-primary min-h-[120px] resize-none"
                rows={4}
              />
              <Label htmlFor="skills" className="text-base">Current Skills & Technologies</Label>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">JavaScript</Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Data Analysis</Badge>
              <Badge variant="outline">UI Design</Badge>
              <Badge variant="outline">Project Management</Badge>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Career Interest Area</Label>
              <Select value={formData.interests} onValueChange={(value) => handleInputChange('interests', value)}>
                <SelectTrigger className="glass-card border-border/50 focus:border-primary text-lg py-6">
                  <SelectValue placeholder="Select your area of interest" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="data-ai">Data Science & AI</SelectItem>
                  <SelectItem value="cloud-devops">Cloud & DevOps</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="mobile-development">Mobile Development</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="business-analytics">Business & Analytics</SelectItem>
                  <SelectItem value="creative-tech">Creative Technology</SelectItem>
                  <SelectItem value="product-management">Product Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-floating">
              <Textarea
                id="goals"
                placeholder=" "
                value={formData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                className="glass-card border-border/50 focus:border-primary min-h-[120px] resize-none"
                rows={4}
              />
              <Label htmlFor="goals" className="text-base">Career Goals & Aspirations</Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass-card border-border/50">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = currentSection === index;
              const isCompleted = currentSection > index;
              
              return (
                <div key={section.title} className="flex items-center gap-2">
                  <div className={`
                    p-3 rounded-full border-2 transition-all duration-300
                    ${isActive ? 'border-primary bg-primary/20 scale-110' : ''}
                    ${isCompleted ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}
                    ${!isActive && !isCompleted ? 'opacity-50' : ''}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < sections.length - 1 && (
                    <div className={`w-12 h-0.5 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <CardTitle className="text-3xl hero-gradient">
            {sections[currentSection].title}
          </CardTitle>
          <CardDescription className="text-lg">
            Step {currentSection + 1} of {sections.length} - Let's build your profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="animate-slide-up">
            {renderFormSection()}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
              className="interactive-hover"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary animate-glow" />
              <span className="text-sm text-muted-foreground">
                {currentSection + 1} / {sections.length}
              </span>
            </div>

            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 interactive-hover"
            >
              {currentSection === sections.length - 1 ? 'Generate Plan' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {currentSection === sections.length - 1 && (
            <Card className="glass-card bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-2">
                    <Button variant="outline" className="interactive-hover">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Connect LinkedIn
                    </Button>
                    <Button variant="outline" className="interactive-hover">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Connect Coursera
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Optional: Connect your accounts for enhanced recommendations
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};