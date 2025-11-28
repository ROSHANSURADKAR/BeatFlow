package com.data.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.data.entity.Favorite;
import com.data.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin("*")
public class FavoriteController {
    private final FavoriteService service;
    public FavoriteController(FavoriteService service){ this.service = service; }

    @PostMapping("/add")
    public Favorite add(@RequestParam Long userId, @RequestParam Long songId){ return service.add(userId, songId); }

    @GetMapping("/user/{userId}")
    public List<Favorite> list(@PathVariable Long userId){ return service.listUser(userId); }
}
