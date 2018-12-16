package com.tmp.api;

import com.tmp.domain.Student;
import com.tmp.domain.StudentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(value = "/api/students")
public class StudentsController {

    @Autowired
    StudentDao studentDao;

    private static final String template = "Hello, %s!";

    @RequestMapping(method = RequestMethod.GET, produces = {"application/json"})
    public List<Student> getAllStudents() {


        //throw new RuntimeException("hibrido");
        Student std = new Student();
        std.setName("pepe goloso");
        std.setPassport_number("43534-3");
        Student a = studentDao.save(std);

        studentDao.getStudentsRaro();

        return (List<Student>) studentDao.findAll();
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET, produces = {"application/json"})
    public Greeting greetName(final @PathVariable String name) {
        return new Greeting(String.format(template, name));
    }

    public class Greeting {
        private final String content;
        private final LocalDateTime time;

        public Greeting(String content) {
            this.content = content;
            this.time = LocalDateTime.now();
        }

        public String getContent() {
            return this.content;
        }

        public String getTime() {
            return this.time.toString();
        }
    }

}
