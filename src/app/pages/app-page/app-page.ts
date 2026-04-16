import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { TaskService } from '../../services/task.service';
import { TimerComponent } from '../../components/timer/timer';
import { TaskListComponent } from '../../components/task-list/task-list';
import { TaskFormComponent } from '../../components/task-form/task-form';
import { SpotifyPlayerComponent } from '../../components/spotify-player/spotify-player';
import { ScratchpadComponent } from '../../components/scratchpad/scratchpad';

type MobilePanel = 'tasks' | 'music' | 'notes';

@Component({
  selector: 'app-app-page',
  standalone: true,
  imports: [RouterLink, TimerComponent, TaskListComponent, TaskFormComponent, SpotifyPlayerComponent, ScratchpadComponent],
  templateUrl: './app-page.html',
})
export class AppPageComponent {
  readonly theme       = inject(ThemeService);
  readonly i18n        = inject(I18nService);
  readonly taskService = inject(TaskService);

  readonly mobilePanel = signal<MobilePanel | null>(null);

  readonly panelTitle = computed(() => {
    const en = this.i18n.lang() === 'en';
    switch (this.mobilePanel()) {
      case 'tasks': return en ? 'Tasks'  : 'Tarefas';
      case 'music': return en ? 'Music'  : 'Música';
      case 'notes': return en ? 'Notes'  : 'Notas';
      default:      return '';
    }
  });

  togglePanel(panel: MobilePanel): void {
    this.mobilePanel.update(cur => cur === panel ? null : panel);
  }

  closePanel(): void {
    this.mobilePanel.set(null);
  }
}
