import { useState } from 'react';
import { Calculator, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const parseCurrency = (value: string) => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
};

// Custom button component with hover effects
const CalculatorButton = ({ href, children, isExternal = false }: { href: string; children: React.ReactNode; isExternal?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const buttonContent = (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#52276C',
        color: 'white',
        fontSize: '15px',
        fontWeight: '500',
        padding: '11px 20px',
        borderRadius: '0.375rem',
        width: '100%',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? 'rgba(38, 50, 56, 0.25) 0px 8px 24px 0px' 
          : 'rgba(38, 50, 56, 0.1) 0px 2px 12px 0px'
      }}
    >
      {children}
    </button>
  );
  
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="w-full" style={{ textDecoration: 'none' }}>
        {buttonContent}
      </a>
    );
  }
  
  return (
    <a href={href} className="w-full" style={{ textDecoration: 'none' }}>
      {buttonContent}
    </a>
  );
};

export function MortgageCalculatorAccordion() {
  return (
    <section className="py-12 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 text-sm">
            <Calculator className="w-4 h-4" />
            <span className="font-semibold">Mortgage Calculators</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Plan Your Home Purchase
          </h2>
          <p className="text-muted-foreground">
            Use our professional calculators to estimate costs and compare options
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Accordion type="single" collapsible defaultValue="payment" className="space-y-4">
            {/* Mortgage Payment Calculator */}
            <AccordionItem value="payment" className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Mortgage Payment Calculator</h3>
                    <p className="text-sm text-muted-foreground">Calculate your monthly mortgage payment</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <PaymentCalculator />
              </AccordionContent>
            </AccordionItem>

            {/* Home Affordability Calculator */}
            <AccordionItem value="affordability" className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Home Affordability Calculator</h3>
                    <p className="text-sm text-muted-foreground">How much home can you afford?</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <AffordabilityCalculator />
              </AccordionContent>
            </AccordionItem>

            {/* Rent vs Buy Calculator */}
            <AccordionItem value="rentvsbuy" className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Rent vs Buy Calculator</h3>
                    <p className="text-sm text-muted-foreground">Compare the cost of renting versus buying</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <RentVsBuyCalculator />
              </AccordionContent>
            </AccordionItem>

            {/* Refinance Calculator */}
            <AccordionItem value="refinance" className="border rounded-lg bg-white shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Refinance Calculator</h3>
                    <p className="text-sm text-muted-foreground">See how much you could save by refinancing</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <RefinanceCalculator />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function PaymentCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(10500);
  const [downPaymentPercent, setDownPaymentPercent] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [propertyTax, setPropertyTax] = useState(300);
  const [homeInsurance, setHomeInsurance] = useState(150);
  const [hoaDues, setHoaDues] = useState(0);
  const [includePMI, setIncludePMI] = useState(true);

  const handleHomePriceChange = (newPrice: number) => {
    setHomePrice(newPrice);
    setDownPayment(Math.round(newPrice * (downPaymentPercent / 100)));
  };

  const handleDownPaymentChange = (newDownPayment: number) => {
    setDownPayment(newDownPayment);
    setDownPaymentPercent((newDownPayment / homePrice) * 100);
  };

  const calculate = () => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const downPaymentPercent = (downPayment / homePrice) * 100;
    let pmi = 0;
    if (includePMI && downPaymentPercent < 20) {
      pmi = (loanAmount * 0.005) / 12;
    }
    
    const totalMonthly = monthlyPI + pmi + propertyTax + homeInsurance + hoaDues;
    
    return {
      total: Math.round(totalMonthly),
      principalInterest: Math.round(monthlyPI),
      pmi: Math.round(pmi),
      taxes: propertyTax,
      insurance: homeInsurance,
      hoa: hoaDues,
      loanAmount: Math.round(loanAmount)
    };
  };

  const result = calculate();
  
  const chartData = [
    { name: 'P&I', value: result.principalInterest, color: '#0ea5e9' },
    { name: 'Taxes', value: result.taxes, color: '#10b981' },
    { name: 'Insurance', value: result.insurance, color: '#f59e0b' },
    ...(result.hoa > 0 ? [{ name: 'HOA', value: result.hoa, color: '#8b5cf6' }] : []),
    ...(result.pmi > 0 ? [{ name: 'PMI', value: result.pmi, color: '#ec4899' }] : [])
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-6">
      {/* Left Column - Inputs */}
      <div>
        <Card className="p-6 bg-gray-50/50 border-gray-200 shadow-sm">
          <div className="space-y-6">
            {/* Home Price with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Home price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                  <Input
                    type="text"
                    value={formatNumber(homePrice)}
                    onChange={(e) => handleHomePriceChange(parseCurrency(e.target.value))}
                    className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                  />
                </div>
              </div>
              <Slider
                value={[homePrice]}
                onValueChange={([value]: number[]) => handleHomePriceChange(value)}
                min={50000}
                max={2000000}
                step={10000}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Down Payment with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Down payment</Label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={formatNumber(downPayment)}
                      onChange={(e) => handleDownPaymentChange(parseCurrency(e.target.value))}
                      className="pl-10 w-28 text-right bg-white border-gray-300 font-medium"
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium min-w-[48px] text-right">
                    {downPaymentPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <Slider
                value={[downPayment]}
                onValueChange={([value]: number[]) => handleDownPaymentChange(Math.min(value, homePrice * 0.5))}
                min={0}
                max={homePrice * 0.5}
                step={1000}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Loan term</Label>
              <Select value={loanTerm.toString()} onValueChange={(v: string) => setLoanTerm(parseInt(v))}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Interest rate</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="pr-8 bg-white border-gray-300"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
              </div>
            </div>

            {/* Assumptions Toggle */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowAssumptions(!showAssumptions)}
                className="flex items-center justify-between w-full text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>Additional costs</span>
                <span className="text-xl">{showAssumptions ? '−' : '+'}</span>
              </button>
              
              {showAssumptions && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pmi"
                      checked={includePMI}
                      onCheckedChange={(checked: boolean) => setIncludePMI(checked)}
                    />
                    <label htmlFor="pmi" className="text-sm text-gray-600 cursor-pointer">
                      Include PMI (if down payment &lt; 20%)
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Property tax (monthly)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                      <Input
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(parseFloat(e.target.value) || 0)}
                        className="pl-10 bg-white border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Home insurance (monthly)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                      <Input
                        type="number"
                        value={homeInsurance}
                        onChange={(e) => setHomeInsurance(parseFloat(e.target.value) || 0)}
                        className="pl-10 bg-white border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">HOA dues (monthly)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                      <Input
                        type="number"
                        value={hoaDues}
                        onChange={(e) => setHoaDues(parseFloat(e.target.value) || 0)}
                        className="pl-10 bg-white border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        {/* Main Result Card */}
        <Card className="p-8 bg-white border-gray-200 shadow-sm">
          <div>
            <p className="text-2xl font-semibold mb-6" style={{ color: 'rgb(26, 26, 26)' }}>
              Your estimated monthly mortgage payment is{' '}
              <span style={{ color: '#0097A7' }}>{formatCurrency(result.total)}</span>
              <span style={{ color: '#0097A7' }}>.</span>
            </p>
            <div className="flex flex-col gap-2">
              <CalculatorButton href="https://tinyurl.com/42xx3hzu" isExternal>
                Apply Now
              </CalculatorButton>
              <CalculatorButton href="/contact-us">
                Talk to a Loan Officer
              </CalculatorButton>
            </div>
          </div>

          {/* Tabs for Breakdown and Schedule */}
          <div className="mt-8">
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border-b rounded-none h-auto p-0">
                <TabsTrigger 
                  value="breakdown" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
                >
                  Breakdown
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
                >
                  Schedule
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="mt-6">
                <div className="flex items-center gap-8">
                  {/* Donut Chart */}
                  <div className="relative flex-shrink-0">
                    <div style={{ width: 200, height: 200 }}>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={chartData}
                          cx={100}
                          cy={100}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-xl font-bold text-gray-900">{formatCurrency(result.total)}</div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-2.5 flex-1">
                    {chartData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6">
                <div className="text-sm text-gray-600">
                  <p>Amortization schedule coming soon.</p>
                  <p className="mt-2">This will show your payment breakdown over the life of the loan.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [creditScore, setCreditScore] = useState('below'); // 'below' or 'above' 680
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculate = () => {
    const monthlyIncome = annualIncome / 12;
    // Credit score determines max DTI ratio
    const dtiRatio = creditScore === 'above' ? 0.50 : 0.41;
    const maxMonthlyPayment = (monthlyIncome * dtiRatio) - monthlyDebts;
    
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    const propertyTax = 300;
    const homeInsurance = 150;
    const monthlyTaxInsurance = propertyTax + homeInsurance;
    
    const availableForPI = maxMonthlyPayment - monthlyTaxInsurance;
    
    const maxLoanAmount = availableForPI * ((Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments)));
    
    // Home price is just the max loan amount (no down payment in affordability calc)
    const homePrice = maxLoanAmount;
    
    return {
      homePrice: Math.round(homePrice),
      maxMonthlyPayment: Math.round(maxMonthlyPayment),
      monthlyIncome: Math.round(monthlyIncome),
      availableForHousing: Math.round(maxMonthlyPayment),
      principalInterest: Math.round(availableForPI),
      taxes: propertyTax,
      insurance: homeInsurance,
      debts: monthlyDebts,
      dtiRatio: Math.round(dtiRatio * 100)
    };
  };

  const result = calculate();

  const chartData = [
    { name: 'P&I', value: result.principalInterest, color: '#0ea5e9' },
    { name: 'Taxes', value: result.taxes, color: '#10b981' },
    { name: 'Insurance', value: result.insurance, color: '#f59e0b' }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-6">
      {/* Left Column - Inputs */}
      <div>
        <Card className="p-6 bg-gray-50/50 border-gray-200 shadow-sm">
          <div className="space-y-6">
            {/* Annual Income with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Annual income</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                  <Input
                    type="text"
                    value={formatNumber(annualIncome)}
                    onChange={(e) => setAnnualIncome(parseCurrency(e.target.value))}
                    className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                  />
                </div>
              </div>
              <Slider
                value={[annualIncome]}
                onValueChange={([value]: number[]) => setAnnualIncome(value)}
                min={30000}
                max={300000}
                step={5000}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Credit Score Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Credit score</Label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="creditScore"
                    value="below"
                    checked={creditScore === 'below'}
                    onChange={() => setCreditScore('below')}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Below 680 (41% max DTI)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="creditScore"
                    value="above"
                    checked={creditScore === 'above'}
                    onChange={() => setCreditScore('above')}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-sm text-gray-700">680 or above (50% max DTI)</span>
                </label>
              </div>
            </div>

            {/* Monthly Debts with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Monthly debts</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                  <Input
                    type="number"
                    value={monthlyDebts}
                    onChange={(e) => setMonthlyDebts(parseFloat(e.target.value) || 0)}
                    className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                  />
                </div>
              </div>
              <Slider
                value={[monthlyDebts]}
                onValueChange={([value]: number[]) => setMonthlyDebts(value)}
                min={0}
                max={5000}
                step={50}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Loan term</Label>
              <Select value={loanTerm.toString()} onValueChange={(v: string) => setLoanTerm(parseInt(v))}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Interest rate</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="pr-8 bg-white border-gray-300"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        {/* Main Result Card */}
        <Card className="p-8 bg-white border-gray-200 shadow-sm">
          <div>
            <p className="text-2xl font-semibold mb-6" style={{ color: 'rgb(26, 26, 26)' }}>
              Your maximum home price is{' '}
              <span style={{ color: '#0097A7' }}>{formatCurrency(result.homePrice)}</span>
              <span style={{ color: '#0097A7' }}>.</span>
            </p>
            <div className="flex flex-col gap-2">
              <CalculatorButton href="https://tinyurl.com/42xx3hzu" isExternal>
                Apply Now
              </CalculatorButton>
              <CalculatorButton href="/contact-us">
                Talk to a Loan Officer
              </CalculatorButton>
            </div>
          </div>

          {/* Tabs for Breakdown and Schedule */}
          <div className="mt-8">
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border-b rounded-none h-auto p-0">
                <TabsTrigger 
                  value="breakdown" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
                >
                  Breakdown
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
                >
                  Schedule
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="mt-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-sm text-gray-600">Monthly income</span>
                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(result.monthlyIncome)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-sm text-gray-600">Existing debts</span>
                    <span className="text-sm font-semibold text-red-600">−{formatCurrency(result.debts)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-300">
                    <span className="text-sm font-semibold text-gray-700">Available for housing</span>
                    <span className="text-sm font-bold text-primary">{formatCurrency(result.availableForHousing)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  {/* Donut Chart */}
                  <div className="relative flex-shrink-0">
                    <div style={{ width: 200, height: 200 }}>
                      <PieChart width={200} height={200}>
                        <Pie
                          data={chartData}
                          cx={100}
                          cy={100}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-xl font-bold text-gray-900">{formatCurrency(result.maxMonthlyPayment)}</div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-2.5 flex-1">
                    {chartData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-gray-600">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6">
                <div className="text-sm text-gray-600">
                  <p>Monthly payment: {formatCurrency(result.maxMonthlyPayment)}</p>
                  <p className="mt-2">Based on {result.dtiRatio}% debt-to-income ratio</p>
                  <p className="mt-2">Interest rate: {interestRate}% | Term: {loanTerm} years</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}

function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // Store as percentage
  const [monthlyRent, setMonthlyRent] = useState(2100);
  const [yearsToCompare, setYearsToCompare] = useState(5);
  const [interestRate, setInterestRate] = useState(6.5);
  const homeAppreciation = 3;
  const rentIncrease = 3;
  
  // Calculate actual down payment from percentage
  const downPayment = (homePrice * downPaymentPercent) / 100;

  const calculate = () => {
    const initialLoanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = 30 * 12;
    
    const monthlyPI = initialLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const propertyTax = 300;
    const homeInsurance = 150;
    const maintenance = 200;
    const monthlyBuying = monthlyPI + propertyTax + homeInsurance + maintenance;
    
    let totalRentPaid = 0;
    let currentRent = monthlyRent;
    for (let year = 0; year < yearsToCompare; year++) {
      totalRentPaid += currentRent * 12;
      currentRent *= (1 + rentIncrease / 100);
    }
    
    const totalPaymentsMade = monthlyBuying * yearsToCompare * 12;
    const totalBuying = downPayment + totalPaymentsMade;
    
    const homeValueAfter = homePrice * Math.pow(1 + homeAppreciation / 100, yearsToCompare);
    let remainingBalance = initialLoanAmount;
    
    for (let month = 1; month <= yearsToCompare * 12; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      remainingBalance = Math.max(0, remainingBalance - principalPayment);
    }
    
    const equity = homeValueAfter - remainingBalance;
    const netCostBuying = totalBuying - equity;
    
    return {
      totalRenting: Math.round(totalRentPaid),
      totalBuying: Math.round(totalBuying),
      netCostBuying: Math.round(netCostBuying),
      equity: Math.round(equity),
      homeValueAfter: Math.round(homeValueAfter),
      monthlyBuying: Math.round(monthlyBuying),
      savingsFromBuying: Math.round(totalRentPaid - netCostBuying)
    };
  };

  const result = calculate();
  const buyingIsBetter = result.savingsFromBuying > 0;

  const maxValue = Math.max(result.totalRenting, result.netCostBuying);
  const rentPercentage = (result.totalRenting / maxValue) * 100;
  const buyPercentage = (result.netCostBuying / maxValue) * 100;

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-6">
      {/* Left Column - Inputs */}
      <div>
        <Card className="p-6 bg-gray-50/50 border-gray-200 shadow-sm">
          <div className="space-y-6">
            {/* Home Price with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Home price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                  <Input
                    type="text"
                    value={formatNumber(homePrice)}
                    onChange={(e) => setHomePrice(parseCurrency(e.target.value))}
                    className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                  />
                </div>
              </div>
              <Slider
                value={[homePrice]}
                onValueChange={([value]: number[]) => setHomePrice(value)}
                min={100000}
                max={1000000}
                step={10000}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Down Payment with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Down payment</Label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                    <Input
                      type="text"
                      value={formatNumber(Math.round(downPayment))}
                      onChange={(e) => {
                        const value = parseCurrency(e.target.value);
                        const percent = (value / homePrice) * 100;
                        setDownPaymentPercent(Math.min(50, Math.max(0, percent)));
                      }}
                      className="pl-10 w-32 text-right bg-white border-gray-300 font-medium"
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {downPaymentPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <Slider
                value={[downPaymentPercent]}
                onValueChange={([value]: number[]) => setDownPaymentPercent(value)}
                min={0}
                max={50}
                step={1}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Monthly Rent with Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <Label className="text-sm font-medium text-gray-700">Monthly rent</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">$</span>
                  <Input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(parseFloat(e.target.value) || 0)}
                    className="pl-10 w-36 text-right bg-white border-gray-300 font-medium"
                  />
                </div>
              </div>
              <Slider
                value={[monthlyRent]}
                onValueChange={([value]: number[]) => setMonthlyRent(value)}
                min={500}
                max={5000}
                step={100}
                className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              />
            </div>

            {/* Years to Compare */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Years to compare</Label>
              <Select value={yearsToCompare.toString()} onValueChange={(v: string) => setYearsToCompare(parseInt(v))}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="7">7 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Interest rate</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="pr-8 bg-white border-gray-300"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        {/* Main Result Card */}
        <Card className="p-8 bg-white border-gray-200 shadow-sm">
          <div>
            <p className="text-2xl font-semibold mb-6" style={{ color: 'rgb(26, 26, 26)' }}>
              {buyingIsBetter ? 'Buying' : 'Renting'} saves you{' '}
              <span style={{ color: '#0097A7' }}>{formatCurrency(Math.abs(result.savingsFromBuying))}</span>
              <span style={{ color: '#0097A7' }}>.</span>
            </p>
            <div className="flex flex-col gap-2">
              <CalculatorButton href="https://tinyurl.com/42xx3hzu" isExternal>
                Apply Now
              </CalculatorButton>
              <CalculatorButton href="/contact-us">
                Talk to a Loan Officer
              </CalculatorButton>
            </div>
          </div>

          {/* Tabs for Breakdown and Schedule */}
          <div className="mt-8">
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border-b rounded-none h-auto p-0">
                <TabsTrigger 
                  value="breakdown" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
                >
                  Breakdown
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
                >
                  Schedule
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="mt-6">
                <div className="space-y-6">
                  {/* Renting Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Renting</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(result.totalRenting)}</span>
                    </div>
                    <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-red-500 flex items-center justify-end pr-3 transition-all"
                        style={{ width: `${rentPercentage}%` }}
                      >
                        {rentPercentage > 15 && <span className="text-xs font-semibold text-gray-700">Total rent paid</span>}
                      </div>
                    </div>
                  </div>

                  {/* Buying Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Buying (net cost)</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(result.netCostBuying)}</span>
                    </div>
                    <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 flex items-center justify-end pr-3 transition-all"
                        style={{ width: `${buyPercentage}%` }}
                      >
                        {buyPercentage > 20 && <span className="text-xs font-semibold text-gray-700">After equity: {formatCurrency(result.equity)}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Monthly payment (buying)</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.monthlyBuying)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Home value after {yearsToCompare} years</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(result.homeValueAfter)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Built equity</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(result.equity)}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6">
                <div className="text-sm text-gray-600">
                  <p>After {yearsToCompare} years comparison:</p>
                  <p className="mt-2">Total rent paid: {formatCurrency(result.totalRenting)}</p>
                  <p className="mt-2">Total buying cost (after equity): {formatCurrency(result.netCostBuying)}</p>
                  <p className="mt-2">Savings by {buyingIsBetter ? 'buying' : 'renting'}: {formatCurrency(Math.abs(result.savingsFromBuying))}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}

function RefinanceCalculator() {
  const [remainingBalance, setRemainingBalance] = useState(150000);
  const [currentRate, setCurrentRate] = useState(8.00);
  const [currentPayment, setCurrentPayment] = useState(1075);
  const [remainingTerm, setRemainingTerm] = useState(20);
  
  const [newRate, setNewRate] = useState(6.5);
  const [newTerm, setNewTerm] = useState(30);

  const calculate = () => {
    const newMonthlyRate = newRate / 100 / 12;
    const newNumPayments = newTerm * 12;
    
    const newMonthlyPayment = remainingBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumPayments)) / (Math.pow(1 + newMonthlyRate, newNumPayments) - 1);
    
    const monthlySavings = currentPayment - newMonthlyPayment;
    const totalSavingsOverTerm = monthlySavings * newNumPayments;
    
    return {
      currentPayment,
      newPayment: Math.round(newMonthlyPayment),
      monthlySavings: Math.round(monthlySavings),
      totalSavings: Math.round(totalSavingsOverTerm)
    };
  };

  const result = calculate();

  const monthlyChartData = [
    { name: 'Current payment', value: result.currentPayment, color: '#0097A7' },
    { name: 'New payment', value: result.newPayment, color: '#000000' }
  ];

  const totalChartData = [
    { name: 'Current payment', value: result.currentPayment * (newTerm * 12), color: '#0097A7' },
    { name: 'New payment', value: result.newPayment * (newTerm * 12), color: '#000000' }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-6">
      {/* Left Column - Input Sections */}
      <div className="space-y-4">
        {/* Current Loan Information */}
        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Current Loan Information</h3>
          <div className="space-y-4">
            {/* Remaining Balance */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Remaining balance</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium pointer-events-none">$</span>
                <Input
                  type="text"
                  value={formatNumber(remainingBalance)}
                  onChange={(e) => setRemainingBalance(parseCurrency(e.target.value))}
                  className="pl-10 font-medium bg-[#0097A7] text-white border-0"
                />
              </div>
              <Slider
                value={[remainingBalance]}
                onValueChange={([value]: number[]) => setRemainingBalance(value)}
                min={50000}
                max={500000}
                step={5000}
                className="[&_[role=slider]]:bg-[#0097A7] [&_[role=slider]]:border-[#0097A7] [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_.bg-primary]:bg-[#0097A7]"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Interest rate</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(parseFloat(e.target.value) || 0)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium">%</span>
              </div>
            </div>

            {/* Monthly Payment */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Monthly payment</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium pointer-events-none">$</span>
                <Input
                  type="number"
                  value={currentPayment}
                  onChange={(e) => setCurrentPayment(parseFloat(e.target.value) || 0)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Remaining Term */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Remaining term</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={remainingTerm}
                  onChange={(e) => setRemainingTerm(parseFloat(e.target.value) || 0)}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm">years</span>
              </div>
            </div>
          </div>
        </Card>

        {/* New Loan Information */}
        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">New Loan Information</h3>
          <div className="space-y-4">
            {/* New Interest Rate */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Interest rate</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  value={newRate}
                  onChange={(e) => setNewRate(parseFloat(e.target.value) || 0)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 font-medium">%</span>
              </div>
            </div>

            {/* New Term */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Loan term</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={newTerm}
                  onChange={(e) => setNewTerm(parseFloat(e.target.value) || 0)}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 text-sm">years</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        {/* Main Result Card */}
        <Card className="p-8 bg-white border-gray-200 shadow-sm">
          <div>
            <p className="text-2xl font-semibold mb-6" style={{ color: 'rgb(26, 26, 26)' }}>
              Your monthly savings would be{' '}
              <span style={{ color: '#0097A7' }}>{formatCurrency(result.monthlySavings)}</span>
              <span style={{ color: '#0097A7' }}>.</span>
            </p>
            <div className="flex flex-col gap-2">
              <CalculatorButton href="https://tinyurl.com/42xx3hzu" isExternal>
                Apply Now
              </CalculatorButton>
              <CalculatorButton href="/contact-us">
                Talk to a Loan Officer
              </CalculatorButton>
            </div>
          </div>

          {/* Tabs for Breakdown and Schedule */}
          <div className="mt-8">
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white border-b rounded-none h-auto p-0">
              <TabsTrigger 
                value="monthly" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
              >
                Monthly Payment
              </TabsTrigger>
              <TabsTrigger 
                value="total"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#0097A7] data-[state=active]:bg-transparent py-3"
              >
                Total Payment
              </TabsTrigger>
              </TabsList>
          
          <TabsContent value="monthly" className="mt-6">
            <div className="space-y-6">
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <BarChart data={monthlyChartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Bar dataKey="value" radius={4}>
                      {monthlyChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0097A7]" />
                  <span className="text-gray-600">Current payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-black" />
                  <span className="text-gray-600">New payment</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="total" className="mt-6">
            <div className="space-y-6">
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                  <BarChart data={totalChartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <XAxis type="number" tickFormatter={(value) => `$${(value/1000).toFixed(0)}K`} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Bar dataKey="value" radius={4}>
                      {totalChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0097A7]" />
                  <span className="text-gray-600">Current payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-black" />
                  <span className="text-gray-600">New payment</span>
                </div>
              </div>
            </div>
          </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <button className="hover:underline flex items-center gap-1">
            Disclosure <ChevronDown className="w-3 h-3" />
          </button>
          <span className="text-gray-400">powered by <span className="font-semibold text-gray-600">Chimney</span></span>
        </div>
      </div>
    </div>
  );
}
