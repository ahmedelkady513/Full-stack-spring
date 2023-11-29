package com.elkady.ecommerce.config;

import com.elkady.ecommerce.entity.Product;
import com.elkady.ecommerce.entity.ProductCategory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataRestConfig implements RepositoryRestConfigurer  {
    
    private final EntityManager entityManager;



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

        // call an internal helper method
        exposeIds(config);
    }


    private void exposeIds(RepositoryRestConfiguration config) {

        // exoise entity ids

        // get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create an array of the tntiy types
        List<Class<?>> entityClasses = new ArrayList<>();

        // get the entity types for the entities
        for(EntityType<?> temEntityType : entities) {
            entityClasses.add(temEntityType.getJavaType());
        }

        // expose the entity ids for the array if entity/domain types
        Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
