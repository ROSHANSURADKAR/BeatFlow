package com.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "favorites")
public class Favorite {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long favid;
     Long userId;
    Long songId;

    public Favorite(){}

    public Favorite(Long id, Long userId, Long songId){
        this.favid = id; this.userId = userId; this.songId = songId;
    }
    // getters/setters...
    public Long getId(){return favid;}
    public void setId(Long id){this.favid = id;}
    public Long getUserId(){return userId;}
    public void setUserId(Long userId){this.userId = userId;}
    public Long getSongId(){return songId;}
    public void setSongId(Long songId){this.songId = songId;}
}
