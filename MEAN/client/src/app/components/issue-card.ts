import { Component, input, output } from '@angular/core';
import { CampusIssue } from '../services/issue.service';

@Component({
  selector: 'app-issue-card',
  template: `
    <article class="card">
      <p class="badge">{{ issue().category }}</p>
      <h2>{{ issue().title }}</h2>
      <p>id {{ issue().id }}</p>
      <label [attr.for]="'loc-' + issue().id">Location</label>
      <input
        [id]="'loc-' + issue().id"
        [value]="locationDraft()"
        (input)="locationChange.emit($any($event.target).value)"
      />
      <div class="card-actions">
        <button type="button" class="secondary" (click)="save.emit()">Save location</button>
        <button type="button" class="danger" (click)="remove.emit()">Delete</button>
      </div>
    </article>
  `,
})
export class IssueCard {
  issue = input.required<CampusIssue>();
  locationDraft = input.required<string>();
  locationChange = output<string>();
  save = output<void>();
  remove = output<void>();
}
