import { Injectable, signal, computed, effect } from '@angular/core';

export type Lang = 'en' | 'pt';

export interface HomeTranslations {
  // Nav
  getStarted:            string;
  // Hero
  heroBadge:             string;
  heroHeadline:          string;
  heroHeadlineGradient:  string;
  heroSubline:           string;
  heroSublineStrong:     string;
  heroGetStarted:        string;
  heroHowItWorks:        string;
  heroStatFocusLabel:    string;
  heroStatProductiveLabel: string;
  heroStatFreeLabel:     string;
  heroLive:              string;
  heroTaskChip:          string;
  // Pomodoro section
  pomoBadge:             string;
  pomoHeadline:          string;
  pomoHeadlineGradient:  string;
  pomoDesc:              string;
  step1Title:            string;
  step1Desc:             string;
  step2Title:            string;
  step2Desc:             string;
  step3Title:            string;
  step3Desc:             string;
  step4Title:            string;
  step4Desc:             string;
  cycleTask:             string;
  cycleWork:             string;
  cycleRest:             string;
  cycleLong:             string;
  // Benefits section
  benefitsBadge:         string;
  benefitsHeadline:      string;
  benefitsHeadlineGradient: string;
  benefitsDesc:          string;
  stat1Sub:              string;
  stat2Sub:              string;
  stat3Sub:              string;
  stat4Sub:              string;
  b1Title:               string;
  b1Desc:                string;
  b2Title:               string;
  b2Desc:                string;
  b3Title:               string;
  b3Desc:                string;
  b4Title:               string;
  b4Desc:                string;
  b5Title:               string;
  b5Desc:                string;
  b6Title:               string;
  b6Desc:                string;
  // Features section
  featuresBadge:         string;
  featuresHeadline:      string;
  featuresHeadlineGradient: string;
  featuresDesc:          string;
  f1Title:               string;
  f1Sub:                 string;
  f1Desc:                string;
  f1Tag1:                string;
  f1Tag2:                string;
  f1Tag3:                string;
  f2Title:               string;
  f2Sub:                 string;
  f2Desc:                string;
  f2Tag1:                string;
  f2Tag2:                string;
  f2Tag3:                string;
  f3Title:               string;
  f3Sub:                 string;
  f3Desc:                string;
  f4Title:               string;
  f4Sub:                 string;
  f4Desc:                string;
  // CTA section
  ctaHeadline:           string;
  ctaHeadlineGradient:   string;
  ctaDesc:               string;
  ctaBtn:                string;
  ctaFootnote:           string;
  // Footer
  footerTagline:         string;
  footerCredit:          string;
}

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
  // Home page
  home: HomeTranslations;
}

