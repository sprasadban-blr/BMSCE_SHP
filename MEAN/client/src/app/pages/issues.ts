import { Component, inject, OnInit, signal } from '@angular/core';
import { IssueCard } from '../components/issue-card';
import { CampusIssue, IssueService } from '../services/issue.service';

@Component({
  selector: 'app-issues',
  imports: [IssueCard],
  template: `
    <h2>Open issues</h2>
    <p>GET loads the list. Save location sends PUT. Delete sends DELETE. Then we GET again.</p>
    @if (status()) {
      <p class="status">{{ status() }}</p>
    }
    @if (error()) {
      <p class="errors">{{ error() }}</p>
    }
    @for (issue of issues(); track issue.id) {
      <app-issue-card
        [issue]="issue"
        [locationDraft]="drafts()[issue.id] ?? ''"
        (locationChange)="onDraft(issue.id, $event)"
        (save)="saveLocation(issue.id)"
        (remove)="remove(issue.id)"
      />
    }
  `,
})
export class Issues implements OnInit {
  private api = inject(IssueService);

  issues = signal<CampusIssue[]>([]);
  drafts = signal<Record<number, string>>({});
  status = signal('Loading…');
  error = signal('');

  ngOnInit() {
    this.load();
  }

  load() {
    this.error.set('');
    this.api.list().subscribe({
      next: (rows) => {
        this.issues.set(rows);
        const next: Record<number, string> = {};
        for (const row of rows) next[row.id] = row.location;
        this.drafts.set(next);
        this.status.set(`${rows.length} issue(s) from MongoDB.`);
      },
      error: () => {
        this.status.set('');
        this.error.set('Could not load issues. Is the Express server running on port 3000?');
      },
    });
  }

  onDraft(id: number, value: string) {
    this.drafts.update((prev) => ({ ...prev, [id]: value }));
  }

  saveLocation(id: number) {
    this.error.set('');
    this.api.update(id, { location: this.drafts()[id] }).subscribe({
      next: () => {
        this.load();
        this.status.set(`Updated location for id ${id}.`);
      },
      error: (err) => this.error.set(err.error?.error || err.message),
    });
  }

  remove(id: number) {
    this.error.set('');
    this.api.remove(id).subscribe({
      next: () => {
        this.load();
        this.status.set(`Deleted id ${id}.`);
      },
      error: (err) => this.error.set(err.message),
    });
  }
}
