import {Component, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserInput} from "./user-input.model";

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
  calculate = output<UserInput>();
  data = signal<UserInput>({
    initialInvestment: 0,
    annualInvestment: 0,
    expectedReturn: 5,
    duration: 10
  });

  onSubmit() {
    this.calculate.emit(this.data())
    this.data.set({
      initialInvestment: 0,
      annualInvestment: 0,
      expectedReturn: 5,
      duration: 10
    });
  }
}
