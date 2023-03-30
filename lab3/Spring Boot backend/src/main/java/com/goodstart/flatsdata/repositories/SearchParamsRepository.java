package com.goodstart.flatsdata.repositories;

import com.goodstart.flatsdata.entities.SearchParams;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchParamsRepository extends MongoRepository<SearchParams, ObjectId> {
}
