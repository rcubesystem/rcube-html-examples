// The frame of every page: a link home and the page itself
import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <main style="max-width: 1100px; margin: 0 auto; padding: 1.5rem 1rem 4rem">
      <p><a routerLink="/">rcube-html starter (Angular)</a></p>
      <router-outlet />
    </main>`,
})
export class AppComponent {}
