package com.java.hminhhoangdev.repository;

import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
