package com.goodstart.flatsdata.controllers;

import com.goodstart.flatsdata.entities.SearchParams;
import com.goodstart.flatsdata.services.SearchParamsService;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/flat_data/search_params")
public class SearchParamsController {

    private final SearchParamsService service;
    private final ObservationRegistry registry;
    public SearchParamsController(SearchParamsService searchParamsService, ObservationRegistry observationRegistry){
        this.service = searchParamsService;
        this.registry = observationRegistry;
    }

    @GetMapping("/towns")
    public ResponseEntity<List<String>> getAllTowns(){
        return new ResponseEntity<>(service.allTowns(), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<SearchParams> getAllSearchParams(){
        return Observation
                .createNotStarted("getAllSearchParams", this.registry)
                .observe(() -> new ResponseEntity<>(service.allSearchParams(),HttpStatus.OK));
    }
}
