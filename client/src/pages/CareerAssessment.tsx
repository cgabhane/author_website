import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  Cloud, 
  Shield, 
  Rocket, 
  Settings, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Target,
  Mail
} from "lucide-react";
import { assessmentQuestions, pillarNames, totalMaxScore, type Question } from "@shared/questions";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertAssessment } from "@shared/schema";

type AssessmentStage = "landing" | "assessment" | "results";

interface Answer {
  questionId: number;
  selectedOption: number;
  points: number;
}

interface ScoreBreakdown {
  cloud: number;
  ai: number;
  devops: number;
  security: number;
  realworld: number;
  total: number;
}

interface SkillLevel {
  level: string;
  title: string;
  description: string;
  nextSteps: string[];
  timeToNext: string;
  roles: string[];
  salaryRange: string;
}

const pillarIcons = {
  cloud: Cloud,
  ai: Brain,
  devops: Settings,
  security: Shield,
  realworld: Rocket
};

const getSkillLevel = (score: number): SkillLevel => {
  const percentage = (score / totalMaxScore) * 100;
  
  if (percentage <= 41) {
    return {
      level: "foundation",
      title: "Foundation Builder",
      description: "You're at the beginning of your Cloud/AI journey with room to grow.",
      nextSteps: [
        "Learn cloud fundamentals (AWS/Azure basics)",
        "Complete AI/ML intro courses",
        "Build 2-3 personal projects"
      ],
      timeToNext: "3-6 months to reach Emerging Professional",
      roles: ["Student", "Career Changer", "Junior Developer"],
      salaryRange: "$50k-70k"
    };
  } else if (percentage <= 58) {
    return {
      level: "emerging",
      title: "Emerging Professional",
      description: "You have foundational knowledge and are building practical skills.",
      nextSteps: [
        "Get cloud certification (AWS SAA, Azure AZ-104)",
        "Build production-ready AI project",
        "Contribute to open source"
      ],
      timeToNext: "6-12 months to reach Skilled Practitioner",
      roles: ["Junior Cloud Engineer", "ML Engineer Intern", "DevOps Associate"],
      salaryRange: "$70k-90k"
    };
  } else if (percentage <= 75) {
    return {
      level: "skilled",
      title: "Skilled Practitioner",
      description: "You have solid mid-level skills across cloud and AI technologies.",
      nextSteps: [
        "Specialize: AI Ops OR Cloud Architecture",
        "Lead a migration project",
        "Mentor junior engineers"
      ],
      timeToNext: "12-18 months to reach Expert Architect",
      roles: ["Cloud Engineer", "ML Engineer", "DevOps Engineer", "Solutions Engineer"],
      salaryRange: "$100k-140k"
    };
  } else if (percentage <= 91) {
    return {
      level: "expert",
      title: "Expert Architect",
      description: "You have senior-level expertise in cloud and AI systems.",
      nextSteps: [
        "Design enterprise architectures",
        "Drive AI strategy initiatives",
        "Speak at conferences"
      ],
      timeToNext: "2-3 years to reach Industry Leader",
      roles: ["Solutions Architect", "Staff Engineer", "AI Lead", "Principal Developer"],
      salaryRange: "$150k-220k"
    };
  } else {
    return {
      level: "leader",
      title: "Industry Leader",
      description: "You're operating at the highest level with deep expertise.",
      nextSteps: [
        "CTO/VP Engineering track",
        "Independent consulting",
        "Thought leadership & writing"
      ],
      timeToNext: "Continue mastering emerging technologies",
      roles: ["Principal Architect", "Distinguished Engineer", "AI Evangelist", "CTO"],
      salaryRange: "$220k-400k+"
    };
  }
};

