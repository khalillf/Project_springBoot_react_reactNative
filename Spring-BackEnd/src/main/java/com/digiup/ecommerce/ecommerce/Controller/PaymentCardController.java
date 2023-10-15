package com.digiup.ecommerce.ecommerce.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.digiup.ecommerce.ecommerce.Entity.PaymentCard;
import com.digiup.ecommerce.ecommerce.Entity.User;
import com.digiup.ecommerce.ecommerce.Exception.ResourceNotFoundException;
import com.digiup.ecommerce.ecommerce.Repository.PaymentCardRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PaymentCardController {

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @GetMapping("/payment-cards")
    public List<PaymentCard> getAllPaymentCards() {
        return paymentCardRepository.findAll();
    }

    @PostMapping("/payment-cards")
    public PaymentCard createPaymentCard(@RequestBody PaymentCard paymentCard) {
        return paymentCardRepository.save(paymentCard);
    }

    @PutMapping("/payment-cards/{id}")
    public ResponseEntity<PaymentCard> updatePaymentCard(@PathVariable Long id,
            @RequestBody PaymentCard paymentCardDetails) {
        PaymentCard paymentCard = paymentCardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment card not found with id: " + id));

        // Update payment card details here, e.g.,
        // paymentCard.setCardNumber(paymentCardDetails.getCardNumber());

        PaymentCard updatedPaymentCard = paymentCardRepository.save(paymentCard);
        return ResponseEntity.ok(updatedPaymentCard);
    }

    @DeleteMapping("/payment-cards/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePaymentCard(@PathVariable Long id) {
        PaymentCard paymentCard = paymentCardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment card not found with id: " + id));

        paymentCardRepository.delete(paymentCard);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
