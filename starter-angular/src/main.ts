import { provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, withHashLocation } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/routes";

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection(), provideRouter(routes, withHashLocation())],
}).catch((error) => console.error(error));
