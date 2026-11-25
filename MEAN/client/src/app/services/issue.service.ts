import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../api-base';

export type CampusIssue = {
  id: number;
  title: string;
  category: string;
  location: string;
};

/*
  One service for every HTTP verb.
  Localhost: Angular's proxy (proxy.conf.json) forwards /api to Express on port 3000.
  Module 6: apiUrl() prefixes the Vercel API origin when PRODUCTION_API is set.
*/
@Injectable({ providedIn: 'root' })
export class IssueService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<CampusIssue[]>(apiUrl('/api/issues'));
  }

  create(body: { title: string; category: string; location: string }) {
    return this.http.post<CampusIssue>(apiUrl('/api/issues'), body);
  }

  update(id: number, body: Partial<CampusIssue>) {
    return this.http.put<CampusIssue>(apiUrl(`/api/issues/${id}`), body);
  }

  remove(id: number) {
    return this.http.delete(apiUrl(`/api/issues/${id}`));
  }
}
