import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h2>End to end</h2>
    <p>
      This Angular page does not hold the campus list. Express on port 3000 reads and writes
      MongoDB. Refresh after you report an issue — the card should still be there.
    </p>
    <ol class="steps">
      <li>Home — this screen (no database call yet).</li>
      <li>Issues — GET the list, PUT a location, DELETE a card.</li>
      <li>Report — POST a new issue, then open Issues.</li>
    </ol>
  `,
})
export class Home {}
