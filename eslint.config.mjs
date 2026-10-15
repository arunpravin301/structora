import {defineConfig,globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
// App Router root layout owns these shared fonts, unlike the Pages Router rule.
export default defineConfig([...nextVitals,...nextTs,globalIgnores([".next/**","next-env.d.ts"]),{files:["app/layout.tsx"],rules:{"@next/next/no-page-custom-font":"off"}}]);

