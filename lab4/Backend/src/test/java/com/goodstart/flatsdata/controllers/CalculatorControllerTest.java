package com.goodstart.flatsdata.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.goodstart.flatsdata.services.CalculatorService;

@WebMvcTest(CalculatorController.class)
public class CalculatorControllerTest {
    
    @Autowired
    private MockMvc mvc;

    @MockBean
    private CalculatorService service;

    @Test
    public void truthinessShouldReturnFromService() throws Exception{
        Double budget = 800000.0;
        Double cpfAmount = 200000.0;
        Double fixedIncome = 5000.0;
        Double otherIncome = 0.0;
        when(service.calculateAffordability(budget, cpfAmount, fixedIncome, otherIncome))
            .thenReturn(new HashMap<String, Double>());
        
        String apiString = "/api/calculator/calculate_affordability?budget="+budget+"&cpf_amount="+cpfAmount+"&fixedIncome="+fixedIncome+"&otherIncome="+otherIncome;
        MvcResult result =  this.mvc.perform(get(apiString)).andDo(print())
            .andExpect(status().isOk())
            .andReturn();
        String responseBody = result.getResponse().getContentType();
        assertEquals(responseBody, "application/json");
    }

    @Test
    public void statusErrorWithInvalidInput() throws Exception{
        Double cpfAmount = 200000.0;
        Double fixedIncome = 5000.0;
        Double otherIncome = 0.0;
        String badInput = "troll";
        String apiString = "/api/calculator/calculate_affordability?budget="+badInput+"&cpf_amount="+cpfAmount+"&fixedIncome="+fixedIncome+"&otherIncome="+otherIncome;
        this.mvc.perform(get(apiString)).andDo(print())
            .andExpect(status().isBadRequest());
    }

}