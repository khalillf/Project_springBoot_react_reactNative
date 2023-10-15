package com.digiup.ecommerce.ecommerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digiup.ecommerce.ecommerce.Entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

}
