import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { I18nService } from './services/i18n.service';
import { TimerComponent } from './components/timer/timer';
import { TaskListComponent } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerComponent, TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  readonly theme = inject(ThemeService);
  readonly i18n  = inject(I18nService);

  ngOnInit(): void {
    // Services initialize via constructor effects — no extra setup needed
  }
}
