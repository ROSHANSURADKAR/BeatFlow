import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { PlayerService } from '../../services/player';
import { Song } from '../../models/song';
import { Playlist } from '../../models/playlist';
import { Playlists } from '../playlists/playlists';
import { SongList } from '../song-list/song-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SongList],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  songs: Song[] = [];
  playlists: Playlist[] = [];
  currentUserId: number = 0;
  userName: string = 'User';
  activeView: string = 'home';

  showAddSongForm: boolean = false;
  newSong: any = {
    title: '', artist: '', album: '', genre: '', fileUrl: '', coverUrl: ''
  };

  constructor(
    private api: ApiService,
    public player: PlayerService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Extracts ID and Name from your Java User Entity
      this.currentUserId = user.userid || user.id;
      this.userName = user.username || user.name || 'User';

      if (this.currentUserId) {
        this.loadAllData();
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadAllData() {
    this.loadSongs();
    this.loadPlaylists();
  }

  // Add this new variable at the top of your class
filteredSongs: Song[] = [];
searchTerm: string = '';

// Update your loadSongs method to initialize both lists
loadSongs() {
  this.api.getAllSongs().subscribe({
    next: (data: Song[]) => {
      this.songs = data;
      this.filteredSongs = data; // Initially, filtered list is the full list
    },
    error: (err) => console.error("Error fetching songs:", err)
  });
}

// Add this function to handle the search logic
onSearch() {
  const term = this.searchTerm.toLowerCase().trim();
  if (!term) {
    this.filteredSongs = this.songs;
    return;
  }

  this.filteredSongs = this.songs.filter(song =>
    song.title.toLowerCase().includes(term) ||
    song.artist.toLowerCase().includes(term) ||
    song.genre.toLowerCase().includes(term)
  );
}

  loadPlaylists() {
    this.api.getPlaylistsByUser(this.currentUserId).subscribe({
      next: (data: Playlist[]) => this.playlists = data,
      error: (err) => console.error("Error fetching playlists:", err)
    });
  }

  play(song: Song) {
    this.player.playSong(song);
  }

  toggleLike(songId: number) {
    this.api.toggleFavorite(this.currentUserId, songId).subscribe({
      next: () => alert("Added to Favorites!"),
      error: (err) => console.error("Error liking song:", err)
    });
  }

  addToPlaylist(songId: number) {
    if (this.playlists.length > 0) {
      this.api.addSongToPlaylist(this.playlists[0].playid, songId).subscribe({
        next: () => alert("Added to Playlist!"),
        error: (err) => alert("Error adding to playlist")
      });
    } else {
      alert("Create a playlist first!");
    }
  }

  onAddSong() {
    this.api.addSong(this.newSong).subscribe({
      next: (savedSong) => {
        this.songs.push(savedSong);
        this.newSong = { title: '', artist: '', album: '', genre: '', fileUrl: '', coverUrl: '' };
        this.showAddSongForm = false;
        alert("Song added successfully!");
      },
      error: (err) => console.error("Error adding song:", err)
    });
  }

  toggleSongForm() {
    this.showAddSongForm = !this.showAddSongForm;
  }

  goHome() {
    this.showAddSongForm = false;
    this.loadAllData();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  setView(view: string) {
    this.activeView = view;
    this.showAddSongForm = false;
  }
}
