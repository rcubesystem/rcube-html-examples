// Lets Node load the tutorials the way the bundler does (scripts/build-starter.mjs): "./start" -> "./start.js", and the
// site's .js files under src/ as ES modules, their JSX compiled by Next's own SWC (the site's package.json has no
// "type": "module", and a few examples define a custom component with JSX).
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const SRC = `${fileURLToPath(new URL("../src/", import.meta.url)).replace(/\\/g, "/")}`;
const inSrc = (url) => url.startsWith("file:") && fileURLToPath(url).replace(/\\/g, "/").startsWith(SRC);
const require = createRequire(import.meta.url);
let swc = null;
const compile = async (code, filename) => {
  swc ??= await require("next/dist/build/swc").loadBindings();
  const out = await swc.transform(code, {
    filename, sourceMaps: false,
    jsc: { target: "es2022", parser: { syntax: "ecmascript", jsx: true }, transform: { react: { runtime: "automatic" } } },
    module: { type: "es6" },
  });
  return out.code;
};

export async function resolve(specifier, context, next) {
  if (/^\.\.?\//.test(specifier) && !/\.[cm]?js$/.test(specifier) && context.parentURL && inSrc(context.parentURL)) {
    const candidate = new URL(`${specifier}.js`, context.parentURL);
    if (existsSync(fileURLToPath(candidate))) return next(candidate.href, context);
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (!inSrc(url) || !url.endsWith(".js")) return next(url, context);
  const { source } = await next(url, { ...context, format: "module" });
  return { format: "module", source: await compile(String(source), fileURLToPath(url)), shortCircuit: true };
}
