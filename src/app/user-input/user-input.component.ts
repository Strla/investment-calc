import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserInput} from "./user-input.model";
import {InvestmentService} from "../investment.service";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  data = signal<UserInput>({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 5,
    duration: 10
  });

  private investmentService = inject(InvestmentService);

  onSubmit() {
    this.investmentService.calculateInvestmentResults(this.data());
    this.data.set({
      initialInvestment: 0,
      annualInvestment: 0,
      expectedReturn: 5,
      duration: 10
    });
  }
}
