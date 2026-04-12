import { Injectable, signal, computed, effect } from '@angular/core';

export type Lang = 'en' | 'pt';

export interface Translations {
  appName:      string;
  appTagline:   string;
  // Timer
  focus:        string;
  shortBreak:   string;
  longBreak:    string;
  session:      string;
  sessions:     string;
  start:        string;
  pause:        string;
  reset:        string;
  focusDone:    string;
  breakDone:    string;
  // Tasks
  tasks:        string;
  addTask:      string;
  editTask:     string;
  deleteTask:   string;
  titleLabel:   string;
  descLabel:    string;
  priorityLabel: string;
  statusLabel:  string;
  save:         string;
  cancel:       string;
  confirmDelete: string;
  // Status
  all:          string;
  todo:         string;
  inProgress:   string;
  done:         string;
  // Priority
  low:          string;
  medium:       string;
  high:         string;
  // Empty state
  noTasks:      string;
  noTasksHint:  string;
  // Nav
  darkMode:     string;
  lightMode:    string;
  // Placeholder
  titlePlaceholder: string;
  descPlaceholder:  string;
}

const EN: Translations = {
  appName:      'FocusFlow',
  appTagline:   'Deep work, done right.',
  focus:        'Focus',
  shortBreak:   'Short Break',
  longBreak:    'Long Break',
  session:      'Session',
  sessions:     'Sessions',
  start:        'Start',
  pause:        'Pause',
  reset:        'Reset',
  focusDone:    'Focus session complete! Time to rest.',
  breakDone:    'Break over! Back to work.',
  tasks:        'Tasks',
  addTask:      'Add Task',
  editTask:     'Edit Task',
  deleteTask:   'Delete',
  titleLabel:   'Title',
  descLabel:    'Description',
  priorityLabel:'Priority',
  statusLabel:  'Status',
  save:         'Save',
  cancel:       'Cancel',
  confirmDelete:'Delete this task?',
  all:          'All',
  todo:         'To Do',
  inProgress:   'In Progress',
  done:         'Done',
  low:          'Low',
  medium:       'Medium',
  high:         'High',
  noTasks:      'No tasks yet',
  noTasksHint:  'Add a task and pair it with your focus session.',
  darkMode:     'Dark mode',
  lightMode:    'Light mode',
  titlePlaceholder: 'What needs to be done?',
  descPlaceholder:  'Optional details…',
};

const PT: Translations = {
  appName:      'FocusFlow',
  appTagline:   'Foco profundo, feito direito.',
  focus:        'Foco',
  shortBreak:   'Pausa Curta',
  longBreak:    'Pausa Longa',
  session:      'Sessão',
  sessions:     'Sessões',
  start:        'Iniciar',
  pause:        'Pausar',
  reset:        'Reiniciar',
  focusDone:    'Sessão de foco concluída! Hora de descansar.',
  breakDone:    'Pausa terminada! Voltemos ao trabalho.',
  tasks:        'Tarefas',
  addTask:      'Nova Tarefa',
  editTask:     'Editar Tarefa',
  deleteTask:   'Eliminar',
  titleLabel:   'Título',
  descLabel:    'Descrição',
  priorityLabel:'Prioridade',
  statusLabel:  'Estado',
  save:         'Guardar',
  cancel:       'Cancelar',
  confirmDelete:'Eliminar esta tarefa?',
  all:          'Todas',
  todo:         'A Fazer',
  inProgress:   'Em Progresso',
  done:         'Concluída',
  low:          'Baixa',
  medium:       'Média',
  high:         'Alta',
  noTasks:      'Sem tarefas',
  noTasksHint:  'Adicione uma tarefa e combine com a sua sessão de foco.',
  darkMode:     'Modo escuro',
  lightMode:    'Modo claro',
  titlePlaceholder: 'O que precisa de ser feito?',
  descPlaceholder:  'Detalhes opcionais…',
};

const DICT: Record<Lang, Translations> = { en: EN, pt: PT };

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.loadLang());

  /** Reactive translations object — use as t().key in templates */
  readonly t = computed<Translations>(() => DICT[this.lang()]);

  constructor() {
    effect(() => {
      document.documentElement.lang = this.lang();
      localStorage.setItem('ff:lang', this.lang());
    });
  }

  /** Switches the active language between English and Portuguese. */
  toggle(): void {
    this.lang.update(l => (l === 'en' ? 'pt' : 'en'));
  }

  /** Resolves the initial language from localStorage, falling back to the browser locale or English. */
  private loadLang(): Lang {
    const saved = localStorage.getItem('ff:lang') as Lang | null;
    if (saved && (saved === 'en' || saved === 'pt')) return saved;
    const browser = navigator.language.toLowerCase();
    return browser.startsWith('pt') ? 'pt' : 'en';
  }
}
