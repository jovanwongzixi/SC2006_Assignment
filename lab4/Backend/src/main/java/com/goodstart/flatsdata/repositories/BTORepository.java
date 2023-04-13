package com.goodstart.flatsdata.repositories;

import com.goodstart.flatsdata.entities.BTO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BTORepository extends MongoRepository<BTO, ObjectId> {
}
