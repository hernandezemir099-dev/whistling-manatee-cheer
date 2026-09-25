export const mxn = (amount: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(amount);

export function futureBalance(balance: number, monthly: number, years: number, annualRate: number) {
  const months = Math.round(years * 12);
  const rate = Math.pow(1 + annualRate, 1 / 12) - 1;
  if (rate === 0) return balance + monthly * months;
  const growth = Math.pow(1 + rate, months);
  return balance * growth + monthly * ((growth - 1) / rate);
}

export function getDashboard(values: Record<string, string>) {
  const keys = ["balance", "income", "expenses", "debts", "buffer", "age", "retirementAge", "desiredIncome"];
  if (!values.afore?.trim() || !values.date || keys.some(key => !values[key]?.trim() || !Number.isFinite(Number(values[key])) || Number(values[key]) < 0)) return null;
  const balance = Number(values.balance), income = Number(values.income), age = Number(values.age), retirementAge = Number(values.retirementAge);
  if (!Number.isInteger(age) || !Number.isInteger(retirementAge) || age < 18 || retirementAge <= age || retirementAge > 90 || Number(values.desiredIncome) <= 0 || keys.some(key => Number(values[key]) > 1e9)) return null;
  const expenses = Number(values.expenses), debts = Number(values.debts), buffer = Number(values.buffer);
  const years = retirementAge - age;
  const available = income - expenses - debts - buffer;
  // Conservative preview policy: at most 10% of income or half of available capacity.
  const suggestion = Math.floor(Math.max(0, Math.min(income * 0.1, available * 0.5)));
  const annualReturn = 0.05, inflation = 0.03, retirementYears = 20;
  const target = Number(values.desiredIncome) * 12 * retirementYears;
  const rows = Array.from({ length: years + 1 }, (_, year) => ({
    age: age + year,
    baseline: Math.round(futureBalance(balance, 0, year, annualReturn) / Math.pow(1 + inflation, year)),
    planned: Math.round(futureBalance(balance, suggestion, year, annualReturn) / Math.pow(1 + inflation, year)),
  }));
  const projected = rows[rows.length - 1].planned;
  const nominal = futureBalance(balance, suggestion, years, annualReturn);
  return { balance, income, expenses, debts, buffer, age, retirementAge, years, available, suggestion, annualReturn, inflation, retirementYears, target, rows, projected, nominal, gap: Math.max(0, target - projected), currentGap: Math.max(0, target - balance), progress: Math.min(100, balance / target * 100), estimatedIncome: projected / (12 * retirementYears) };
}
