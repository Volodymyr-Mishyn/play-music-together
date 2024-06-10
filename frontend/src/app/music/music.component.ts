import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./music.component.html`,
  styleUrl: './music.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent {}
