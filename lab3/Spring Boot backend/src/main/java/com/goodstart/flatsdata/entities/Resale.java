package com.goodstart.flatsdata.entities;

import com.google.maps.model.LatLng;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "resale-hdb")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Resale {
    @Id
    private ObjectId id;
    private String block;
    private String town;
    private String street_name;
    private int lease_commence_date;
    private int two_room;
    private int three_room;
    private int four_room;
    private int five_room;
    private int executive;
    private int min_price;
    private int max_price;
    private LatLng coordinates;
    private NearbyAmenities nearby_amenities;
}
