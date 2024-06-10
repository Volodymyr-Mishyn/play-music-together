import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private _router: Router) {}

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public join(): void {
    console.log('Joining as', this.username);
    // this._router.navigate(['music']);
  }
}
