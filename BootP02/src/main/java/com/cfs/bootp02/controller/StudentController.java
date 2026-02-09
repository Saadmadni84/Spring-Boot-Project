package com.cfs.bootp02.controller;

import com.cfs.bootp02.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class StudentController {

    @PostMapping
    public void test(){
        System.out.println("hello ji");
    }

    @Autowired
    StudentService studentService;
    @GetMapping("/welcome")
    public String dataFetchFrom(){
        return studentService.getStudent();
            }

}
