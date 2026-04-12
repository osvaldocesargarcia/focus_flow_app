import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { TimerComponent } from '../../components/timer/timer';
import { TaskListComponent } from '../../components/task-list/task-list';

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [RouterLink, TimerComponent, TaskListComponent],
  templateUrl: './app-page.html',
})
export class AppPageComponent implements OnInit {
  readonly theme = inject(ThemeService);
  readonly i18n  = inject(I18nService);

  ngOnInit(): void {}
}
