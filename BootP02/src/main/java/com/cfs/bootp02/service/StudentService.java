package com.cfs.bootp02.service;

import com.cfs.bootp02.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;
    public String getStudent(){
        return studentRepo.getStudent();
    }
}
