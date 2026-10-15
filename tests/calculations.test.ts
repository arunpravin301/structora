import test from "node:test";
import assert from "node:assert/strict";
import { cost, emi } from "../lib/calculations";
test("cost uses built-up area and rejects invalid values",()=>{assert.equal(cost(1200,2349),2818800);for(const n of [-1,0,NaN,Infinity,100001])assert.equal(cost(n,2349),null);});
test("EMI handles interest and zero interest",()=>{assert.equal(emi(2500000,8.5,15),24618);assert.equal(emi(2500000,0,15),13889);});
test("invalid loans do not show misleading repayments",()=>{assert.equal(emi(-1,8,15),null);assert.equal(emi(2500000,-1,15),null);assert.equal(emi(2500000,8,0),null);assert.equal(emi(2500000,8,1.5),null);});

