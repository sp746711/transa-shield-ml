import { useState } from "react";
import { Shield, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionHistory } from "@/components/TransactionHistory";
import { StatsCard } from "@/components/StatsCard";

export interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  deviceType: string;
  location: string;
  timestamp: Date;
  status: "safe" | "fraud";
  riskScore: number;
}

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleNewTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const totalTransactions = transactions.length;
  const fraudAlerts = transactions.filter((t) => t.status === "fraud").length;
  const safeTransactions = transactions.filter((t) => t.status === "safe").length;
  const fraudRate = totalTransactions > 0 ? ((fraudAlerts / totalTransactions) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                UPI Fraud Detection System
              </h1>
              <p className="text-sm text-muted-foreground">AI-Powered Transaction Security</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Transactions"
            value={totalTransactions}
            icon={<TrendingUp className="w-5 h-5" />}
            gradient="from-primary to-primary/80"
          />
          <StatsCard
            title="Safe Transactions"
            value={safeTransactions}
            icon={<CheckCircle className="w-5 h-5" />}
            gradient="from-success to-success/80"
          />
          <StatsCard
            title="Fraud Alerts"
            value={fraudAlerts}
            icon={<AlertTriangle className="w-5 h-5" />}
            gradient="from-destructive to-destructive/80"
          />
          <StatsCard
            title="Fraud Rate"
            value={`${fraudRate}%`}
            icon={<Shield className="w-5 h-5" />}
            gradient="from-warning to-warning/80"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={handleNewTransaction} />
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Transaction History
              </h2>
              <TransactionHistory transactions={transactions} />
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary/20 border-primary/20">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="font-semibold text-foreground">1. Transaction Input</div>
              <p>Enter transaction details including amount, merchant, location, and device info.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-foreground">2. AI Analysis</div>
              <p>Our ML model analyzes patterns, anomalies, and risk factors in real-time.</p>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-foreground">3. Instant Results</div>
              <p>Get immediate fraud risk assessment with detailed risk scores.</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
