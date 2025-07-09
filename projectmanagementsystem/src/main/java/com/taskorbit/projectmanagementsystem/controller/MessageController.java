package com.taskorbit.projectmanagementsystem.controller;

import com.taskorbit.projectmanagementsystem.modal.Chat;
import com.taskorbit.projectmanagementsystem.modal.Message;
import com.taskorbit.projectmanagementsystem.modal.User;
import com.taskorbit.projectmanagementsystem.request.CreateMessageRequest;
import com.taskorbit.projectmanagementsystem.service.MessageService;
import com.taskorbit.projectmanagementsystem.service.ProjectService;
import com.taskorbit.projectmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessageRequest request) throws Exception {
        User user = userService.findUserById(request.getSenderId());

        Chat chat = projectService.getProjectById(request.getProjectId()).getChat();

        if(chat==null) throw new Exception("Chat not found");

        Message sentMessage = messageService.sendMessage(request.getSenderId(), request.getProjectId(), request.getContent());

        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Long projectId) throws Exception {
        List<Message> messages = messageService.getMessagesByProjectId(projectId);

        return ResponseEntity.ok(messages);
    }
}
