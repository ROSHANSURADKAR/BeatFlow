package com.data.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.data.entity.Favorite;
import com.data.repository.FavoriteRepository;

@Service
public class FavoriteService {
    private final FavoriteRepository repo;
    public FavoriteService(FavoriteRepository repo){ this.repo = repo; }

    public Favorite add(Long userId, Long songId){
        if (repo.existsByUserIdAndSongId(userId, songId)) return null;
        Favorite f = new Favorite(); f.setUserId(userId); f.setSongId(songId);
        return repo.save(f);
    }
    public List<Favorite> listUser(Long userId){ return repo.findByUserId(userId); }
}