const HOME_EN: HomeTranslations = {
  // Nav
  getStarted:            'Get Started!',
  // Hero
  heroBadge:             'Science-backed technique',
  heroHeadline:          'Master your focus.',
  heroHeadlineGradient:  'Conquer your goals.',
  heroSubline:           'FocusFlow combines smart task management with the powerful Pomodoro technique so you work with',
  heroSublineStrong:     'maximum focus',
  heroGetStarted:        'Get started now!',
  heroHowItWorks:        'How it works',
  heroStatFocusLabel:    'of deep focus',
  heroStatProductiveLabel: 'more productive',
  heroStatFreeLabel:     'free',
  heroLive:              'Live',
  heroTaskChip:          'Design Hero component…',
  // Pomodoro section
  pomoBadge:             'The Pomodoro Technique',
  pomoHeadline:          'Simple. Powerful.',
  pomoHeadlineGradient:  'Proven.',
  pomoDesc:              'Developed by Francesco Cirillo in the 1980s, this technique divides work into short blocks that maximize concentration and eliminate mental fatigue.',
  step1Title:            'Choose your task',
  step1Desc:             'Select a specific task from your list. Clarity of purpose is the key to maximum focus.',
  step2Title:            'Work for 25 minutes',
  step2Desc:             'Start the timer and work without interruptions. No social media, no distractions. Just you and your task.',
  step3Title:            'Rest for 5 minutes',
  step3Desc:             'Take a real break. Your brain needs to recover to maintain performance in the next block.',
  step4Title:            'Repeat the cycle',
  step4Desc:             'After every 4 pomodoros, take a long break of 15–30 min. This rhythm sustains productivity throughout the day.',
  cycleTask:             'Task',
  cycleWork:             '25 min focus',
  cycleRest:             '5 min rest',
  cycleLong:             'Every 4 → long break',
  // Benefits section
  benefitsBadge:         'Proven advantages',
  benefitsHeadline:      'Why does Pomodoro',
  benefitsHeadlineGradient: 'work?',
  benefitsDesc:          'Behavioral science backs what millions already know: working in short blocks activates cognitive flow and reduces fatigue.',
  stat1Sub:              'productivity boost reported',
  stat2Sub:              'people use this technique',
  stat3Sub:              'less stress and burnout',
  stat4Sub:              'better information retention',
  b1Title:               'Eliminates procrastination',
  b1Desc:                'Starting for just 25 minutes is easy. The small commitment overcomes the mental resistance to begin.',
  b2Title:               'Uninterrupted focus',
  b2Desc:                'The active timer creates a contract with yourself. Distractions become easy to ignore.',
  b3Title:               'Prevents burnout',
  b3Desc:                'Regular breaks restore cognitive energy and prevent the exhaustion that destroys productivity.',
  b4Title:               'Track your progress',
  b4Desc:                'Count your completed pomodoros and watch how your ability to focus grows each day.',
  b5Title:               'Mental clarity',
  b5Desc:                'Knowing you have limited time, your mind prioritizes better and makes faster decisions.',
  b6Title:               'Sustainable habit',
  b6Desc:                'Unlike work marathons, Pomodoro creates a rhythm you can maintain indefinitely.',
  // Features section
  featuresBadge:         'All in one place',
  featuresHeadline:      'FocusFlow has',
  featuresHeadlineGradient: 'everything covered',
  featuresDesc:          'One tool that brings together what you need: organize your tasks and execute with the Pomodoro timer, without switching apps.',
  f1Title:               'Pomodoro Timer',
  f1Sub:                 'Focus · Short break · Long break',
  f1Desc:                'Animated progress ring, session-complete alerts and a pomodoro counter so you never lose your rhythm.',
  f1Tag1:                '25 min focus',
  f1Tag2:                '5 min break',
  f1Tag3:                '15 min long break',
  f2Title:               'Task Management',
  f2Sub:                 'Full CRUD with priorities',
  f2Desc:                'Create, edit, filter and complete tasks with High, Medium or Low priority. Link each task to your Pomodoro session for a perfect workflow.',
  f2Tag1:                'High',
  f2Tag2:                'Medium',
  f2Tag3:                'Low',
  f3Title:               'Dark / Light Mode',
  f3Sub:                 'Adapt the UI to your environment',
  f3Desc:                'Switch between dark and light mode with a single click. The theme persists between sessions so you always have your preferred environment.',
  f4Title:               'Bilingual EN / PT',
  f4Sub:                 'English and Portuguese',
  f4Desc:                'Fully translated interface in English and Portuguese. Switch languages instantly without reloading. Preference is saved automatically.',
  // CTA section
  ctaHeadline:           'Ready to transform',
  ctaHeadlineGradient:   'your productivity?',
  ctaDesc:               'Join those who already work with more focus, less stress and real results. Your first Pomodoro starts now.',
  ctaBtn:                "Get started now, it's free!",
  ctaFootnote:           'No signup · No install · 100% free',
  // Footer
  footerTagline:         'Deep work, done right.',
  footerCredit:          'Based on the Pomodoro Technique® by Francesco Cirillo',
};

