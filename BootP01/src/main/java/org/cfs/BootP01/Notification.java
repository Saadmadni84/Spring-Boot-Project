package org.cfs.BootP01;

import org.cfs.BootP01.MessageService;
import org.springframework.stereotype.Service;

@Service
public class Notification {

    private final MessageService messageService;

    public Notification(MessageService messageService) {
        this.messageService = messageService;
    }

    public void notifyUser() {
        System.out.println(messageService.getMessage());
    }
}
