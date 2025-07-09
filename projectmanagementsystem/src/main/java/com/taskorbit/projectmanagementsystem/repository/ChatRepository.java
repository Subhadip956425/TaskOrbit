package com.taskorbit.projectmanagementsystem.repository;

import com.taskorbit.projectmanagementsystem.modal.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
