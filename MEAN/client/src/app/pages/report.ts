import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../services/issue.service';

@Component({
  selector: 'app-report',
  template: `
    <h2>Report an issue</h2>
    <p>POST /api/issues. A refresh on Issues should still show the new card.</p>
    <form (submit)="onSubmit($event)">
      <label for="title">Title</label>
      <input id="title" [value]="title()" (input)="title.set($any($event.target).value)" />

      <label for="category">Category</label>
      <select id="category" [value]="category()" (change)="category.set($any($event.target).value)">
        <option value="">Choose…</option>
        <option value="waste">waste</option>
        <option value="water">water</option>
        <option value="energy">energy</option>
        <option value="safety">safety</option>
      </select>

      <label for="location">Location</label>
      <input id="location" [value]="location()" (input)="location.set($any($event.target).value)" />

      <p>
        <button type="submit" [disabled]="busy()">{{ busy() ? 'Sending…' : 'Submit to API' }}</button>
      </p>
    </form>
    @if (errors().length) {
      <ul class="errors">
        @for (item of errors(); track item) {
          <li>{{ item }}</li>
        }
      </ul>
    }
  `,
})
export class Report {
  private api = inject(IssueService);
  private router = inject(Router);

  title = signal('');
  category = signal('');
  location = signal('');
  errors = signal<string[]>([]);
  busy = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    const next: string[] = [];
    if (this.title().trim().length < 5) next.push('title must be at least 5 characters');
    if (!['waste', 'water', 'energy', 'safety'].includes(this.category())) {
      next.push('category must be waste, water, energy, or safety');
    }
    if (this.location().trim().length < 2) next.push('location is required');
    if (next.length) {
      this.errors.set(next);
      return;
    }

    this.busy.set(true);
    this.errors.set([]);
    this.api
      .create({
        title: this.title().trim(),
        category: this.category(),
        location: this.location().trim(),
      })
      .subscribe({
        next: () => this.router.navigateByUrl('/issues'),
        error: (err) => {
          const body = err.error;
          this.errors.set(body?.errors || [body?.error || err.message]);
          this.busy.set(false);
        },
        complete: () => this.busy.set(false),
      });
  }
}
