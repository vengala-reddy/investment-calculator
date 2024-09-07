import { Injectable, signal } from "@angular/core";
import { InvestmentInput } from "./investment-input.interface";

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
    public resultsData = signal<{
        year: number,
        interest: number,
        valueEndOfYear: number,
        annualInvestment: number,
        totalInterest: number
        totalAmountInvested: number
    }[] | undefined>(undefined);
    public calculateInvestmentResults(data: InvestmentInput) {
        const { initialInvestment, annualInvestment, expectedReturn, duration } = data;
        const annualData = [];
        let investmentValue = initialInvestment;
        for (let i = 0; i < duration; i++) {
            const year = i + 1;
            const interestEarnedInYear = investmentValue * (expectedReturn / 100);
            investmentValue += annualInvestment + interestEarnedInYear;
            const totalInterest = investmentValue - (annualInvestment * year) - initialInvestment;
            annualData.push({
                year,
                interest: interestEarnedInYear,
                valueEndOfYear: investmentValue,
                annualInvestment,
                totalInterest,
                totalAmountInvested: initialInvestment + (annualInvestment * year)
            });
        }
        this.resultsData.set(annualData);
    }
}