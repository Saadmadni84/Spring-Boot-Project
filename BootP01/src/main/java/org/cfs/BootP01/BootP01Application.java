package org.cfs.BootP01;

import org.cfs.BootP01.Notification;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BootP01Application {

    @Bean
    CommandLineRunner run(Notification notification) {
        return args -> notification.notifyUser();
    }

    public static void main(String[] args) {
        SpringApplication.run(BootP01Application.class, args);
    }
}
