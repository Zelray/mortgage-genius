import { useState, useEffect } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(20);
  const [propertyTax, setPropertyTax] = useState(300);
  const [insurance, setInsurance] = useState(150);
  const [hoaFees, setHoaFees] = useState(0);

  const calculatePayment = () => {
    const principal = loanAmount * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyPrincipalInterest = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalMonthly = monthlyPrincipalInterest + propertyTax + insurance + hoaFees;
    
    return {
      total: Math.round(totalMonthly),
      principalInterest: Math.round(monthlyPrincipalInterest),
      propertyTax,
      insurance,
      hoaFees
    };
  };

  const payment = calculatePayment();

  const chartData = [
    { name: 'Principal & Interest', value: payment.principalInterest, color: '#2563eb' },
    { name: 'Property Tax', value: payment.propertyTax, color: '#10b981' },
    { name: 'Insurance', value: payment.insurance, color: '#f59e0b' },
    { name: 'HOA Fees', value: payment.hoaFees, color: '#8b5cf6' }
  ].filter(item => item.value > 0);

  return (
    <section className="py-12 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 text-sm">
            <Calculator className="w-4 h-4" />
            <span className="font-semibold">Mortgage Calculator</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Calculate Your Monthly Payment
          </h2>
          <p className="text-muted-foreground">
            Get an instant estimate and see your payment breakdown
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Calculator Inputs */}
            <Card className="p-6 space-y-4">
              {/* Loan Amount Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Loan Amount</Label>
                  <span className="font-bold">${loanAmount.toLocaleString()}</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={50000}
                  max={2000000}
                  step={10000}
                  className="py-2"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label className="text-sm">Interest Rate (%)</Label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  max="15"
                />
              </div>

              {/* Loan Term */}
              <div className="space-y-2">
                <Label className="text-sm">Loan Term</Label>
                <Select value={loanTerm.toString()} onValueChange={(v) => setLoanTerm(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Down Payment Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm">Down Payment</Label>
                  <span className="font-bold text-sm">{downPayment}%</span>
                </div>
                <Slider
                  value={[downPayment]}
                  onValueChange={([value]) => setDownPayment(value)}
                  min={0}
                  max={50}
                  step={1}
                  className="py-2"
                />
                <div className="text-xs text-muted-foreground">
                  ${((loanAmount * downPayment) / 100).toLocaleString()} down
                </div>
              </div>

              {/* Additional Costs */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Property Tax</Label>
                  <Input
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(parseFloat(e.target.value) || 0)}
                    placeholder="$/mo"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Insurance</Label>
                  <Input
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(parseFloat(e.target.value) || 0)}
                    placeholder="$/mo"
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">HOA Fees</Label>
                  <Input
                    type="number"
                    value={hoaFees}
                    onChange={(e) => setHoaFees(parseFloat(e.target.value) || 0)}
                    placeholder="$/mo"
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              {/* Monthly Payment Display */}
              <Card className="p-6 bg-gradient-to-br from-[#10b981] to-[#059669] text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="text-sm opacity-90">Estimated Monthly Payment</div>
                </div>
                <div className="text-4xl font-bold mb-1">
                  ${payment.total.toLocaleString()}
                  <span className="text-xl opacity-90">/mo</span>
                </div>
                <div className="text-xs opacity-90">
                  Total principal: ${((loanAmount * (1 - downPayment / 100))).toLocaleString()}
                </div>
              </Card>

              {/* Pie Chart */}
              <Card className="p-5">
                <h3 className="font-bold mb-3">Payment Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value}`} />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {chartData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <div className="text-xs">
                        <div className="text-muted-foreground">{item.name}</div>
                        <div className="font-semibold">${item.value}/mo</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
          
          {/* CTA Button - Centered under both columns */}
          <div className="mt-6 flex justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-12">
              Get Pre-Approved for This Amount
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}