import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {UserInputComponent} from "./user-input/user-input.component";
import {UserInput} from "./user-input/user-input.model";
import {InvestmentResultsComponent} from "./investment-results/investment-results.component";
import {InvestmentResults} from "./investment-results/investment-results.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserInputComponent, InvestmentResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  resultsData = signal<InvestmentResults[]>([])

  onCalculateInvestmentResults(data: UserInput) {
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
