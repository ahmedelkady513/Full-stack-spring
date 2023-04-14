package com.elkady.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.elkady.ecommerce.entity.Product;
import com.elkady.ecommerce.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer  {
    
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config , CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        //disable http methods for product : put , post and delete

        config.getExposureConfiguration()
        .forDomainType(Product.class)
        .withItemExposure((metadata , httpMehtods) -> httpMehtods.disable(theUnsupportedActions))
        .withCollectionExposure((metadata,httpMehtods) -> httpMehtods.disable(theUnsupportedActions));
        
        //disable http methods for productCategory : put , post and delete

        config.getExposureConfiguration()
        .forDomainType(ProductCategory.class)
        .withItemExposure((metadata , httpMehtods) -> httpMehtods.disable(theUnsupportedActions))
        .withCollectionExposure((metadata,httpMehtods) -> httpMehtods.disable(theUnsupportedActions));
    }
}
