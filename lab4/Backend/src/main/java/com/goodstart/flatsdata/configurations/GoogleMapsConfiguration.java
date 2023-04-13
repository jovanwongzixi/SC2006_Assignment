package com.goodstart.flatsdata.configurations;

import com.google.maps.GeoApiContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * This class configures a Singleton GeoApiContext on startup of application
 * 
 * @author Jovan
 */
@Configuration
public class GoogleMapsConfiguration {
    /**
     * Getting Google Maps API Key from env file
     */
    @Value("${env.GOOGLE_MAPS_API_KEY}")
    private String googleMapsAPIKey;

    /**
     * @return Singleton GeoApiContext
     */
    @Bean
    public GeoApiContext geoApiContext(){
        return new GeoApiContext.Builder().apiKey(googleMapsAPIKey).build();
    }
}