export default function CareerAssessment() {
  const [stage, setStage] = useState<AssessmentStage>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [email, setEmail] = useState("");
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);
  const [skillLevel, setSkillLevel] = useState<SkillLevel | null>(null);
  const { toast } = useToast();

  const saveResultsMutation = useMutation({
    mutationFn: async (data: InsertAssessment) => {
      const res = await apiRequest("POST", "/api/assessments", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Results Saved!",
        description: "Check your email for your personalized career roadmap.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save results. Please try again.",
        variant: "destructive"
      });
    }
  });

  const startAssessment = () => {
    setStage("assessment");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (questionId: number, optionIndex: number, points: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId, selectedOption: optionIndex, points };
    } else {
      newAnswers.push({ questionId, selectedOption: optionIndex, points });
    }
    
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const breakdown: ScoreBreakdown = {
      cloud: 0,
      ai: 0,
      devops: 0,
      security: 0,
      realworld: 0,
      total: 0
    };

    answers.forEach(answer => {
      const question = assessmentQuestions.find(q => q.id === answer.questionId);
      if (question) {
        breakdown[question.pillar] += answer.points;
        breakdown.total += answer.points;
      }
    });

    setScoreBreakdown(breakdown);
    setSkillLevel(getSkillLevel(breakdown.total));
    setStage("results");
  };

  const handleSaveResults = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive your results.",
        variant: "destructive"
      });
      return;
    }

    if (!scoreBreakdown || !skillLevel) return;

    const data: InsertAssessment = {
      email,
      score: JSON.stringify(scoreBreakdown),
      level: skillLevel.level
    };

    saveResultsMutation.mutate(data);
  };

  const currentQuestionData = assessmentQuestions[currentQuestion];
  const currentAnswer = answers.find(a => a.questionId === currentQuestionData?.id);
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="CloudAI PathFinder - Career Readiness Assessment"
        description="Discover your Cloud and AI career readiness. Free 15-question assessment with personalized roadmap and next steps."
        keywords="cloud career assessment, AI career test, cloud engineer skills, AI readiness check, tech career path"
      />
      <Navigation />

      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Landing Page */}
          {stage === "landing" && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold">CloudAI PathFinder</h1>
                <p className="text-2xl text-muted-foreground">
                  Where Are You in Your Cloud & AI Career?
                </p>
              </div>

              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="text-2xl">Discover Your Career Readiness</CardTitle>
                  <CardDescription className="text-base">
                    Take this 15-question assessment to understand your skills and get a personalized roadmap
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm">15 Questions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm">3 Minutes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm">Free Forever</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">What You'll Learn:</h3>
                    <div className="grid gap-2">
                      {Object.entries(pillarNames).map(([key, name]) => {
                        const Icon = pillarIcons[key as keyof typeof pillarIcons];
                        return (
                          <div key={key} className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="text-sm">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={startAssessment}
                      size="lg"
                      className="w-full md:w-auto"
                      data-testid="button-start-assessment"
                    >
                      Start Free Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="text-sm text-muted-foreground">
                Created by Chetan Gabhane - Cloud & AI Evangelist, Author, Strategic Advisor
              </div>
            </div>
          )}

          {/* Assessment */}
          {stage === "assessment" && currentQuestionData && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
                  <Badge variant="outline">
                    {pillarNames[currentQuestionData.pillar]}
                  </Badge>
                </div>
                <Progress value={progress} />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{currentQuestionData.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {currentQuestionData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQuestionData.id, index, option.points)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all hover-elevate ${
                        currentAnswer?.selectedOption === index
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                      data-testid={`option-${index}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          currentAnswer?.selectedOption === index
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}>
                          {currentAnswer?.selectedOption === index && (
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  onClick={goToPreviousQuestion}
                  variant="outline"
                  disabled={currentQuestion === 0}
                  data-testid="button-previous"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={goToNextQuestion}
                  disabled={!currentAnswer}
                  data-testid="button-next"
                >
                  {currentQuestion === assessmentQuestions.length - 1 ? 'See Results' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {stage === "results" && scoreBreakdown && skillLevel && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Your Results</h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-6xl font-bold text-primary">
                    {Math.round((scoreBreakdown.total / totalMaxScore) * 100)}%
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-semibold">{skillLevel.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {scoreBreakdown.total} out of {totalMaxScore} points
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Your Skill Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(pillarNames).map(([key, name]) => {
                    const score = scoreBreakdown[key as keyof Omit<ScoreBreakdown, 'total'>];
                    const percentage = (score / 12) * 100;
                    const Icon = pillarIcons[key as keyof typeof pillarIcons];
                    
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{name}</span>
                          </div>
                          <span className="text-muted-foreground">{score}/12</span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Your Next Steps
                  </CardTitle>
                  <CardDescription>{skillLevel.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recommended Actions:</h4>
                    <ul className="space-y-2">
                      {skillLevel.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm font-medium mb-1">Career Roles:</div>
                      <div className="text-sm text-muted-foreground">
                        {skillLevel.roles.join(", ")}
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm font-medium mb-1">Salary Range:</div>
                      <div className="text-sm text-muted-foreground">
                        {skillLevel.salaryRange}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-sm text-muted-foreground">
                    ⏱️ {skillLevel.timeToNext}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Get Your Personalized Roadmap
                  </CardTitle>
                  <CardDescription>
                    Enter your email to receive your full results and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-email"
                    />
                  </div>
                  <Button 
                    onClick={handleSaveResults}
                    disabled={saveResultsMutation.isPending || !email}
                    className="w-full"
                    data-testid="button-save-results"
                  >
                    {saveResultsMutation.isPending ? "Sending..." : "Send My Roadmap"}
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  onClick={() => {
                    setStage("landing");
                    setAnswers([]);
                    setCurrentQuestion(0);
                    setEmail("");
                  }}
                  variant="outline"
                  data-testid="button-retake"
                >
                  Retake Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
