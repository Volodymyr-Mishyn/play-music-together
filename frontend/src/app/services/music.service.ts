import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import { UserService } from './user.service';
import { WebSocketService } from './web-socket.service';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private synth: Tone.Synth;
  private _user: string | null = null;

  get user(): string | null {
    return this._user;
  }

  constructor(
    private _userService: UserService,
    private _webSocketService: WebSocketService
  ) {
    // Initialize the synthesizer
    this.synth = new Tone.Synth().toDestination();

    // Subscribe to WebSocket messages
    this._webSocketService.messages$.subscribe((message) => {
      if (message.type === 'note') {
        this.playNoteFromMessage(message.payload.note as string);
      }
    });
    this._user = null;
  }

  public init(): Observable<boolean> {
    return this._userService.currentUser$.pipe(
      tap((user) => console.log('User:', user)),
      switchMap((user) => {
        if (user) {
          this._webSocketService.connect(user);
          this._user = user;
          return of(true);
        } else {
          this._webSocketService.closeConnection();
          return of(false);
        }
      })
    );
  }

  play(note: string): void {
    // Play the note locally
    this.playNoteFromMessage(note);

    // Send the note over WebSocket
    this._webSocketService.sendMessage('note', { note });
  }

  private playNoteFromMessage(note: string): void {
    console.log('Playing note', note);
    // Play the given note
    this.synth.triggerAttackRelease(note, '8n');
  }
}
