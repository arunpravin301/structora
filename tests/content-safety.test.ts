import test from "node:test";
import assert from "node:assert/strict";
import {imageUrl} from "../sanity/lib/image";
import {indexingAllowed} from "../lib/seo";
test("incomplete CMS images are omitted rather than crashing pages",()=>{for(const value of [null,{}, {_type:"image"},{asset:{}},{asset:{_ref:"broken"}}])assert.equal(imageUrl(value),null);});
test("valid Sanity image references produce bounded URLs",()=>{const url=imageUrl({asset:{_ref:"image-abcdef123456-1000x800-jpg"}},1200);assert.ok(url?.includes("w=1200"));assert.ok(url?.startsWith("https://cdn.sanity.io/"));});
test("preview and development deployments cannot enable indexing",()=>{assert.equal(indexingAllowed("true","preview","production"),false);assert.equal(indexingAllowed("true","development","development"),false);assert.equal(indexingAllowed(undefined,"production","production"),false);assert.equal(indexingAllowed("true","production","production"),true);});

