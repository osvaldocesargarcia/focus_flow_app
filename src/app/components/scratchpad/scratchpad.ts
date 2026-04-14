import { Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../services/i18n.service';

const STORAGE_KEY = 'ff:scratchpad';

@Component({
  selector: 'app-scratchpad',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './scratchpad.html',
})
export class ScratchpadComponent {
  readonly i18n   = inject(I18nService);
  readonly isOpen = signal(false);
  readonly notes  = signal<string>(localStorage.getItem(STORAGE_KEY) ?? '');

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, this.notes());
    });
  }

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  clear(): void {
    this.notes.set('');
  }
}
