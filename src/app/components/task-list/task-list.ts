import { Component, computed, inject, signal } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { I18nService, Translations } from '../../services/i18n.service';
import { TaskItemComponent } from '../task-item/task-item';

type FilterKey = TaskStatus | 'all';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './task-list.html',
  host: { class: 'h-full flex flex-col' },
})
export class TaskListComponent {
  readonly taskService = inject(TaskService);
  readonly i18n        = inject(I18nService);

  readonly search = signal('');

  readonly displayedTasks = computed(() => {
    const q = this.search().toLowerCase().trim();
    const tasks = this.taskService.filteredTasks();
    if (!q) return tasks;
    return tasks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description?.toLowerCase().includes(q) ?? false)
    );
  });

  clearSearch(): void {
    this.search.set('');
  }

  setFilter(f: FilterKey): void {
    this.taskService.filter.set(f);
  }

  readonly filterTabs: { key: FilterKey; labelKey: keyof Translations }[] = [
    { key: 'all',         labelKey: 'all' },
    { key: 'todo',        labelKey: 'todo' },
    { key: 'in-progress', labelKey: 'inProgress' },
    { key: 'done',        labelKey: 'done' },
  ];

  getLabel(key: keyof Translations): string {
    return this.i18n.t()[key] as string;
  }

  trackByTask(_: number, t: Task): string {
    return t.id;
  }
}
