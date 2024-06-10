import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./music.component.html`,
  styleUrl: './music.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent implements OnInit {
  public user: string | null = null;
  public notes: Array<{ name: string }> = [
    { name: 'C4' },
    { name: 'D4' },
    { name: 'E4' },
    { name: 'F4' },
    { name: 'G4' },
    { name: 'A4' },
    { name: 'B4' },
  ];

  constructor(private _musicService: MusicService) {}

  ngOnInit(): void {
    this._musicService.init().subscribe((connected) => {
      this.user = this._musicService.user;
    });
  }

  public play(note: string): void {
    console.log('Playing note', note);
    this._musicService.play(note);
  }
}
