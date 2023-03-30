package com.goodstart.flatsdata.entities;

import com.google.maps.model.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NearbyAmenities {
//    @Id
//    private ObjectId id;
//    private Map<String, Amenity> amenities; Considering changing to Map instead of individual fields, so changes to type of amenity can be just made in queryPlaceTypes
    private Amenity school;
    private Amenity shopping_mall;
    private Amenity supermarket;
    private Amenity transit;
    
    public void setAmenity(PlaceType placeType, Amenity amenity){
        switch (placeType) {
            case PRIMARY_SCHOOL -> this.setSchool(amenity);
            case SUBWAY_STATION -> this.setTransit(amenity);
            case SHOPPING_MALL -> this.setShopping_mall(amenity);
            case SUPERMARKET -> this.setSupermarket(amenity);
            default -> throw new RuntimeException("Invalid type!");
        }
    }
}
