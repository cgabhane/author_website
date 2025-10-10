import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiagramTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  defaultData: any;
}

const templates: DiagramTemplate[] = [
  {
    id: "ai-agent-architecture",
    name: "AI Agent Architecture",
    category: "AI & ML",
    description: "Visualize AI agent components and data flow",
    defaultData: {
      title: "AI Agent Architecture",
      nodes: [
        { id: 1, label: "User Input", x: 50, y: 50, color: "#3b82f6" },
        { id: 2, label: "Agent Core", x: 50, y: 150, color: "#8b5cf6" },
        { id: 3, label: "Planning", x: 20, y: 250, color: "#10b981" },
        { id: 4, label: "Execution", x: 50, y: 250, color: "#f59e0b" },
        { id: 5, label: "Memory", x: 80, y: 250, color: "#ef4444" },
        { id: 6, label: "Output", x: 50, y: 350, color: "#3b82f6" }
      ],
      connections: [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 6 },
        { from: 4, to: 6 },
        { from: 5, to: 6 }
      ]
    }
  },
  {
    id: "ethical-ai-framework",
    name: "Ethical AI Framework",
    category: "AI Governance",
    description: "7-step ethical AI implementation process",
    defaultData: {
      title: "Ethical AI Implementation Framework",
      steps: [
        { id: 1, label: "Define Ethics Principles", color: "#3b82f6" },
        { id: 2, label: "Risk Assessment", color: "#8b5cf6" },
        { id: 3, label: "Bias Detection", color: "#10b981" },
        { id: 4, label: "Transparency Measures", color: "#f59e0b" },
        { id: 5, label: "Human Oversight", color: "#ef4444" },
        { id: 6, label: "Monitoring & Audit", color: "#06b6d4" },
        { id: 7, label: "Continuous Improvement", color: "#ec4899" }
      ]
    }
  },
  {
    id: "cloud-migration-stages",
    name: "Cloud Migration Journey",
    category: "Cloud Strategy",
    description: "5 stages of cloud migration process",
    defaultData: {
      title: "Cloud Migration: 5-Stage Journey",
      stages: [
        { id: 1, label: "Assessment", description: "Inventory & Analysis", color: "#3b82f6" },
        { id: 2, label: "Planning", description: "Strategy & Design", color: "#8b5cf6" },
        { id: 3, label: "Migration", description: "Execute Move", color: "#10b981" },
        { id: 4, label: "Optimization", description: "Fine-tune Performance", color: "#f59e0b" },
        { id: 5, label: "Innovation", description: "Cloud-Native Features", color: "#ef4444" }
      ]
    }
  },
  {
    id: "vmware-alternatives",
    name: "VMware Alternatives Matrix",
    category: "Cloud Strategy",
    description: "Compare VMware alternatives across key criteria",
    defaultData: {
      title: "VMware Alternatives: Decision Matrix",
      solutions: [
        { name: "AWS", migration: "High", cost: "Medium", features: "Excellent" },
        { name: "Azure", migration: "Medium", cost: "Medium", features: "Excellent" },
        { name: "GCP", migration: "Medium", cost: "Low", features: "Very Good" },
        { name: "OpenStack", migration: "Low", cost: "Low", features: "Good" }
      ],
      criteria: ["Migration Effort", "Cost", "Feature Set"]
    }
  },
  {
    id: "ai-cost-reduction",
    name: "AI Cost Reduction Framework",
    category: "AI & Cloud",
    description: "How AI agents reduce operational costs",
    defaultData: {
      title: "How AI Agents Reduce Costs by 35%",
      categories: [
        { label: "Automated Monitoring", savings: "15%", color: "#3b82f6" },
        { label: "Resource Optimization", savings: "12%", color: "#10b981" },
        { label: "Incident Response", savings: "8%", color: "#f59e0b" }
      ]
    }
  },
  {
    id: "rag-architecture",
    name: "RAG System Architecture",
    category: "AI & ML",
    description: "Retrieval Augmented Generation flow",
    defaultData: {
      title: "RAG System Architecture",
      components: [
        { id: 1, label: "User Query", x: 50, y: 50, color: "#3b82f6" },
        { id: 2, label: "Vector DB", x: 20, y: 150, color: "#8b5cf6" },
        { id: 3, label: "Retrieval", x: 50, y: 150, color: "#10b981" },
        { id: 4, label: "Context Builder", x: 50, y: 250, color: "#f59e0b" },
        { id: 5, label: "LLM", x: 80, y: 150, color: "#ef4444" },
        { id: 6, label: "Response", x: 50, y: 350, color: "#3b82f6" }
      ],
      connections: [
        { from: 1, to: 3 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 }
      ]
    }
  }
];

