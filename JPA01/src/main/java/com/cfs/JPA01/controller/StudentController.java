package com.cfs.JPA01.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cfs.JPA01.entity.Student;
import com.cfs.JPA01.repo.StudentRepo;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentRepo studentRepo;
    public StudentController(StudentRepo studentRepo)
    {
        this.studentRepo = studentRepo;
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student)
    {
        return studentRepo.save(student);
    }

    @GetMapping
    public List<Student> getAllStudents()
    {
        return studentRepo.findAll();
    }

    @PutMapping
    public Student updateStudent(@RequestParam Long id, @RequestBody Student student)
    {
        Student s = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));
        s.setName(student.getName());
        s.setEmail(student.getEmail());
        return studentRepo.save(s);
    }

    @PatchMapping
    public Student patchStudent(@RequestParam Long id, @RequestParam String name)
    {
        Student s = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));
        s.setName(name);
        return studentRepo.save(s);
    }
}