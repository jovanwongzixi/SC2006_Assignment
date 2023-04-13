package com.goodstart.flatsdata.entities;

import com.google.maps.model.LatLng;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "amenity-locations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AmenityLocation {
    @Id
    ObjectId id;
    private Map<String, LatLng> info;
    public AmenityLocation(Map<String, LatLng> info){
        this.info = info;
        this.id = new ObjectId();
    }
}
