package com.goodstart.flatsdata.services;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CalculatorServiceWhiteBoxTest {
    @InjectMocks
    private CalculatorService calculatorService;

    private final Double hdbPriceToCapitalRatio = 0.3;
    private final Double mortgageToSalaryRatio = 0.3;
    private final Double hdbInterest = 0.026;

    @Test
    @DisplayName("Calculator Results with valid input")
    public void affordableWithValidHDBAffordRateAndValidMortgageAffordRate(){
        Double budget = 80000.0;
        Double cpfAmount = 10000.0;
        Double fixedIncome = 8000.0;
        Double otherIncome = 0.0;
        
        final var affordability = calculatorService.calculateAffordability(budget, cpfAmount, fixedIncome, otherIncome);

        Map<String, Double> expectedResult = new HashMap<>();

        Double maxAffordablePrice = Math.min((budget+cpfAmount)/hdbPriceToCapitalRatio, (fixedIncome+otherIncome)*12*5);
        Double totalLoan25Years = 0.85*maxAffordablePrice * Math.pow(1+hdbInterest, 25);

        expectedResult.put("maximumHDBPrice", (budget+cpfAmount)/hdbPriceToCapitalRatio);
        expectedResult.put("maxMonthlyMortgage", (fixedIncome+otherIncome)*mortgageToSalaryRatio);
        
        expectedResult.put("totalLoan25Years", Math.ceil(totalLoan25Years));
        expectedResult.put("requiredMonthlyRepayment", Math.ceil(totalLoan25Years/25/12));
        assertEquals(affordability, expectedResult);
    }
}
