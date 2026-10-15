import {createImageUrlBuilder} from "@sanity/image-url";
import type {Image} from "sanity";
import {dataset,projectId} from "../env";
const imageBuilder=createImageUrlBuilder({projectId,dataset});
export const urlForImage=(source:Image)=>imageBuilder.image(source).auto("format").fit("max");
export function imageUrl(source:unknown,width=1200):string|null {
 if(!source||typeof source!=="object"||!("asset" in source))return null;
 const asset=source.asset;
 if(!asset||typeof asset!=="object"||!("_ref" in asset)||typeof asset._ref!=="string"||!/^image-[a-zA-Z0-9]+-\d+x\d+-[a-zA-Z0-9]+$/.test(asset._ref))return null;
 try{return urlForImage(source as Image).width(width).quality(80).url();}catch{return null;}
}

