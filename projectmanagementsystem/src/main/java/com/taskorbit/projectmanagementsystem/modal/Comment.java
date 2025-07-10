package com.taskorbit.projectmanagementsystem.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String content;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime createdDateTime;


    @ManyToOne
    private User user;

    @ManyToOne
    private Issue issue;
}
