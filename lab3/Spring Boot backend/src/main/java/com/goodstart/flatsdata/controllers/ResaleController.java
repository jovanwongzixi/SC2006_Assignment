package com.goodstart.flatsdata.controllers;

import com.goodstart.flatsdata.entities.Resale;
import com.goodstart.flatsdata.services.ResaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/flat_data/resale")
public class ResaleController {
    private final ResaleService resaleService;
    private final String pageSize = "5";
    public ResaleController(ResaleService resaleService){
        this.resaleService = resaleService;
    }

    @GetMapping("/{pageOffset}")
    public ResponseEntity<List<Resale>> getFirstTwentyResale(@PathVariable Integer pageOffset){
        return new ResponseEntity<>(resaleService.firstTwentyResale(pageOffset), HttpStatus.OK);
    }

    @GetMapping("/location-list")
    public ResponseEntity<List<Resale>> getLocationList(){
        return new ResponseEntity<>(resaleService.locationList(), HttpStatus.OK);
    }

    @GetMapping("/location/{town}")
    public ResponseEntity<List<Resale>> getByTown(@PathVariable String town){
        return new ResponseEntity<>(resaleService.selectedTown(town), HttpStatus.OK);
    }

    @GetMapping("/query")
    public ResponseEntity<List<Resale>> getByMultipleQueries(
            @RequestParam(required = false, name = "town") String town,
            @RequestParam(required = false, name = "min_price") Integer min_price,
            @RequestParam(required = false, name = "max_price") Integer max_price,
            @RequestParam(required = false, name = "flat_types") String flat_types,
            @RequestParam(required = false, name = "amenities") String amenities,
            @RequestParam(required = false, name = "remaining_lease") Integer remaining_lease,
            @RequestParam(defaultValue = "0", name = "page") Integer page,
            @RequestParam(defaultValue = pageSize, name = "size") Integer size
    ){
        return new ResponseEntity<>(resaleService.multipleQueries(
                town,
                min_price,
                max_price,
                flat_types,
                amenities,
                remaining_lease,
                page,
                size
        ), HttpStatus.OK);
    }

    @GetMapping("/query_size")
    public ResponseEntity<Map<String, Long>> getQuerySize(
            @RequestParam(required = false, name = "town") String town,
            @RequestParam(required = false, name = "min_price") Integer min_price,
            @RequestParam(required = false, name = "max_price") Integer max_price,
            @RequestParam(required = false, name = "flat_types") String flat_types,
            @RequestParam(required = false, name = "amenities") String amenities,
            @RequestParam(required = false, name = "remaining_lease") Integer remaining_lease,
            @RequestParam(defaultValue = pageSize, name = "size") Long size
    ){
        return new ResponseEntity<>(resaleService.queryResultSize(
                town,
                min_price,
                max_price,
                flat_types,
                amenities,
                remaining_lease,
                size
        ), HttpStatus.OK);
    }
}