export default function VisualGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customTitle, setCustomTitle] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<"png" | "svg">("png");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  useEffect(() => {
    if (currentTemplate && canvasRef.current) {
      drawDiagram();
    }
  }, [selectedTemplate, customTitle]);

  const drawDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentTemplate) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const title = customTitle || currentTemplate.defaultData.title;

    // Draw based on template type
    if (currentTemplate.id === "ai-agent-architecture") {
      drawFlowchart(ctx, currentTemplate.defaultData, title);
    } else if (currentTemplate.id === "ethical-ai-framework") {
      drawStepProcess(ctx, currentTemplate.defaultData, title);
    } else if (currentTemplate.id === "cloud-migration-stages") {
      drawTimeline(ctx, currentTemplate.defaultData, title);
    } else if (currentTemplate.id === "vmware-alternatives") {
      drawMatrix(ctx, currentTemplate.defaultData, title);
    } else if (currentTemplate.id === "ai-cost-reduction") {
      drawBarChart(ctx, currentTemplate.defaultData, title);
    } else if (currentTemplate.id === "rag-architecture") {
      drawFlowchart(ctx, currentTemplate.defaultData, title);
    }
  };

  const drawFlowchart = (ctx: CanvasRenderingContext2D, data: any, title: string) => {
    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 28px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, 400, 50);

    // Draw connections first
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    data.connections?.forEach((conn: any) => {
      const fromNode = data.nodes?.find((n: any) => n.id === conn.from) || data.components?.find((n: any) => n.id === conn.from);
      const toNode = data.nodes?.find((n: any) => n.id === conn.to) || data.components?.find((n: any) => n.id === conn.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x * 7 + 50, fromNode.y + 110);
        ctx.lineTo(toNode.x * 7 + 50, toNode.y + 90);
        ctx.stroke();
      }
    });

    // Draw nodes
    const nodes = data.nodes || data.components || [];
    nodes.forEach((node: any) => {
      const x = node.x * 7 + 50;
      const y = node.y + 100;

      // Node background
      ctx.fillStyle = node.color;
      ctx.beginPath();
      ctx.roundRect(x - 70, y - 20, 140, 40, 8);
      ctx.fill();

      // Node text
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(node.label, x, y + 5);
    });
  };

  const drawStepProcess = (ctx: CanvasRenderingContext2D, data: any, title: string) => {
    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 28px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, 400, 50);

    // Draw steps
    const steps = data.steps || [];
    const startY = 120;
    const stepHeight = 60;

    steps.forEach((step: any, index: number) => {
      const y = startY + index * stepHeight;

      // Step number circle
      ctx.fillStyle = step.color;
      ctx.beginPath();
      ctx.arc(100, y, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText((index + 1).toString(), 100, y + 6);

      // Step label
      ctx.fillStyle = "#1e293b";
      ctx.font = "16px Inter, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(step.label, 150, y + 5);

      // Connection line to next step
      if (index < steps.length - 1) {
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100, y + 25);
        ctx.lineTo(100, y + stepHeight - 25);
        ctx.stroke();
      }
    });
  };

  const drawTimeline = (ctx: CanvasRenderingContext2D, data: any, title: string) => {
    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 28px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, 400, 50);

    // Draw timeline
    const stages = data.stages || [];
    const startX = 100;
    const stageWidth = 600 / stages.length;

    // Timeline line
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(startX, 200);
    ctx.lineTo(700, 200);
    ctx.stroke();

    stages.forEach((stage: any, index: number) => {
      const x = startX + index * stageWidth + stageWidth / 2;

      // Stage dot
      ctx.fillStyle = stage.color;
      ctx.beginPath();
      ctx.arc(x, 200, 20, 0, Math.PI * 2);
      ctx.fill();

      // Stage number
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText((index + 1).toString(), x, 206);

      // Stage label
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 16px Inter, sans-serif";
      ctx.fillText(stage.label, x, 150);

      // Stage description
      ctx.fillStyle = "#64748b";
      ctx.font = "14px Inter, sans-serif";
      ctx.fillText(stage.description, x, 270);
    });
  };

  const drawMatrix = (ctx: CanvasRenderingContext2D, data: any, title: string) => {
    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 28px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, 400, 50);

    const solutions = data.solutions || [];
    const criteria = data.criteria || [];
    const cellWidth = 150;
    const cellHeight = 50;
    const startX = 150;
    const startY = 120;

    // Draw header row
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(startX, startY, cellWidth * criteria.length, cellHeight);

    criteria.forEach((criterion: string, index: number) => {
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 14px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(criterion, startX + index * cellWidth + cellWidth / 2, startY + 30);
    });

    // Draw solution rows
    solutions.forEach((solution: any, rowIndex: number) => {
      const y = startY + (rowIndex + 1) * cellHeight;

      // Solution name
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 14px Inter, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(solution.name, startX - 20, y + 30);

      // Draw cells
      Object.values(solution).slice(1).forEach((value: any, colIndex: number) => {
        const x = startX + colIndex * cellWidth;

        // Cell background based on value
        const colors: Record<string, string> = {
          'Excellent': '#10b981',
          'Very Good': '#3b82f6',
          'Good': '#f59e0b',
          'Medium': '#8b5cf6',
          'Low': '#ef4444',
          'High': '#06b6d4'
        };

        ctx.fillStyle = colors[value] || '#cbd5e1';
        ctx.fillRect(x, y, cellWidth, cellHeight);

        // Cell text
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(value, x + cellWidth / 2, y + 30);
      });
    });
  };

  const drawBarChart = (ctx: CanvasRenderingContext2D, data: any, title: string) => {
    // Title
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 28px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, 400, 50);

    const categories = data.categories || [];
    const barWidth = 100;
    const startX = 150;
    const startY = 400;
    const maxHeight = 250;

    categories.forEach((category: any, index: number) => {
      const x = startX + index * 200;
      const savingsValue = parseInt(category.savings);
      const barHeight = (savingsValue / 20) * maxHeight;

      // Bar
      ctx.fillStyle = category.color;
      ctx.fillRect(x, startY - barHeight, barWidth, barHeight);

      // Percentage
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 24px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(category.savings, x + barWidth / 2, startY - barHeight - 20);

      // Label
      ctx.fillStyle = "#64748b";
      ctx.font = "14px Inter, sans-serif";
      const words = category.label.split(' ');
      words.forEach((word: string, i: number) => {
        ctx.fillText(word, x + barWidth / 2, startY + 30 + i * 20);
      });
    });

    // Total savings
    ctx.fillStyle = "#10b981";
    ctx.font = "bold 32px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Total: 35% Cost Reduction", 400, 520);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    
    if (exportFormat === 'png') {
      link.download = `${selectedTemplate}-diagram.png`;
      link.href = canvas.toDataURL('image/png');
    } else {
      // Convert canvas to SVG
      const svgContent = canvasToSVG(canvas);
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      link.download = `${selectedTemplate}-diagram.svg`;
      link.href = URL.createObjectURL(blob);
    }
    
    link.click();

    toast({
      title: "Success!",
      description: `Diagram downloaded as ${exportFormat.toUpperCase()}. Ready to post on Substack!`,
    });
  };

  const canvasToSVG = (canvas: HTMLCanvasElement): string => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Create SVG wrapper
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
        <image href="${canvas.toDataURL('image/png')}" width="${canvas.width}" height="${canvas.height}" />
      </svg>
    `;
    
    return svg;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Visual Content Generator – Create Substack Diagrams"
        description="Generate professional diagrams and infographics for your Substack posts on AI, cloud, and technology topics."
      />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Visual Content Generator</h1>
            <p className="text-muted-foreground text-lg">
              Create professional diagrams for your Substack posts in seconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Controls */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Template Settings
                </CardTitle>
                <CardDescription>
                  Choose a template and customize your diagram
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="template">Select Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger id="template" data-testid="select-template">
                      <SelectValue placeholder="Choose a diagram type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {currentTemplate && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">Custom Title (Optional)</Label>
                      <Input
                        id="title"
                        data-testid="input-title"
                        placeholder={currentTemplate.defaultData.title}
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-1">{currentTemplate.category}</p>
                      <p className="text-sm text-muted-foreground">{currentTemplate.description}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="format">Export Format</Label>
                      <Select value={exportFormat} onValueChange={(value) => setExportFormat(value as "png" | "svg")}>
                        <SelectTrigger id="format" data-testid="select-format">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="png">PNG (Recommended for Substack)</SelectItem>
                          <SelectItem value="svg">SVG (Vector Format)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={downloadImage} 
                      className="w-full"
                      data-testid="button-download"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {exportFormat.toUpperCase()}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Canvas Preview */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  Your diagram will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-4 flex items-center justify-center min-h-[600px]">
                  {selectedTemplate ? (
                    <canvas 
                      ref={canvasRef}
                      className="max-w-full h-auto border border-border rounded"
                      data-testid="canvas-diagram"
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      Select a template to get started
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Grid */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Available Templates</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className="hover-elevate cursor-pointer"
                  onClick={() => setSelectedTemplate(template.id)}
                  data-testid={`card-template-${template.id}`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
