package com.goodstart.flatsdata.services;

import com.goodstart.flatsdata.entities.BTO;
import com.goodstart.flatsdata.repositories.BTORepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BTOService {
    private final BTORepository btoRepository;
    private final MongoTemplate mongoTemplate;
    public BTOService(BTORepository btoRepository, MongoTemplate mongoTemplate){
        this.btoRepository = btoRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<BTO> findAllBTO(){
        return btoRepository.findAll();
    }
    
    public List<BTO> multipleQueries(){
        return new ArrayList<BTO>();
    }
}
