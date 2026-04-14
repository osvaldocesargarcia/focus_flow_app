import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { TaskService } from '../../services/task.service';
import { TimerComponent } from '../../components/timer/timer';
import { TaskListComponent } from '../../components/task-list/task-list';
import { TaskFormComponent } from '../../components/task-form/task-form';
import { SpotifyPlayerComponent } from '../../components/spotify-player/spotify-player';

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [RouterLink, TimerComponent, TaskListComponent, TaskFormComponent, SpotifyPlayerComponent],
  templateUrl: './app-page.html',
})
export class AppPageComponent {
  readonly theme       = inject(ThemeService);
  readonly i18n        = inject(I18nService);
  readonly taskService = inject(TaskService);
}
