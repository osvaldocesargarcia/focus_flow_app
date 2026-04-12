import { Injectable, signal, computed } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

const STORAGE_KEY = 'ff:tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks = signal<Task[]>(this.load());

  /** Active filter */
  readonly filter = signal<TaskStatus | 'all'>('all');

  /** All tasks (unfiltered) */
  readonly tasks = this._tasks.asReadonly();

  /** Counts per status */
  readonly counts = computed(() => {
    const tasks = this._tasks();
    return {
      all:           tasks.length,
      todo:          tasks.filter(t => t.status === 'todo').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      done:          tasks.filter(t => t.status === 'done').length,
    };
  });

  /** Filtered + sorted task list */
  readonly filteredTasks = computed(() => {
    const f     = this.filter();
    const tasks = this._tasks();
    const base  = f === 'all' ? tasks : tasks.filter(t => t.status === f);

    const ORDER: Record<string, number> = { high: 0, medium: 1, low: 2 };
    return [...base].sort((a, b) => ORDER[a.priority] - ORDER[b.priority]);
  });

  add(data: Omit<Task, 'id' | 'createdAt'>): void {
    const task: Task = {
      ...data,
      id:        crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this._tasks.update(ts => [task, ...ts]);
    this.persist();
  }

  update(id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    this._tasks.update(ts =>
      ts.map(t => {
        if (t.id !== id) return t;
        const next = { ...t, ...patch };
        if (patch.status === 'done' && t.status !== 'done') {
          next.completedAt = new Date().toISOString();
        }
        return next;
      })
    );
    this.persist();
  }

  remove(id: string): void {
    this._tasks.update(ts => ts.filter(t => t.id !== id));
    this.persist();
  }

  getById(id: string): Task | undefined {
    return this._tasks().find(t => t.id === id);
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks()));
  }

  private load(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  }
}
