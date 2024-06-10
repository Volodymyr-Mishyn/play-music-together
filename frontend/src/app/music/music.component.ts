import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./music.component.html`,
  styleUrl: './music.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent {
  public notes: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  constructor(private _webSocketService: WebSocketService) {
    this._webSocketService.connect();
  }

  public play(note: string): void {
    console.log('Playing note', note);
    this._webSocketService.sendMessage('play', { note });
  }
}
