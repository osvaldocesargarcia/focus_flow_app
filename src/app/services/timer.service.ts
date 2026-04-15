import { Injectable, signal, computed } from '@angular/core';

export type TimerMode  = 'focus' | 'short-break' | 'long-break';
export type TimerState = 'idle'  | 'running'     | 'paused';

export const DURATIONS: Record<TimerMode, number> = {
  'focus':       25 * 60,
  'short-break':  5 * 60,
  'long-break':  15 * 60,
};

@Injectable({ providedIn: 'root' })
export class TimerService {
  readonly mode           = signal<TimerMode>('focus');
  readonly state          = signal<TimerState>('idle');
  readonly timeLeft       = signal<number>(DURATIONS['focus']);
  readonly sessions       = signal<number>(0);
  readonly activeTaskName = signal<string | null>(null);
  readonly activeTaskId   = signal<string | null>(null);

  /** 0 → 1 as timer counts down (0 = full ring, 1 = empty ring) */
  readonly progress = computed(() => {
    const total = DURATIONS[this.mode()];
    return (total - this.timeLeft()) / total;
  });

  readonly displayTime = computed(() => {
    const t = this.timeLeft();
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  });

  readonly isRunning  = computed(() => this.state() === 'running');
  readonly isPaused   = computed(() => this.state() === 'paused');

  /** Dots for session counter (4 per cycle) */
  readonly sessionDots = computed(() => {
    const n = this.sessions() % 4;
    return Array.from({ length: 4 }, (_, i) => i < n);
  });

  private intervalId: ReturnType<typeof setInterval> | null = null;

  /** Sets the active task, switches to focus mode, and starts the timer immediately. */
  startForTask(taskId: string, taskName: string): void {
    this.activeTaskId.set(taskId);
    this.activeTaskName.set(taskName);
    this.setMode('focus');
    this.start();
  }

  /** Switches the timer to the given mode, resets the countdown, and stops any active interval. */
  setMode(mode: TimerMode): void {
    this.clearTimer();
    this.mode.set(mode);
    this.timeLeft.set(DURATIONS[mode]);
    this.state.set('idle');
  }

  /** Starts the timer if it is idle or paused; pauses it if it is currently running. */
  toggle(): void {
    this.state() === 'running' ? this.pause() : this.start();
  }

  /** Begins the countdown interval, decrementing `timeLeft` every second until it reaches zero. */
  start(): void {
    if (this.state() === 'running') return;
    this.state.set('running');
    this.intervalId = setInterval(() => {
      const t = this.timeLeft();
      if (t <= 0) {
        this.complete();
        return;
      }
      this.timeLeft.update(v => v - 1);
    }, 1000);
  }

  /** Pauses the running timer, preserving the remaining time. */
  pause(): void {
    if (this.state() !== 'running') return;
    this.state.set('paused');
    this.clearTimer();
  }

  /** Stops the timer and restores `timeLeft` to the full duration of the current mode. */
  reset(): void {
    this.clearTimer();
    this.timeLeft.set(DURATIONS[this.mode()]);
    this.state.set('idle');
    this.activeTaskName.set(null);
    this.activeTaskId.set(null);
  }

  /** Handles session completion: increments the session counter (focus only), resets state, and triggers a notification. */
  private complete(): void {
    this.clearTimer();
    if (this.mode() === 'focus') {
      this.sessions.update(s => s + 1);
    }
    this.timeLeft.set(0);
    this.state.set('idle');
    this.notify();
  }

  /** Sends a browser notification when a session ends, requesting permission first if not yet granted. */
  private notify(): void {
    if (!('Notification' in window)) return;
    const body = this.mode() === 'focus'
      ? 'Focus session complete! Time to rest.'
      : 'Break over! Back to work.';

    if (Notification.permission === 'granted') {
      new Notification('FocusFlow', { body, icon: '/favicon.ico' });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(p => {
        if (p === 'granted') new Notification('FocusFlow', { body, icon: '/favicon.ico' });
      });
    }
  }

  /** Clears the active `setInterval` and nullifies the reference to prevent memory leaks. */
  private clearTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
