package com.taskorbit.projectmanagementsystem.repository;

import com.taskorbit.projectmanagementsystem.modal.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByChatIdOrderByCreatedAtAsc(Long chatId);
}
