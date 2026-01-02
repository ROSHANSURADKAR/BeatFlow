import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../models/song';
import { Playlist } from '../models/playlist';
import { Favorite } from '../models/favorite';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}


// Optional: For adding new songs
getAllSongs() { return this.http.get<Song[]>(`${this.baseUrl}/songs/all`); }

  // Playlists
  getPlaylists(userId: number) { return this.http.get<Playlist[]>(`${this.baseUrl}/playlists/user/${userId}`); }
  createPlaylist(p: any) { return this.http.post<Playlist>(`${this.baseUrl}/playlists/create`, p); }
  addSongToPlaylist(pId: number, sId: number) { return this.http.post(`${this.baseUrl}/playlists/${pId}/add/${sId}`, {}); }

  // Favorites (Using @RequestParam as per your FavoriteController)
  toggleFavorite(uId: number, sId: number) {
    return this.http.post(`${this.baseUrl}/favorites/add?userId=${uId}&songId=${sId}`, {});
  }
  getFavorites(userId: number) { return this.http.get<Favorite[]>(`${this.baseUrl}/favorites/user/${userId}`); }






updatePlaylist(playlist: Playlist): Observable<Playlist> {

  return this.http.put<Playlist>(`${this.baseUrl}/playlists/${playlist.playid}`, playlist);
}
// Inside ApiService class
login(credentials: any): Observable<User> {

    return this.http.post<User>(`${this.baseUrl}/login`, credentials);
  }
 register(userData: any): Observable<string> {
  return this.http.post(`${this.baseUrl}/register`, userData, { responseType: 'text' });
}


addSong(songData: Song): Observable<Song> {

  return this.http.post<Song>(`${this.baseUrl}/songs/add`, songData);
}

// Add a song to a specific playlist


// Get playlists for a specific user
getPlaylistsByUser(userId: number): Observable<Playlist[]> {
  return this.http.get<Playlist[]>(`${this.baseUrl}/playlists/user/${userId}`);
}
// Send OTP to the provided email
sendOtp(email: string) {
  return this.http.post(`${this.baseUrl}/auth/send-otp`, { email });
}

// Final registration call
verifyAndRegister(user: any, otp: string) {
  return this.http.post(`${this.baseUrl}/auth/register`, { ...user, otp });
}

}