const HOME_PT: HomeTranslations = {
  // Nav
  getStarted:            'Começar!',
  // Hero
  heroBadge:             'Técnica respaldada pela ciência',
  heroHeadline:          'Domine seu foco.',
  heroHeadlineGradient:  'Conquiste suas metas.',
  heroSubline:           'O FocusFlow combina gestão inteligente de tarefas com a poderosa técnica Pomodoro para que você trabalhe com',
  heroSublineStrong:     'foco máximo',
  heroGetStarted:        'Começar agora!',
  heroHowItWorks:        'Como funciona',
  heroStatFocusLabel:    'de foco profundo',
  heroStatProductiveLabel: 'mais produtivo',
  heroStatFreeLabel:     'gratuito',
  heroLive:              'Ao vivo',
  heroTaskChip:          'Projetar componente Hero…',
  // Pomodoro section
  pomoBadge:             'A Técnica Pomodoro',
  pomoHeadline:          'Simples. Poderoso.',
  pomoHeadlineGradient:  'Comprovado.',
  pomoDesc:              'Desenvolvida por Francesco Cirillo nos anos 80, esta técnica divide o trabalho em blocos curtos que maximizam a concentração e eliminam o cansaço mental.',
  step1Title:            'Escolha sua tarefa',
  step1Desc:             'Selecione uma tarefa específica da sua lista. A clareza do objetivo é fundamental para o foco máximo.',
  step2Title:            'Trabalhe por 25 minutos',
  step2Desc:             'Ative o temporizador e trabalhe sem interrupções. Sem redes sociais, sem distrações. Só você e sua tarefa.',
  step3Title:            'Descanse por 5 minutos',
  step3Desc:             'Faça uma pausa real. Seu cérebro precisa se recuperar para manter o desempenho no próximo bloco.',
  step4Title:            'Repita o ciclo',
  step4Desc:             'A cada 4 pomodoros, faça uma pausa longa de 15–30 min. Esse ritmo sustenta a produtividade durante todo o dia.',
  cycleTask:             'Tarefa',
  cycleWork:             '25 min foco',
  cycleRest:             '5 min descanso',
  cycleLong:             'A cada 4 → pausa longa',
  // Benefits section
  benefitsBadge:         'Vantagens comprovadas',
  benefitsHeadline:      'Por que o Pomodoro',
  benefitsHeadlineGradient: 'funciona?',
  benefitsDesc:          'A ciência comportamental confirma o que milhões já sabem: trabalhar em blocos curtos ativa o fluxo cognitivo e reduz o cansaço.',
  stat1Sub:              'aumento de produtividade relatado',
  stat2Sub:              'pessoas usam esta técnica',
  stat3Sub:              'menos estresse e esgotamento',
  stat4Sub:              'melhor retenção de informação',
  b1Title:               'Elimina a procrastinação',
  b1Desc:                'Começar por apenas 25 minutos é fácil. O pequeno compromisso vence a resistência mental de iniciar.',
  b2Title:               'Foco sem interrupções',
  b2Desc:                'O temporizador ativo cria um contrato com você mesmo. As distrações se tornam fáceis de ignorar.',
  b3Title:               'Previne o esgotamento',
  b3Desc:                'As pausas regulares recuperam a energia cognitiva e evitam o esgotamento que destrói a produtividade.',
  b4Title:               'Acompanhe seu progresso',
  b4Desc:                'Conte seus pomodoros concluídos e veja como sua capacidade de foco cresce a cada dia.',
  b5Title:               'Clareza mental',
  b5Desc:                'Sabendo que você tem tempo limitado, sua mente prioriza melhor e toma decisões mais rápidas.',
  b6Title:               'Hábito sustentável',
  b6Desc:                'Ao contrário das maratonas de trabalho, o Pomodoro cria um ritmo que você pode manter indefinidamente.',
  // Features section
  featuresBadge:         'Tudo em um lugar',
  featuresHeadline:      'O FocusFlow tem',
  featuresHeadlineGradient: 'tudo coberto',
  featuresDesc:          'Uma ferramenta que une o que você precisa: organize suas tarefas e execute com o temporizador Pomodoro, sem trocar de app.',
  f1Title:               'Temporizador Pomodoro',
  f1Sub:                 'Foco · Pausa curta · Pausa longa',
  f1Desc:                'Anel de progresso animado, alertas de sessão concluída e contador de pomodoros para nunca perder o ritmo.',
  f1Tag1:                '25 min foco',
  f1Tag2:                '5 min pausa',
  f1Tag3:                '15 min pausa longa',
  f2Title:               'Gestão de Tarefas',
  f2Sub:                 'CRUD completo com prioridades',
  f2Desc:                'Crie, edite, filtre e conclua tarefas com prioridade Alta, Média ou Baixa. Vincule cada tarefa à sua sessão Pomodoro para um fluxo perfeito.',
  f2Tag1:                'Alta',
  f2Tag2:                'Média',
  f2Tag3:                'Baixa',
  f3Title:               'Modo Escuro / Claro',
  f3Sub:                 'Adapte a UI ao seu ambiente',
  f3Desc:                'Alterne entre o modo escuro e claro com um único clique. O tema persiste entre sessões para que você sempre tenha o ambiente preferido.',
  f4Title:               'Bilíngue EN / PT',
  f4Sub:                 'Inglês e Português',
  f4Desc:                'Interface completamente traduzida em inglês e português. Mude o idioma instantaneamente sem recarregar a página. A preferência é salva automaticamente.',
  // CTA section
  ctaHeadline:           'Pronto para transformar',
  ctaHeadlineGradient:   'sua produtividade?',
  ctaDesc:               'Junte-se a quem já trabalha com mais foco, menos estresse e resultados reais. Seu primeiro Pomodoro começa agora.',
  ctaBtn:                'Começar agora, é grátis!',
  ctaFootnote:           'Sem cadastro · Sem instalação · 100% gratuito',
  // Footer
  footerTagline:         'Foco profundo, feito direito.',
  footerCredit:          'Baseado na Técnica Pomodoro® de Francesco Cirillo',
};

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
  home: HOME_EN,
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
  home: HOME_PT,
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
