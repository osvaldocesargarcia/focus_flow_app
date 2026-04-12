import { Component, inject, input, output, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html',
})
export class TaskFormComponent implements OnInit {
  readonly taskService = inject(TaskService);
  readonly i18n        = inject(I18nService);

  /** Pass an existing task to enter edit mode */
  readonly task = input<Task | null>(null);

  /** Emits when the modal should close */
  readonly closed = output<void>();

  // Form state
  title       = signal('');
  description = signal('');
  status      = signal<TaskStatus>('todo');
  priority    = signal<TaskPriority>('medium');

  readonly isEditing = signal(false);

  ngOnInit(): void {
    const t = this.task();
    if (t) {
      this.isEditing.set(true);
      this.title.set(t.title);
      this.description.set(t.description);
      this.status.set(t.status);
      this.priority.set(t.priority);
    }
  }

  submit(): void {
    const title = this.title().trim();
    if (!title) return;

    const data = {
      title,
      description: this.description().trim(),
      status:   this.status(),
      priority: this.priority(),
    };

    if (this.isEditing()) {
      this.taskService.update(this.task()!.id, data);
    } else {
      this.taskService.add(data);
    }

    this.closed.emit();
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).dataset['backdrop'] === 'true') {
      this.close();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.close();
  }
}
