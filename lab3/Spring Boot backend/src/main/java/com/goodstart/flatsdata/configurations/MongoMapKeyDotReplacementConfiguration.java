package com.goodstart.flatsdata.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;

/**
 * This class configures '.' values in MongoDB Objects to be replaced with '#' to prevent file traversal problems
 * @author Jovan
 */
@Configuration
public class MongoMapKeyDotReplacementConfiguration {
    @Autowired
    public void setMapKeyDotReplacement(MappingMongoConverter mongoConverter) {
        mongoConverter.setMapKeyDotReplacement("#");
    }
}
