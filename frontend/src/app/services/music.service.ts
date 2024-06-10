import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import { UserService } from './user.service';
import { WebSocketService } from './web-socket.service';
import { of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private synth: Tone.Synth;
  private _user: string | null = null;

  constructor(
    private _userService: UserService,
    private _webSocketService: WebSocketService
  ) {
    // Initialize the synthesizer
    this.synth = new Tone.Synth().toDestination();
    this._user = null;
  }

  public init(): void {
    this._userService.currentUser$
      .pipe(
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
      )
      .subscribe();
  }

  public play(note: string): void {
    this.synth.triggerAttackRelease(note, '8n');
    this._webSocketService.sendMessage('play', { note, user: this._user });
  }
}
