package com.unihelp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "help_requests")
@Data
public class HelpRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  

    @Column(nullable = false)
    private String subject;      

    @Column(nullable = false)
    private String topic;        

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status = "OPEN";  

    private LocalDateTime createdAt = LocalDateTime.now();
}