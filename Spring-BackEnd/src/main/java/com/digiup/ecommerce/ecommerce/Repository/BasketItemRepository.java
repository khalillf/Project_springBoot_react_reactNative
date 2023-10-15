package com.digiup.ecommerce.ecommerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.digiup.ecommerce.ecommerce.Entity.BasketItem;
import com.digiup.ecommerce.ecommerce.Entity.User;

@Repository
public interface BasketItemRepository extends JpaRepository<BasketItem, Long> {
    static List<BasketItem> findByUser(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByUser'");
    }
}