import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/pages/Index";

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
}

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    merchant: "",
    category: "",
    deviceType: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple fraud detection logic based on amount and patterns
    const amount = parseFloat(formData.amount);
    const riskScore = calculateRiskScore(amount, formData);
    const status = riskScore > 50 ? "fraud" : "safe";

    const transaction: Transaction = {
      id: Date.now().toString(),
      amount,
      merchant: formData.merchant,
      category: formData.category,
      deviceType: formData.deviceType,
      location: formData.location,
      timestamp: new Date(),
      status,
      riskScore,
    };

    onSubmit(transaction);
    setIsAnalyzing(false);

    toast({
      title: status === "fraud" ? "⚠️ Fraud Alert!" : "✅ Safe Transaction",
      description: status === "fraud" 
        ? `High risk detected (${riskScore}% risk score). Please verify this transaction.`
        : `Transaction verified as safe (${riskScore}% risk score).`,
      variant: status === "fraud" ? "destructive" : "default",
    });

    // Reset form
    setFormData({
      amount: "",
      merchant: "",
      category: "",
      deviceType: "",
      location: "",
    });
  };

  const calculateRiskScore = (amount: number, data: typeof formData): number => {
    let risk = 0;
    
    // High amount risk
    if (amount > 50000) risk += 30;
    else if (amount > 20000) risk += 15;
    
    // Odd hours risk (simulated)
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) risk += 20;
    
    // High-risk categories
    if (data.category === "gambling" || data.category === "cryptocurrency") risk += 25;
    
    // Unknown device
    if (data.deviceType === "unknown") risk += 15;
    
    // International location (simulated check)
    if (data.location.toLowerCase().includes("international")) risk += 20;
    
    return Math.min(risk, 95);
  };

  return (
    <Card className="p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        Check Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Transaction Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="merchant">Merchant Name</Label>
          <Input
            id="merchant"
            placeholder="e.g., Amazon, Flipkart"
            value={formData.merchant}
            onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="food">Food & Dining</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="gambling">Gambling</SelectItem>
              <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deviceType">Device Type</Label>
          <Select value={formData.deviceType} onValueChange={(value) => setFormData({ ...formData, deviceType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., Mumbai, India"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Transaction...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Check for Fraud
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
