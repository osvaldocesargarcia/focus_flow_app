import { Component, inject, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';
import { ScrollFloatDirective } from '../../directives/scroll-float.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ScrollFloatDirective],
  templateUrl: './home.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  readonly theme = inject(ThemeService);
  readonly i18n  = inject(I18nService);

  /** Live Pomodoro ring demo — counts down from 25:00 */
  minutes = signal(24);
  seconds = signal(57);
  progress = signal(100);

  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private totalSeconds = 25 * 60;
  private elapsed = 3;

  ngAfterViewInit(): void {
    this.timerInterval = setInterval(() => {
      this.elapsed++;
      if (this.elapsed >= this.totalSeconds) this.elapsed = 0;
      const remaining = this.totalSeconds - this.elapsed;
      this.minutes.set(Math.floor(remaining / 60));
      this.seconds.set(remaining % 60);
      this.progress.set((remaining / this.totalSeconds) * 100);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  get ringOffset(): number {
    const circumference = 2 * Math.PI * 54;
    return circumference * (1 - this.progress() / 100);
  }

  get minutesPadded(): string {
    return String(this.minutes()).padStart(2, '0');
  }

  get secondsPadded(): string {
    return String(this.seconds()).padStart(2, '0');
  }
}
