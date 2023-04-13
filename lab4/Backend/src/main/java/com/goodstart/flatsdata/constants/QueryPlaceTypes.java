package com.goodstart.flatsdata.constants;

import java.util.HashMap;
import java.util.Map;

import com.google.maps.model.PlaceType;

public class QueryPlaceTypes {
    public static Map<PlaceType, Integer> getQueryTypes(){
//        {PlaceType.TRANSIT_STATION, PlaceType.SCHOOL, PlaceType.SHOPPING_MALL, PlaceType.SUPERMARKET};
// {PlaceType.SUBWAY_STATION, PlaceType}
        Map<PlaceType, Integer> placeTypeDistMap = new HashMap<PlaceType, Integer>();
        placeTypeDistMap.put(PlaceType.PRIMARY_SCHOOL, 2000);
        placeTypeDistMap.put(PlaceType.SUBWAY_STATION, 1200);
        placeTypeDistMap.put(PlaceType.SUPERMARKET, 1000);
        placeTypeDistMap.put(PlaceType.SHOPPING_MALL, 1000);
        return placeTypeDistMap;
    }
}
