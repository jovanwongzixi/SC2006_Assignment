package com.goodstart.flatsdata.services;

import com.goodstart.flatsdata.entities.BTO;
import com.goodstart.flatsdata.repositories.BTORepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BTOService {
    private final BTORepository btoRepository;
    private final MongoTemplate mongoTemplate;
    private final SearchParamsService searchParamsService;
    public BTOService(BTORepository btoRepository, MongoTemplate mongoTemplate, SearchParamsService searchParamsService){
        this.btoRepository = btoRepository;
        this.mongoTemplate = mongoTemplate;
        this.searchParamsService = searchParamsService;
    }

    public List<BTO> findAllBTO(){
        return btoRepository.findAll();
    }

    public List<BTO> multipleQueries(
        String town, Integer min_price, Integer max_price, String flat_types, String amenities, Double application_rate, Integer page, Integer size
    ){
        Query query = this.processQuery(town, min_price, max_price, flat_types, amenities, application_rate);
        Pageable pageable = PageRequest.of(page, size);
        query.with(pageable);

        return mongoTemplate.find(query, BTO.class);
    }

    public Map<String, Long> queryResultSize(String town, Integer min_price, Integer max_price, String flat_types, String amenities, Double application_rate, Long size){
        Query query = this.processQuery(town, min_price, max_price, flat_types, amenities, application_rate);
        Map<String, Long> resultMap = new HashMap<String, Long>();
        resultMap.put("query_size", mongoTemplate.count(query, BTO.class));
        resultMap.put("page_size", size);
        return resultMap;
    }
    
    private Query processQuery(
        String town, Integer min_price, Integer max_price, String flat_types, String amenities, Double application_rate
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
        // only one flat type needs to meet application rate requirement
        if(application_rate != null){
            List<Criteria> applicationRateCriteriaArr = new ArrayList<Criteria>();
            if(flat_types != null){ // if flat type specified, check application rates only for specified flat types
                String[] flatTypesArr = flat_types.split(",");
                for(String flatType: flatTypesArr){
                    applicationRateCriteriaArr.add(Criteria.where("application_rate."+flatType).lte(application_rate));
                }
            }
            else{
                allFlatTypes.forEach((flatType) -> applicationRateCriteriaArr.add(Criteria.where("application_rate."+flatType).lte(application_rate)));
            }
            query.addCriteria(new Criteria().orOperator(applicationRateCriteriaArr));
        }
        // if(amenities != null && !amenities.equals("any")){
        //     String[] amenitiesArr = amenities.split(",");
        //     for(String amenitiesStr: amenitiesArr){
        //         query.addCriteria(Criteria.where("nearby_amenities."+amenitiesStr+".count").gte(1));
        //     }
        // }
        return query;
    }

    private String capitalise(String input){
        return input.substring(0,1).toUpperCase() + input.substring(1);
    }
}
