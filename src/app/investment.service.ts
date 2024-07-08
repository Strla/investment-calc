import {Injectable, signal} from '@angular/core';
import {UserInput} from "./user-input/user-input.model";
import {InvestmentResults} from "./investment-results/investment-results.model";

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  resultsData = signal<InvestmentResults[]>([]);

  constructor() {
  }

  calculateInvestmentResults(data: UserInput) {
    const annualData = [];
    let investmentValue = data.initialInvestment;

    for (let i = 0; i < data.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (data.expectedReturn / 100);
      investmentValue += interestEarnedInYear + data.annualInvestment;
      const totalInterest =
        investmentValue - data.annualInvestment * year - data.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: data.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: data.initialInvestment + data.annualInvestment * year,
      });
    }
    this.resultsData.set(annualData)
  }
}
