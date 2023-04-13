package com.goodstart.flatsdata.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * Calculator service for logic to calculate affordability
 * @author Jovan, Yin Cang
 */
@Service
public class CalculatorService {

    private final Double hdbInterest = 0.026;

    /**
     * @implSpec Using 3-3-5 rule to calculate affordability based on https://dollarsandsense.sg/3-3-5-rule-of-buying-an-hdb-flat-how-much-can-singaporeans-really-afford/
     * @param budget Budget (cash) available on hand
     * @param cpfAmount Current value of CPF
     * @param fixedIncome Monthly income value
     * @param otherIncome Additional income value
     * @return Afforability True/False
     */
    public Map<String, Double> calculateAffordability(
        Double budget,
        Double cpfAmount,
        Double fixedIncome,
        Double otherIncome
    ){
        Double totalCash = calcTotalCash(budget, cpfAmount);
        Double totalIncome = calcTotalIncome(fixedIncome, otherIncome);

        Double maxPriceBasedOnInitialCapital = totalCash/0.3;
        Double maxMonthlyMortgage = totalIncome*0.3;
        Double maxPriceBasedOnAnnualIncome = totalIncome*12*5;

        Double maxAffordablePrice = Math.min(maxPriceBasedOnAnnualIncome, maxPriceBasedOnInitialCapital);
        Double totalLoan25Years = 0.85*maxAffordablePrice * Math.pow(1+hdbInterest, 25);
        Double requiredMonthlyRepayment = totalLoan25Years/25/12;
        
        Map<String, Double> result = new HashMap<>();
        result.put("maximumHDBPrice", maxAffordablePrice);
        result.put("maxMonthlyMortgage", maxMonthlyMortgage);
        result.put("totalLoan25Years", Math.ceil(totalLoan25Years));
        result.put("requiredMonthlyRepayment", Math.ceil(requiredMonthlyRepayment));

        return result;
    }

    private Double calcTotalCash(Double budget, Double cpfAmount){
        return budget+cpfAmount;
    }

    private Double calcTotalIncome(Double fixedIncome, Double otherIncome){
        return fixedIncome + otherIncome;
    }
}
