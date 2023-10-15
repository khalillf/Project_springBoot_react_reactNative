package com.digiup.ecommerce.ecommerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digiup.ecommerce.ecommerce.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
