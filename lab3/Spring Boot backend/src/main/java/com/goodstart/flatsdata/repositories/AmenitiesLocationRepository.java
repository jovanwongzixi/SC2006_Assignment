package com.goodstart.flatsdata.repositories;

import com.goodstart.flatsdata.entities.AmenityLocation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmenitiesLocationRepository extends MongoRepository<AmenityLocation, ObjectId> {
}
