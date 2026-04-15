import { Component, inject, computed, OnDestroy } from '@angular/core';
import { TimerService, TimerMode } from '../../services/timer.service';
import { TaskService } from '../../services/task.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.html',
})
export class TimerComponent implements OnDestroy {
  readonly timer       = inject(TimerService);
  readonly taskService = inject(TaskService);
  readonly i18n        = inject(I18nService);

  /** SVG ring geometry */
  readonly R            = 88;
  readonly CIRCUMFERENCE = 2 * Math.PI * this.R; // ≈ 552.92

  /** Animated dashoffset: 0 = full ring, CIRCUMFERENCE = empty */
  readonly dashOffset = computed(() =>
    this.CIRCUMFERENCE * this.timer.progress()
  );

  /** Gradient/glow class based on mode */
  readonly modeClass = computed(() => {
    switch (this.timer.mode()) {
      case 'focus':       return 'focus';
      case 'short-break': return 'short';
      case 'long-break':  return 'long';
    }
  });

  readonly ringGlowClass = computed(() =>
    this.timer.isRunning()
      ? (this.timer.mode() === 'focus' ? 'ring-glow-focus' : 'ring-glow-break')
      : ''
  );

  readonly modeTabs = computed(() => {
    const t = this.i18n.t();
    return [
      { key: 'focus'       as TimerMode, label: t.focus      },
      { key: 'short-break' as TimerMode, label: t.shortBreak },
      { key: 'long-break'  as TimerMode, label: t.longBreak  },
    ];
  });

  setMode(mode: TimerMode): void {
    this.timer.setMode(mode);
  }

  onStop(): void {
    const id = this.timer.activeTaskId();
    if (id) {
      this.taskService.update(id, { status: 'todo' });
      this.taskService.followStatus('todo');
    }
    this.timer.reset();
  }

  onMarkDone(): void {
    const id = this.timer.activeTaskId();
    if (id) {
      this.taskService.update(id, { status: 'done' });
      this.taskService.followStatus('done');
    }
    this.timer.reset();
  }

  ngOnDestroy(): void {
    this.timer.pause();
  }
}
