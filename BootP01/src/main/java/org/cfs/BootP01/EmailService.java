package org.cfs.BootP01;

import org.cfs.BootP01.MessageService;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements MessageService {

    @Override
    public String getMessage() {
        return "You have got new message";
    }
}
