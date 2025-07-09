package com.taskorbit.projectmanagementsystem.service;

import com.taskorbit.projectmanagementsystem.modal.Message;

import java.util.List;

public interface MessageService {

    Message sendMessage(Long senderId, Long projectId, String content) throws Exception;

    List<Message> getMessagesByProjectId(Long projectId) throws Exception;
}
