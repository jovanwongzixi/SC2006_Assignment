package com.goodstart.flatsdata.services;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    
    public Boolean calculateAffordability(
        Double budget,
        Double cpfAmount,
        Double hdbCost,
        Double loanAmount,
        Double annualInterest,
        Double repaymentPeriod,
        Double fixedIncome,
        Double otherIncome
    ){
        Double totalCash = calcTotalCash(budget, cpfAmount);
        Double totalIncome = calcTotalIncome(fixedIncome, otherIncome);
        Double monthlyRepayment = calcMonthlyRepayment(annualInterest, loanAmount, repaymentPeriod);

        Double hdbAffordRate = totalCash/hdbCost;
        Double mortgageAffordRate = monthlyRepayment/totalIncome;
        if(hdbAffordRate >= 0.3 && mortgageAffordRate <= 0.3) return true;
        return false;
    }

    private Double calcTotalCash(Double budget, Double cpfAmount){
        return budget+cpfAmount;
    }

    private Double calcTotalIncome(Double fixedIncome, Double otherIncome){
        return fixedIncome + otherIncome;
    }

    private Double calcMonthlyRepayment(Double annualInterest, Double loanAmount, Double repaymentPeriod){
        Double monthlyInterest = annualInterest/12;
        Double a = Math.pow(1+monthlyInterest, repaymentPeriod);
        return loanAmount*(monthlyInterest*a)/(a-1);
    }
}
