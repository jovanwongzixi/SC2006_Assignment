package com.goodstart.flatsdata.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "search-params")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchParams {
    @Id
    private ObjectId id;
    private List<String> towns;
    private List<String> amenities;
    private List<Integer> price_range;
    private List<String> flat_types;
}
