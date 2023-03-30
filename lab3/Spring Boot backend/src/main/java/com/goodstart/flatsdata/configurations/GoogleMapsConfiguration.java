package com.goodstart.flatsdata.configurations;

import com.google.maps.GeoApiContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GoogleMapsConfiguration {
    @Value("${env.GOOGLE_MAPS_API_KEY}")
    private String googleMapsAPIKey;

    @Bean
    public GeoApiContext geoApiContext(){
        return new GeoApiContext.Builder().apiKey(googleMapsAPIKey).build();
    }
}
