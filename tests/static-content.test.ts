import test from "node:test";
import assert from "node:assert/strict";
import { headingId, projectDetailPath } from "../lib/static-content";

test("repeated and non-Latin headings have distinct stable anchors", () => {
 assert.notEqual(headingId("Costs", "a"), headingId("Costs", "b"));
 assert.notEqual(headingId("கட்டுமானம்", "a"), "");
 assert.equal(headingId("Costs", "a"), headingId("Costs", "a"));
});
test("live projects link only to a slug included in the export", () => {
 const built = [{slug:{current:"built-home"}}];
 assert.equal(projectDetailPath("built-home",built),"/projects/built-home/");
 assert.equal(projectDetailPath("new-home",built),null);
 assert.equal(projectDetailPath(undefined,built),null);
});
