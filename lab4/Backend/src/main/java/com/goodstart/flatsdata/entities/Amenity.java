package com.goodstart.flatsdata.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Amenity {
    private int count;
    @DocumentReference
    private AmenityLocation locations;
}
