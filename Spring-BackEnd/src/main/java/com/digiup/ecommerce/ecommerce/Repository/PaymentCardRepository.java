package com.digiup.ecommerce.ecommerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.digiup.ecommerce.ecommerce.Entity.PaymentCard;
import com.digiup.ecommerce.ecommerce.Entity.User;

@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, Long> {

}
