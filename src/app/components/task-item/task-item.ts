import { Component, inject, input, output, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TimerService } from '../../services/timer.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.html',
})
export class TaskItemComponent {
  readonly taskService  = inject(TaskService);
  readonly timerService = inject(TimerService);
  readonly i18n         = inject(I18nService);

  readonly task      = input.required<Task>();
  readonly editClick  = output<Task>();

  readonly confirmingDelete = signal(false);
  readonly selected         = signal(false);

  toggleSelected(): void {
    this.selected.update(v => !v);
  }

  deselect(): void {
    this.selected.set(false);
  }

  onEdit(): void {
    this.editClick.emit(this.task());
  }

  onStartFocus(): void {
    const task = this.task();
    this.taskService.setInProgress(task.id);
    this.taskService.followStatus('in-progress');
    this.timerService.startForTask(task.id, task.title);
    if (window.innerWidth < 640) {
      setTimeout(() => {
        document.querySelector('app-timer')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 80);
    }
  }

  onStop(): void {
    this.taskService.update(this.task().id, { status: 'todo' });
    this.taskService.followStatus('todo');
    if (this.isActiveTask()) this.timerService.reset();
  }

  onMarkDone(): void {
    this.taskService.update(this.task().id, { status: 'done' });
    this.taskService.followStatus('done');
    if (this.isActiveTask()) this.timerService.reset();
  }

  onResetTodo(): void {
    this.taskService.update(this.task().id, { status: 'todo' });
    this.taskService.followStatus('todo');
  }

  readonly isActiveTask = () =>
    this.timerService.activeTaskId() === this.task().id &&
    this.timerService.state() !== 'idle';

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
