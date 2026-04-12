import { Component, inject, signal } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { I18nService, Translations } from '../../services/i18n.service';
import { TaskItemComponent } from '../task-item/task-item';
import { TaskFormComponent } from '../task-form/task-form';

type FilterKey = TaskStatus | 'all';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, TaskFormComponent],
  templateUrl: './task-list.html',
})
export class TaskListComponent {
  readonly taskService = inject(TaskService);
  readonly i18n        = inject(I18nService);

  readonly showForm   = signal(false);
  readonly editTarget = signal<Task | null>(null);

  openAdd(): void {
    this.editTarget.set(null);
    this.showForm.set(true);
  }

  openEdit(task: Task): void {
    this.editTarget.set(task);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editTarget.set(null);
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
