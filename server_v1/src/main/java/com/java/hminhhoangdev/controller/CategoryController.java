package com.java.hminhhoangdev.controller;

import com.java.hminhhoangdev.dto.response.ResponseData;
import com.java.hminhhoangdev.dto.response.ResponseError;
import com.java.hminhhoangdev.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseData<String> listCategory() {
        try {
            return new ResponseData(HttpStatus.OK.value(), "data", categoryService.getListCategory());
        } catch (Exception e) {
            return new ResponseError(HttpStatus.OK.value(), e.getMessage());
        }
    }
}
