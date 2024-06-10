import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private _username: string = '';

  public error: string | null = null;

  constructor(private _router: Router, private _userService: UserService) {}

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public join(): void {
    console.log('Joining as', this.username);

    this._userService.login(this.username).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this._router.navigate(['/music']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.message;
      },
    });
  }
}
