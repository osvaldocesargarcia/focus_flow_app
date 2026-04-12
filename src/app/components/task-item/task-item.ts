import { Component, inject, input, output, signal } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.html',
})
export class TaskItemComponent {
  readonly taskService = inject(TaskService);
  readonly i18n        = inject(I18nService);

  readonly task      = input.required<Task>();
  readonly editClick  = output<Task>();

  readonly confirmingDelete = signal(false);

  cycleStatus(): void {
    const cycle: Record<TaskStatus, TaskStatus> = {
      'todo':        'in-progress',
      'in-progress': 'done',
      'done':        'todo',
    };
    this.taskService.update(this.task().id, { status: cycle[this.task().status] });
  }

  onEdit(): void {
    this.editClick.emit(this.task());
  }

  onDeleteRequest(): void {
    this.confirmingDelete.set(true);
  }

  onDeleteConfirm(): void {
    this.taskService.remove(this.task().id);
  }

  onDeleteCancel(): void {
    this.confirmingDelete.set(false);
  }

  readonly priorityMeta = {
    high:   { label: 'high',   dotClass: 'priority-dot-high',   textClass: 'text-rose'    },
    medium: { label: 'medium', dotClass: 'priority-dot-medium', textClass: 'text-amber'   },
    low:    { label: 'low',    dotClass: 'priority-dot-low',    textClass: 'text-emerald' },
  };

  readonly statusMeta = {
    'todo':        { label: 'todo',       bgClass: 'bg-white/8 text-muted',          ring: 'border-white/20' },
    'in-progress': { label: 'inProgress', bgClass: 'bg-amber/15 text-amber',         ring: 'border-amber/30' },
    'done':        { label: 'done',       bgClass: 'bg-emerald/15 text-emerald',      ring: 'border-emerald/30' },
  };
}
