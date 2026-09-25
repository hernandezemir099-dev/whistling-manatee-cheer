export type ScenarioInput = {
  balance: number;
  age: number;
  retirementAge: number;
  monthly: number;
  annualReturn: number;
  inflation: number;
  annualFee: number;
  retirementYears: number;
};

export function projectScenario(input: ScenarioInput) {
  const { balance, age, retirementAge, monthly, annualReturn, inflation, annualFee, retirementYears } = input;
  if (Object.values(input).some(value => !Number.isFinite(value)) || balance < 0 || balance > 1e9 || monthly < 0 || monthly > 1e9 || !Number.isInteger(age) || age < 18 || !Number.isInteger(retirementAge) || retirementAge <= age || retirementAge > 90 || annualReturn < -0.2 || annualReturn > 0.2 || inflation < 0 || inflation > 0.15 || annualFee < 0 || annualFee > 0.05 || !Number.isInteger(retirementYears) || retirementYears < 5 || retirementYears > 40) return null;
  const monthlyGrowth = Math.pow(1 + annualReturn, 1 / 12);
  const monthlyFee = annualFee / 12;
  let net = balance;
  let gross = balance;
  let fees = 0;
  const rows = [{ age, nominal: balance, real: balance, grossReal: balance }];
  const months = (retirementAge - age) * 12;
  for (let month = 1; month <= months; month++) {
    const grown = net * monthlyGrowth;
    const fee = grown * monthlyFee;
    fees += fee;
    // Fee deducted from the grown balance; contribution arrives at month end.
    net = grown - fee + monthly;
    gross = gross * monthlyGrowth + monthly;
    if (month % 12 === 0) {
      const deflator = Math.pow(1 + inflation, month / 12);
      rows.push({ age: age + month / 12, nominal: net, real: net / deflator, grossReal: gross / deflator });
    }
  }
  const deflator = Math.pow(1 + inflation, months / 12);
  return { rows, nominal: net, real: net / deflator, monthlyIncome: net / deflator / (retirementYears * 12), totalFeesNominal: fees, feeImpactReal: (gross - net) / deflator, feeImpactNominal: gross - net };
}
