package com.goodstart.flatsdata.controllers;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
// testing implementation of error handling with custom message
@ControllerAdvice
public class ErrorHandlingControllerAdvice {

    @ExceptionHandler
    ProblemDetail handle(IllegalArgumentException iae){
        return ProblemDetail
                .forStatusAndDetail(HttpStatusCode.valueOf(400), iae.getMessage());
    }
}
