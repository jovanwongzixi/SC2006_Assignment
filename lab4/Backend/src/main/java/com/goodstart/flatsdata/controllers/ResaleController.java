package com.goodstart.flatsdata.controllers;

import com.goodstart.flatsdata.entities.Resale;
import com.goodstart.flatsdata.services.ResaleService;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller to create REST APIs for handling of resale data
 * @author Jovan
 */
@RestController
@RequestMapping("api/flat_data/resale")
public class ResaleController {
    private final ResaleService resaleService;
    private final ObservationRegistry registry;
    private final String pageSize = "5";
    public ResaleController(ResaleService resaleService, ObservationRegistry observationRegistry){
        this.resaleService = resaleService;
        this.registry = observationRegistry;
    }

    // @GetMapping("/{pageOffset}")
    // public ResponseEntity<List<Resale>> getFirstTwentyResale(@PathVariable Integer pageOffset){
    //     return new ResponseEntity<>(resaleService.firstTwentyResale(pageOffset), HttpStatus.OK);
    // }

    // @GetMapping("/location-list")
    // public ResponseEntity<List<Resale>> getLocationList(){
    //     return new ResponseEntity<>(resaleService.locationList(), HttpStatus.OK);
    // }

    // @GetMapping("/location/{town}")
    // public ResponseEntity<List<Resale>> getByTown(@PathVariable String town){
    //     return new ResponseEntity<>(resaleService.selectedTown(town), HttpStatus.OK);
    // }

    /**
     * GET request to get list of resale flats based on user parameters
     * @implSpec For flat_types and amenities, if no specified flats in query, all flat types will be returned. 
     *           If multiple flat types selected, listings with at least one of the flat type requirements will be returned.
     *           If multiple nearby_amenities selected, only listings with all the nearby_amenities requirements will be returned.
     * @param town Name of town, optional
     * @param min_price Mininum price of flat, optional
     * @param max_price Maximum price of flat, optional
     * @param flat_types Types of flats (eg. 2 room, executive), optional
     * @param amenities Nearby amenities, optional
     * @param remaining_lease Number of years of lease left, optional
     * @param page Page number for pagination, default value set to zero
     * @param size Number of results per page, default value set using pageSize
     * @return List of resale flats fulfilling query requirements
     */
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
        return Observation
                .createNotStarted("resaleQuery", registry)
                .observe(() -> new ResponseEntity<>(resaleService.multipleQueries(
                        town,
                        min_price,
                        max_price,
                        flat_types,
                        amenities,
                        remaining_lease,
                        page,
                        size
                ), HttpStatus.OK));         
    }

    /**
     * GET request to get page size and number of results based on query
     * @implSpec For flat_types and amenities, if no specified flats in query, all flat types will be returned. 
     *           If multiple flat types selected, listings with at least one of the flat type requirements will be returned.
     *           If multiple nearby_amenities selected, only listings with all the nearby_amenities requirements will be returned.
     * @param town Name of town, optional
     * @param min_price Mininum price of flat, optional
     * @param max_price Maximum price of flat, optional
     * @param flat_types Types of flats (eg. 2 room, executive), optional
     * @param amenities Nearby amenities, optional
     * @param remaining_lease Number of years of lease left, optional
     * @param size Number of results per page, default value set using pageSize
     * @return Map containing number of results and number of results per page
     */
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