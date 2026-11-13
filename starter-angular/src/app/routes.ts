// "/" lists the examples; "/<slug>" opens one (each loaded when it's opened)
import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { exampleRoutes } from "./examples";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "my-page", loadComponent: () => import("./my-page.component").then((m) => m.MyPageComponent) },
  ...exampleRoutes,
  { path: "**", redirectTo: "" },
];
