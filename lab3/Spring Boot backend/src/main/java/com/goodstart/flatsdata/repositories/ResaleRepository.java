package com.goodstart.flatsdata.repositories;

import com.goodstart.flatsdata.entities.Resale;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface ResaleRepository extends MongoRepository<Resale, ObjectId> {
    @Query(value = "{}", fields = "{town:  1, _id:  0}")
    List<Resale> findTowns(Pageable pageable);

    List<Resale> findByTown(String town);

//    List<Resale> findByLease_commence_date();
}
