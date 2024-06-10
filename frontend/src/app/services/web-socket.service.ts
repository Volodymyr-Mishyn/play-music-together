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

  public connect() {
    this._socket$ = webSocket('ws://localhost:8080/ws?user=username');

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
