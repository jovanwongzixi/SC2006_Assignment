package com.goodstart.flatsdata.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.goodstart.flatsdata.services.CalculatorService;

/**
 * Controller to create REST APIs to use calculator logic
 * @author Jovan
 */
@RestController
@RequestMapping("api/calculator")
public class CalculatorController {
    private final CalculatorService calculatorService;
    public CalculatorController(CalculatorService calculatorService){
        this.calculatorService = calculatorService;
    }

    /**
     * Get affordability based on params in request
     * 
     * @apiNote Current api requires all params to be used as part of calculation.
     * @param budget Budget (cash) available on hand
     * @param cpfAmount Current value of CPF
     * @param hdbCost Cost of the BTO in S$
     * @param loanAmount Total amount loaned from HDB/Bank
     * @param annualInterest Annual Interest rate for loan repayment
     * @param repaymentPeriod Time period to fully repay loan
     * @param fixedIncome Monthly income value
     * @param otherIncome Additional income value
     * @return Afforability True/False, along with status 200
     */
    @GetMapping("/calculate_affordability")
    public ResponseEntity<Boolean> getAffordability(
        @RequestParam(name = "budget") Double budget,
        @RequestParam(name = "cpf_amount") Double cpfAmount,
        @RequestParam(name = "hdb_cost") Double hdbCost,
        @RequestParam(name = "loan_amount") Double loanAmount,
        @RequestParam(name = "annual_interest") Double annualInterest,
        @RequestParam(name = "repayment_period") Double repaymentPeriod,
        @RequestParam(name = "fixedIncome") Double fixedIncome,
        @RequestParam(name = "otherIncome") Double otherIncome
    ){
        return new ResponseEntity<>(calculatorService.calculateAffordability(
            budget,
            cpfAmount,
            hdbCost,
            loanAmount,
            annualInterest,
            repaymentPeriod,
            fixedIncome,
            otherIncome
        ), HttpStatus.OK);
    }
}
