import test from "node:test";
import assert from "node:assert/strict";
import { submitEnquiry, WEB3FORMS_ENDPOINT } from "../lib/enquiry";

const valid = {
  name: " QA Example ",
  phone: "2025550123",
  email: "",
  type: "Residential",
  message: "Test",
  consent: "on",
  botcheck: ""
};

test("invalid enquiries do not reach the provider", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({ success: true });
  });
  for (const data of [
    { ...valid, name: " " },
    { ...valid, consent: "" },
    { ...valid, phone: "x" },
    { ...valid, email: "bad" },
    { ...valid, botcheck: "spam" },
    { ...valid, _gotcha: "spam" }
  ]) {
    await assert.rejects(() => submitEnquiry(data, "contact"));
  }
  assert.equal(calls, 0);
});

test("valid enquiries use approved destination and normalized details", async (t) => {
  let endpoint = "", payload: Record<string, unknown> = {};
  t.mock.method(globalThis, "fetch", async (url, init) => {
    endpoint = String(url);
    payload = JSON.parse(String(init?.body));
    return Response.json({ success: true });
  });
  await submitEnquiry(valid, "contact");
  assert.equal(endpoint, WEB3FORMS_ENDPOINT);
  assert.equal(payload.name, "QA Example");
  assert.equal(payload.source, "contact");
  assert.equal(payload.botcheck, "");
});

for (const [name, response] of [
  ["negative receipt", () => Response.json({ success: false })],
  ["missing receipt", () => Response.json({})],
  ["malformed receipt", () => new Response("{", { status: 200 })],
  ["provider error", () => Response.json({ success: true }, { status: 500 })],
  ["rate limit", () => Response.json({}, { status: 429 })],
  ["network error", () => { throw new TypeError("network"); }],
  ["timeout", () => { throw new DOMException("timeout", "TimeoutError"); }]
] as const) test(name + " never reports success", async (t) => {
  t.mock.method(globalThis, "fetch", async () => response());
  await assert.rejects(() => submitEnquiry(valid, "contact"));
});
