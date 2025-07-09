package com.taskorbit.projectmanagementsystem.repository;

import com.taskorbit.projectmanagementsystem.modal.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    Subscription findByUserId(Long userId);
}
