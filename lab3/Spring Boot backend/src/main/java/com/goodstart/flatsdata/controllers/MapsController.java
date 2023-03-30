package com.goodstart.flatsdata.controllers;

import com.goodstart.flatsdata.entities.NearbyAmenities;
import com.goodstart.flatsdata.services.MapsService;
import com.google.maps.model.LatLng;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/maps")
public class MapsController {
    private final MapsService mapsService;
    public MapsController(MapsService mapsService){
        this.mapsService = mapsService;
    }

    @PostMapping("/add_amenities_single_town")
    public ResponseEntity<Boolean> addNearbyAmenitiesSingleTown (@RequestBody Map<String, String> payload){
        return new ResponseEntity<>(mapsService.addNearbyAmenitiesSingleTown(payload.get("town").strip()), HttpStatus.CREATED);
    }

    @PostMapping("/add_amenities_single_flat")
    public ResponseEntity<NearbyAmenities> addNearbyAmenitiesSingleListing (@RequestBody Map<String, String> payload){
        return new ResponseEntity<>(mapsService.addNearbyAmenitiesSingleListing(payload.get("address").strip()), HttpStatus.CREATED);
    }

    @PostMapping("/add_coord_single")
    public ResponseEntity<LatLng> addLatLngSingleFlat(@RequestBody Map<String, String> payload){
        return new ResponseEntity<>(mapsService.addLatLngSingleFlat(payload.get("address").strip()), HttpStatus.CREATED);
    }

    @PostMapping("/add_coord_all")
    public ResponseEntity<Boolean> addLatLngAllFlat(){
        return new ResponseEntity<>(mapsService.addLatLngAll(), HttpStatus.CREATED);
    }
}
