package com.goodstart.flatsdata.controllers;

import com.goodstart.flatsdata.entities.BTO;
import com.goodstart.flatsdata.services.BTOService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/flat_data/bto")
public class BTOController {
    private final BTOService btoService;
    public BTOController(BTOService btoService){
        this.btoService = btoService;
    }

    @GetMapping("/")
    public ResponseEntity<List<BTO>> getAllBTO(){
        return new ResponseEntity<>(btoService.findAllBTO(), HttpStatus.OK);
    }

    @GetMapping("/query")
    public ResponseEntity<List<BTO>> getByMultipleQueries(
            @RequestParam(required = false, name = "town") String town,
            @RequestParam(required = false, name = "min_price") Integer min_price,
            @RequestParam(required = false, name = "max_price") Integer max_price,
            @RequestParam(required = false, name = "flat_types") String flat_types,
            @RequestParam(required = false, name = "amenities") String amenities,
            @RequestParam(defaultValue = "0", name = "page") Integer page,
            @RequestParam(defaultValue = "5", name = "size") Integer size
    ){
        return new ResponseEntity<>(btoService.multipleQueries(), HttpStatus.OK);
    }
}
