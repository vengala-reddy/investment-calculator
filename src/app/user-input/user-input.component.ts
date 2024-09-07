import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.interface';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  // calculate = output<InvestmentInput>();
  public initialInvestment = signal('0');
  public annualInvestment = signal('0');
  public expectedReturn = signal('5');
  public duration = signal('10');
  private investmentSerice = inject(InvestmentService);

  public onSubmit() {
    // this.calculate.emit({
    //   initialInvestment: +this.initialInvestment(),
    //   annualInvestment: +this.annualInvestment(),
    //   expectedReturn: +this.expectedReturn(),
    //   duration: +this.duration()
    // });
    this.investmentSerice.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration()
    });
    this.initialInvestment.set('0');
    this.annualInvestment.set('0');
    this.expectedReturn.set('5');
    this.duration.set('10');
  }
}
