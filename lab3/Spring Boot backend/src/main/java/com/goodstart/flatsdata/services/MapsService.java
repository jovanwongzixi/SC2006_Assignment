package com.goodstart.flatsdata.services;

/*
 * Amenities to search
 * hawker centres
 * carpark (all hdb estates should have carpark?)
 * school
 * fitness
 * shopping (shopping_mall)
 * supermarket
 * public transport (train/transit/subway_station, bus_station)
 *
 * requires geocoding api to get lat lng before calling nearby search
 */

import com.goodstart.flatsdata.entities.Amenity;
import com.goodstart.flatsdata.entities.AmenityLocation;
import com.goodstart.flatsdata.entities.NearbyAmenities;
import com.goodstart.flatsdata.repositories.AmenitiesLocationRepository;
import com.goodstart.flatsdata.entities.Resale;
import com.goodstart.flatsdata.constants.QueryPlaceTypes;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import jakarta.annotation.PreDestroy;
import lombok.SneakyThrows;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class MapsService {
    private final AmenitiesLocationRepository amenitiesLocationRepository;
    private final MongoTemplate template;
    private final GeoApiContext geoApiContext;
    public MapsService( AmenitiesLocationRepository amenitiesLocationRepository, MongoTemplate mongoTemplate, GeoApiContext geoApiContext){
        this.amenitiesLocationRepository = amenitiesLocationRepository;
        this.template = mongoTemplate;
        this.geoApiContext = geoApiContext;
    }

    @SneakyThrows
    public Boolean addNearbyAmenitiesSingleTown(String town){
        List<Resale> resalesFromTown = template.find(new Query(Criteria.where("town").is(town.toUpperCase())), Resale.class);
        for(Resale resale : resalesFromTown){
            String address = resale.getBlock() + " " + resale.getStreet_name() + "," + resale.getTown();
            GeocodingResult[] geocodingResults = GeocodingApi.geocode(geoApiContext, address).await();
            LatLng latLng = new LatLng(geocodingResults[0].geometry.location.lat, geocodingResults[0].geometry.location.lng);

            Map<PlaceType, Integer> placeTypesMap = QueryPlaceTypes.getQueryTypes();
            NearbyAmenities nearbyAmenities = new NearbyAmenities();
            
            placeTypesMap.forEach((placeType, distance) ->{
                PlacesSearchResponse nearbySearchResponse = null;
                try {
                    nearbySearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                            .type(placeType)
                            .radius(distance)
                            .await();
                } catch (ApiException | InterruptedException | IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }

                PlacesSearchResult[] nearbySearchResults = nearbySearchResponse.results;
                Map<String, LatLng> amenityLocationsInfo = new HashMap<>();

                for(PlacesSearchResult result: nearbySearchResults){
                    amenityLocationsInfo.put(result.name, new LatLng(result.geometry.location.lat, result.geometry.location.lng));
                }

                AmenityLocation amenityLocation = new AmenityLocation(amenityLocationsInfo);
                Amenity amenity = new Amenity(amenityLocationsInfo.size(), amenityLocation);
                amenitiesLocationRepository.insert(amenityLocation);
                nearbyAmenities.setAmenity(placeType,amenity);
                // String [] addressSplitArray = address.toUpperCase().split(" ", 2);
                
            });
                template.update(Resale.class)
                    .matching(Criteria.where("_id").is(resale.getId()))
                    .apply(new Update().set("nearby_amenities",nearbyAmenities))
                    .first();

        }
        
        return true;
    }

    @SneakyThrows
    public NearbyAmenities addNearbyAmenitiesSingleListing(String address){
        GeocodingResult[] geocodingResults = GeocodingApi.geocode(geoApiContext, address).await();
        LatLng latLng = new LatLng(geocodingResults[0].geometry.location.lat, geocodingResults[0].geometry.location.lng);

//        Gson gson = new GsonBuilder().setPrettyPrinting().create();
//        System.out.println(gson.toJson(results[0].geometry.location));
//        context.shutdown();
        Map<PlaceType, Integer> placeTypesMap = QueryPlaceTypes.getQueryTypes();
        NearbyAmenities nearbyAmenities = new NearbyAmenities();
        placeTypesMap.forEach((placeType, distance) ->{
            PlacesSearchResponse nearbySearchResponse = null;
            try {
                nearbySearchResponse = PlacesApi.nearbySearchQuery(geoApiContext, latLng)
                        .type(placeType)
                        .radius(800)
                        .await();
            } catch (ApiException | InterruptedException | IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            PlacesSearchResult[] nearbySearchResults = nearbySearchResponse.results;

            Map<String, LatLng> amenityLocationsInfo = new HashMap<>();
            for(PlacesSearchResult result: nearbySearchResults){
                amenityLocationsInfo.put(result.name, new LatLng(result.geometry.location.lat, result.geometry.location.lng));
            }
            AmenityLocation amenityLocation = new AmenityLocation(amenityLocationsInfo);
            Amenity amenity = new Amenity(amenityLocationsInfo.size(), amenityLocation);
            amenitiesLocationRepository.insert(amenityLocation);
            nearbyAmenities.setAmenity(placeType,amenity);
        });

        String [] addressSplitArray = address.toUpperCase().split(" ", 2);
        template.update(Resale.class)
                .matching(Criteria.where("block").is(addressSplitArray[0]).and("street_name").is(addressSplitArray[1]))
                .apply(new Update().set("nearby_amenities",nearbyAmenities))
                .first();
//        Findplacefromtext can only return one data
//        FindPlaceFromText findPlaceFromText = PlacesApi.findPlaceFromText(geoApiContext,"transit_station", InputType.TEXT_QUERY)
//                .locationBias(new LocationBiasCircular(latLng,1500))
//                .fields(FieldMask.GEOMETRY, FieldMask.NAME, FieldMask.TYPES)
//                .await();
        return nearbyAmenities;
    }
    @SneakyThrows
    public LatLng addLatLngSingleFlat(String address){
        GeocodingResult[] geocodingResults = GeocodingApi.geocode(geoApiContext, address).await();
        LatLng latLng = new LatLng(geocodingResults[0].geometry.location.lat, geocodingResults[0].geometry.location.lng);
        String [] addressSplitArray = address.toUpperCase().split(" ", 2);
        template.update(Resale.class)
                .matching(Criteria.where("block").is(addressSplitArray[0]).and("street_name").is(addressSplitArray[1]))
                .apply(new Update().set("coordinates", latLng))
                .first();
        return latLng;
    }

    @SneakyThrows
    public Boolean addLatLngAll(){
        // if resale flats with no coordinates information
        List<Resale> allResale = template.find(new Query().addCriteria(Criteria.where("coordinates").exists(false)), Resale.class);
        for(Resale resale : allResale){
            String address = resale.getBlock() + " " + resale.getStreet_name() + "," + resale.getTown();
            GeocodingResult[] geocodingResults = GeocodingApi.geocode(geoApiContext, address).await();
            if(geocodingResults.length == 0){
                continue; // move to next address
            }
            LatLng latLng = new LatLng(geocodingResults[0].geometry.location.lat, geocodingResults[0].geometry.location.lng);
            template.update(Resale.class)
                .matching(Criteria.where("_id").is(resale.getId()))
                .apply(new Update().set("coordinates", latLng))
                .first();
        }
        return true;
    }
    // shutdown the geoApiContext when application is shutdown
    @PreDestroy
    public void preDestroy(){
        geoApiContext.shutdown();
    }
}
