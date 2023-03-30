package com.goodstart.flatsdata.services;

import org.springframework.stereotype.Service;

/**
 * Calculator service for logic to calculate affordability
 * @author Jovan
 */
@Service
public class CalculatorService {
    /**
     * @implSpec Using 3-3-5 rule to calculate affordability based on https://dollarsandsense.sg/3-3-5-rule-of-buying-an-hdb-flat-how-much-can-singaporeans-really-afford/
     * @param budget Budget (cash) available on hand
     * @param cpfAmount Current value of CPF
     * @param hdbCost Cost of the BTO in S$
     * @param loanAmount Total amount loaned from HDB/Bank
     * @param annualInterest Annual Interest rate for loan repayment
     * @param repaymentPeriod Time period to fully repay loan
     * @param fixedIncome Monthly income value
     * @param otherIncome Additional income value
     * @return Afforability True/False
     */
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
