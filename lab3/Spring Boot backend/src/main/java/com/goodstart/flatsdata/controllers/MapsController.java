package com.goodstart.flatsdata.controllers;

import com.goodstart.flatsdata.entities.NearbyAmenities;
import com.goodstart.flatsdata.services.MapsService;
import com.google.maps.model.LatLng;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller to create REST APIs to deal with data from Google Maps API
 * @author Jovan
 */
@RestController
@RequestMapping("api/maps")
public class MapsController {
    private final MapsService mapsService;
    public MapsController(MapsService mapsService){
        this.mapsService = mapsService;
    }

    /**
     * Add amenities for all listings in a single town
     * @param payload JSON with 'town' key
     * @return True on completion of updating nearby_amenities for all listings of single town in MongoDB, along with status 201
     */
    @PostMapping("/add_amenities_single_town")
    public ResponseEntity<Boolean> addNearbyAmenitiesSingleTown (@RequestBody Map<String, String> payload){
        return new ResponseEntity<>(mapsService.addNearbyAmenitiesSingleTown(payload.get("town").strip()), HttpStatus.CREATED);
    }

    /**
     * Add amenities for single listing
     * @param payload JSON with 'address' key
     * @return Nearby amenities of selected address, along with status 201
     */
    @PostMapping("/add_amenities_single_flat")
    public ResponseEntity<NearbyAmenities> addNearbyAmenitiesSingleListing (@RequestBody Map<String, String> payload){
        return new ResponseEntity<>(mapsService.addNearbyAmenitiesSingleListing(payload.get("address").strip()), HttpStatus.CREATED);
    }

    /**
     * Add coordinate data for a single flat
     * @param payload JSON with 'address' key
     * @return Coordinate of flat, along with status 201
     */
    @PostMapping("/add_coord_single")
    public ResponseEntity<LatLng> addLatLngSingleFlat(@RequestBody Map<String, String> payload){
        return new ResponseEntity<>(mapsService.addLatLngSingleFlat(payload.get("address").strip()), HttpStatus.CREATED);
    }

    /**
     * Add coordinate data for all flats in database
     * @return True upon completion, along with status 201
     */
    @PostMapping("/add_coord_all")
    public ResponseEntity<Boolean> addLatLngAllFlat(){
        return new ResponseEntity<>(mapsService.addLatLngAll(), HttpStatus.CREATED);
    }
}
