package com.goodstart.flatsdata.services;

import com.goodstart.flatsdata.entities.Resale;
import com.goodstart.flatsdata.repositories.ResaleRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.Year;

@Service
public class ResaleService {
    private final SearchParamsService searchParamsService;
    private final ResaleRepository resaleRepo;
    private final MongoTemplate mongoTemplate;
    public ResaleService( SearchParamsService searchParamsService, ResaleRepository resaleRepo, MongoTemplate mongoTemplate){
        this.searchParamsService = searchParamsService;
        this.resaleRepo = resaleRepo;
        this.mongoTemplate = mongoTemplate;
    }
    public List<Resale> firstTwentyResale(Integer pageOffset){
        PageRequest pageRequest = PageRequest.of(pageOffset,20);
        return mongoTemplate.find(new Query().with(pageRequest), Resale.class);
    }
    public List<Resale> locationList(){
//        sample nearby search code, location types found in text file. type&keyword may clash
//        GeoApiContext need to intialise once at the start of class only
//        try (GeoApiContext context = new GeoApiContext.Builder().apiKey("").build()) {
//            PlacesApi.nearbySearchQuery(context, new LatLng()).radius(5000).type("supermarket|");
//        } catch(IOException e) {
//            e.printStackTrace();
//        }
        Pageable pageable = PageRequest.of(0,10);
        return resaleRepo.findTowns(pageable);
    }

    public List<Resale> selectedTown(String town){
        return resaleRepo.findByTown(town.toUpperCase());
    }

    public List<Resale> multipleQueries(
            String town, Integer min_price, Integer max_price, String flat_types, String amenities, Integer remaining_lease, Integer page, Integer size
    ){
        Query query = this.processQuery(town, min_price, max_price, flat_types, amenities, remaining_lease);
        Pageable pageable = PageRequest.of(page, size);
        query.with(pageable);

        return mongoTemplate.find(query, Resale.class);
    }

    public Map<String, Long> queryResultSize(String town, Integer min_price, Integer max_price, String flat_types, String amenities, Integer remaining_lease, Long size){
        Query query = this.processQuery(town, min_price, max_price, flat_types, amenities, remaining_lease);
        Map<String, Long> resultMap = new HashMap<String, Long>();
        resultMap.put("query_size", mongoTemplate.count(query, Resale.class));
        resultMap.put("page_size", size);
        return resultMap;
    }

    private Query processQuery(
        String town, Integer min_price, Integer max_price, String flat_types, String amenities, Integer remaining_lease
    ){
        Query query = new Query();
        List<String> allFlatTypes = searchParamsService.allFlatTypes();
        if(town != null){
            query.addCriteria(Criteria.where("town").is(town.toUpperCase()));
        }
        if(min_price != null){
            query.addCriteria(Criteria.where("min_price").gte(min_price));
        }
        if(max_price != null){
            query.addCriteria(Criteria.where("max_price").lte(max_price));
        }
        if(flat_types != null && !flat_types.equals("any")){
            String[] flatTypesArr = flat_types.split(",");
            for(String flatType: flatTypesArr){
                allFlatTypes.remove(capitalise(flatType));
            }
            for(String flatType: allFlatTypes){
                query.addCriteria(Criteria.where(capitalise(flatType)).is(0));
            }
        }
        if(amenities != null && !amenities.equals("any")){
            String[] amenitiesArr = amenities.split(",");
            for(String amenitiesStr: amenitiesArr){
                query.addCriteria(Criteria.where("nearby_amenities."+amenitiesStr+".count").gte(1));
            }
        }
        if(remaining_lease != null){
            query.addCriteria(Criteria.where("lease_commence_date").gte(Year.now().getValue() - (99-remaining_lease)));
        }
        return query;
    }
    private String capitalise(String input){
        return input.substring(0,1).toUpperCase() + input.substring(1);
    }
}
