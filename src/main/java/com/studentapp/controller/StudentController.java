package com.studentapp.controller;

import com.studentapp.model.Student;
import com.studentapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("students", studentService.getAllStudents());
        return "index";
    }

    @PostMapping("/addStudent")
    public String addStudent(@RequestParam String name) {
        studentService.addStudent(name);
        return "redirect:/";
    }

    @PutMapping("/updateAttendance/{id}")
    @ResponseBody
    public Student updateAttendance(@PathVariable Long id) {
        return studentService.toggleAttendance(id);
    }
}
