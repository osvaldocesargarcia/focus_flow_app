import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(this.loadPreference());

  constructor() {
    // Apply class immediately to avoid FOUC
    this.applyTheme(this.isDark());

    effect(() => {
      const dark = this.isDark();
      this.applyTheme(dark);
      localStorage.setItem('ff:dark', JSON.stringify(dark));
    });
  }

  toggle(): void {
    this.isDark.update(v => !v);
  }

  private applyTheme(dark: boolean): void {
    const html = document.documentElement;
    const body = document.body;
    if (dark) {
      html.classList.add('dark');
      body.classList.remove('light-mode');
    } else {
      html.classList.remove('dark');
      body.classList.add('light-mode');
    }
  }

  private loadPreference(): boolean {
    const saved = localStorage.getItem('ff:dark');
    if (saved !== null) return JSON.parse(saved) as boolean;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
