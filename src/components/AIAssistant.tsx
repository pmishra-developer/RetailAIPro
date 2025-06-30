
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Send, Sparkles, TrendingUp, Package, Target, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI retail assistant powered by Azure OpenAI. I can help you with inventory management, sales analysis, product recommendations, and market insights. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [azureApiKey, setAzureApiKey] = useState('');
  const [azureEndpoint, setAzureEndpoint] = useState('');
  const [deploymentName, setDeploymentName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const quickActions = [
    {
      title: 'Analyze Sales Trends',
      description: 'Get insights on your sales performance',
      icon: TrendingUp,
      prompt: 'Analyze my current sales trends and provide recommendations for improvement'
    },
    {
      title: 'Inventory Optimization',
      description: 'Optimize your stock levels',
      icon: Package,
      prompt: 'Help me optimize my inventory levels based on current sales data'
    },
    {
      title: 'Product Recommendations',
      description: 'Get AI-powered product suggestions',
      icon: Target,
      prompt: 'What products should I consider adding to my inventory based on market trends?'
    },
    {
      title: 'Pricing Strategy',
      description: 'Optimize your pricing strategy',
      icon: Sparkles,
      prompt: 'Analyze my pricing strategy and suggest improvements for better profitability'
    }
  ];

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate Azure OpenAI API call
      const response = await simulateAzureOpenAI(message);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please check your Azure OpenAI configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAzureOpenAI = async (prompt: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate different responses based on prompt keywords
    if (prompt.toLowerCase().includes('sales') || prompt.toLowerCase().includes('trend')) {
      return `Based on your sales data analysis, here are key insights:

📈 **Sales Performance:**
- Your electronics category shows a 23% increase over the last quarter
- Peak sales occur on weekends and during promotional periods
- Average order value has increased by 15%

🎯 **Recommendations:**
1. Expand your electronics inventory, particularly wireless accessories
2. Consider implementing time-based promotions during weekdays
3. Bundle complementary products to increase AOV further

📊 **Market Trends:**
- Smart home devices are trending with 45% search increase
- Sustainable products show growing consumer interest
- Mobile shopping accounts for 68% of your traffic

Would you like me to dive deeper into any specific area?`;
    }

    if (prompt.toLowerCase().includes('inventory') || prompt.toLowerCase().includes('stock')) {
      return `Here's your inventory optimization analysis:

📦 **Current Status:**
- 15 products are below optimal stock levels
- Electronics and Clothing categories need immediate attention
- Total inventory value: $125,450

⚡ **Immediate Actions:**
1. Reorder wireless headphones (only 8 units left)
2. Increase organic cotton t-shirt stock (currently out of stock)
3. Consider seasonal inventory adjustments

🔄 **Optimization Strategy:**
- Implement ABC analysis for better categorization
- Set up automated reorder points
- Consider drop-shipping for slow-moving items

💡 **AI Recommendations:**
- Forecast suggests 30% increase in demand for fitness trackers
- Consider bundling slow-moving items with popular products
- Implement just-in-time ordering for fast-moving categories`;
    }

    if (prompt.toLowerCase().includes('product') || prompt.toLowerCase().includes('recommend')) {
      return `Based on market analysis and your store performance, here are my product recommendations:

🚀 **High-Potential Products:**
1. **Smart Home Security Systems** - 67% market growth
2. **Sustainable Fashion Items** - Growing consumer consciousness
3. **Wireless Charging Accessories** - Universal compatibility trend
4. **Fitness & Wellness Products** - Post-pandemic health focus

📊 **Data-Driven Insights:**
- Customers who buy smartphones have 78% likelihood of purchasing accessories
- Eco-friendly products have 34% higher profit margins
- Tech gadgets under $100 have the highest conversion rates

🎪 **Seasonal Opportunities:**
- Back-to-school electronics (July-August)
- Fitness equipment (January-March)
- Smart home devices (November-December)

Would you like detailed analysis on any specific product category?`;
    }

    if (prompt.toLowerCase().includes('pricing') || prompt.toLowerCase().includes('price')) {
      return `Here's your pricing strategy analysis:

💰 **Current Pricing Performance:**
- Average margin: 42% (industry average: 38%)
- Price sensitivity varies by category
- Dynamic pricing opportunities identified

📈 **Optimization Recommendations:**
1. **Electronics**: Consider competitive pricing (market is price-sensitive)
2. **Clothing**: Premium positioning working well (+15% margin)
3. **Accessories**: Opportunity for slight price increase

🔍 **Market Analysis:**
- Your prices are competitive in 73% of categories
- Customers show low price sensitivity for quality items
- Bundle pricing could increase average order value by 22%

⚖️ **Strategic Approach:**
- Implement psychological pricing ($29.99 vs $30.00)
- Test dynamic pricing during peak hours
- Consider loyalty program discounts

Need help implementing any of these strategies?`;
    }

    // Default response
    return `I understand you're looking for retail insights. I can help you with:

🔍 **Analysis & Insights:**
- Sales performance analysis
- Inventory optimization
- Customer behavior patterns
- Market trend identification

📈 **Business Growth:**
- Product recommendations
- Pricing strategies
- Marketing optimization
- Competitive analysis

💡 **Operational Efficiency:**
- Stock level optimization
- Demand forecasting
- Supplier recommendations
- Process automation

Please let me know which area you'd like to explore, and I'll provide detailed insights and actionable recommendations!`;
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <CardTitle>Azure OpenAI Configuration</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              {showSettings ? 'Hide' : 'Show'} Settings
            </Button>
          </div>
          <CardDescription>
            Configure your Azure OpenAI connection for AI-powered retail insights
          </CardDescription>
        </CardHeader>
        {showSettings && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="endpoint">Azure Endpoint</Label>
                <Input
                  id="endpoint"
                  placeholder="https://your-resource.openai.azure.com/"
                  value={azureEndpoint}
                  onChange={(e) => setAzureEndpoint(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deployment">Deployment Name</Label>
                <Input
                  id="deployment"
                  placeholder="gpt-4"
                  value={deploymentName}
                  onChange={(e) => setDeploymentName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apikey">API Key</Label>
                <Input
                  id="apikey"
                  type="password"
                  placeholder="Your Azure OpenAI API key"
                  value={azureApiKey}
                  onChange={(e) => setAzureApiKey(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span>Note: This demo uses simulated responses. Add your Azure OpenAI credentials for live AI integration.</span>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Get instant AI insights with these pre-configured prompts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50"
                onClick={() => handleQuickAction(action.prompt)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Assistant Chat</span>
          </CardTitle>
          <CardDescription>Ask questions and get AI-powered retail insights</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {message.type === 'assistant' && <Bot className="h-4 w-4" />}
                    <Badge variant={message.type === 'user' ? 'secondary' : 'outline'}>
                      {message.type === 'user' ? 'You' : 'AI Assistant'}
                    </Badge>
                  </div>
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 animate-pulse" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          {/* Input */}
          <div className="flex space-x-2">
            <Textarea
              placeholder="Ask me anything about your retail business..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputMessage);
                }
              }}
              rows={2}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage(inputMessage)}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
