import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private _socket$!: WebSocketSubject<any>;

  private messagesSubject$ = new Subject<any>();
  public messages$ = this.messagesSubject$.asObservable();

  constructor() {}

  public connect(username: string): void {
    this._socket$ = webSocket(`ws://localhost:8080/ws?user=${username}`);
    // this._socket$ = webSocket(
    //   'wss://2e38-2a01-110f-440e-db00-c98e-d3db-1ab0-14c.ngrok-free.app/ws?user=test'
    // );
    // console.log('Connected to WebSocket', this._socket$);
    console.log('Connected to WebSocket');
    this._socket$.subscribe(
      (message) => this.messagesSubject$.next(message),
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
  }

  sendMessage(type: string, payload: Record<string, unknown>): void {
    this._socket$.next({ type, payload });
  }

  get messages() {
    return this.messagesSubject$.asObservable();
  }

  closeConnection(): void {
    this._socket$.complete();
  }
}
