import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Transaction } from "@/pages/Index";
import { format } from "date-fns";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No transactions yet. Start by checking a transaction above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium text-sm">
                {format(transaction.timestamp, "HH:mm:ss")}
              </TableCell>
              <TableCell>{transaction.merchant}</TableCell>
              <TableCell className="font-semibold">₹{transaction.amount.toLocaleString()}</TableCell>
              <TableCell className="capitalize">{transaction.category}</TableCell>
              <TableCell>{transaction.location}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        transaction.riskScore > 50 
                          ? "bg-destructive" 
                          : transaction.riskScore > 30 
                          ? "bg-warning" 
                          : "bg-success"
                      }`}
                      style={{ width: `${transaction.riskScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{transaction.riskScore}%</span>
                </div>
              </TableCell>
              <TableCell>
                {transaction.status === "fraud" ? (
                  <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                    <AlertTriangle className="w-3 h-3" />
                    Fraud Alert
                  </Badge>
                ) : (
                  <Badge variant="default" className="flex items-center gap-1 w-fit bg-success hover:bg-success/90">
                    <CheckCircle className="w-3 h-3" />
                    Safe
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
