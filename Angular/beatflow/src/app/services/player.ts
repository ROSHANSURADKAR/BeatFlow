import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../models/song';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private audio = new Audio(); // The actual browser audio object

  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSubject.asObservable();

  playSong(song: Song) {
    if (!song.fileUrl) {
      console.error("This song has no audio URL!");
      return;
    }

    // Stop current song if one is playing
    this.audio.pause();

    // Set the new source
    this.audio.src = song.fileUrl;
    this.audio.load(); // Load the file

    this.audio.play()
      .then(() => {
        this.currentSongSubject.next(song);
        this.isPlayingSubject.next(true);
      })
      .catch(err => console.error("Playback failed:", err));
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.isPlayingSubject.next(true);
    } else {
      this.audio.pause();
      this.isPlayingSubject.next(false);
    }
  }
}
