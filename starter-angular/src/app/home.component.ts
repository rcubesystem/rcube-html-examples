// The home page: a link to every example (src/app/examples.ts)
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { examples, groups } from "./examples";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>rcube-html examples</h1>
    <p>Every example from <a href="https://rcube-html.com/">rcube-html.com</a>, in Angular. Start with
      <a routerLink="/my-page">My page</a>, then change any <code>src/app/examples/&lt;name&gt;.component.ts</code>.</p>
    @for (group of groups; track group) {
      <h2 style="font-size: 1.1rem; margin-top: 1.5rem">{{ group }}</h2>
      <ul>
        @for (example of inGroup(group); track example.slug) {
          <li><a [routerLink]="'/' + example.slug">{{ example.title }}</a> — {{ example.summary }}</li>
        }
      </ul>
    }`,
})
export class HomeComponent {
  groups = groups;
  inGroup = (group: string) => examples.filter((example) => example.group === group);
}
