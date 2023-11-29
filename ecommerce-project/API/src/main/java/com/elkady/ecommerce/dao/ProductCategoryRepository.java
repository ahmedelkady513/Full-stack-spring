package com.elkady.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.elkady.ecommerce.entity.ProductCategory;

@RepositoryRestResource(collectionResourceRel = "productCategory" , path = "productCategories")
@CrossOrigin
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long>{
    
}
