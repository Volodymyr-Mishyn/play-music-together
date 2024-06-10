import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _apiUrl = 'http://localhost:8080/api/';

  private _currentUserSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this._currentUserSubject.asObservable();
  constructor(private _httpClient: HttpClient) {}

  public login(user: string) {
    return this._httpClient
      .post(`${this._apiUrl}/login`, { user })
      .pipe((response) => {
        this._currentUserSubject.next(user);
        return response;
      });
  }

  public logout() {
    this._currentUserSubject.next(null);
  }
}
