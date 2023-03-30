package com.goodstart.flatsdata.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BTO {
    @Id
    private ObjectId id;
    private String town;
    private String name;
    private int two_room;
    private int three_room;
    private int four_room;
    private int five_room;
    private int executive;
    private int min_price;
    private int max_price;
}
