package com.goodstart.flatsdata.services;

import com.goodstart.flatsdata.entities.SearchParams;
import com.goodstart.flatsdata.repositories.SearchParamsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Search parameter service
 * @author Jovan
 */
@Service
public class SearchParamsService {
    private final SearchParamsRepository repo;
    public SearchParamsService(SearchParamsRepository repo){
        this.repo = repo;
    }
    // public List<String> allTowns(){
    //     SearchParams searchParams = repo.findAll().get(0);
    //     return searchParams.getTowns();
    // }
    
    /**
     * 
     * @return Search parameter values
     */
    public SearchParams allSearchParams(){
        return repo.findAll().get(0);
    }

    /**
     * Used in resale service to get types of flats
     * @return List of flat types
     */
    public List<String> allFlatTypes(){
        SearchParams searchParams = repo.findAll().get(0);
        return searchParams.getFlat_types();
    }

}
