package com.cfs.bootp02.repo;

import org.springframework.stereotype.Repository;

@Repository
public class StudentRepo {
    public String getStudent(){
        return "hello student";
    }
}
