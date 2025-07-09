package com.taskorbit.projectmanagementsystem.service;

import com.taskorbit.projectmanagementsystem.modal.PlanType;
import com.taskorbit.projectmanagementsystem.modal.Subscription;
import com.taskorbit.projectmanagementsystem.modal.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUserSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType) throws Exception;

    boolean isValid(Subscription subscription);
}
