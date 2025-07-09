package com.taskorbit.projectmanagementsystem.controller;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.taskorbit.projectmanagementsystem.modal.PlanType;
import com.taskorbit.projectmanagementsystem.modal.User;
import com.taskorbit.projectmanagementsystem.response.PaymentLinkResponse;
import com.taskorbit.projectmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Value("${razorpay.api.key}")
    private String apiKey;
    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Autowired
    private UserService userService;

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable PlanType planType, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);

        int amount = 799; // base monthly plan in ₹

        if (planType.equals(PlanType.ANNUALLY)) {
            amount = amount * 12; // ₹799 * 12 = ₹9588
            amount = (int) (amount * 0.7); // 30% discount → ₹6711
        }

        int amountInPaise = amount * 100;



        RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amountInPaise);
            paymentLinkRequest.put("currency", "INR");

            JSONObject customer =  new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify =  new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", "http://localhost:5173/upgrade_plan/success?planType="+planType);

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PaymentLinkResponse res = new PaymentLinkResponse();
            res.setPayment_link_url(paymentLinkUrl);
            res.setPayment_link_id(paymentLinkId);

            return new ResponseEntity<>(res, HttpStatus.CREATED);

    }
}
