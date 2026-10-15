export function cost(area:number,rate:number):number|null {
 return Number.isFinite(area)&&area>=300&&area<=100000&&Number.isFinite(rate)&&rate>0?Math.round(area*rate):null;
}
export function emi(principal:number,rate:number,years:number):number|null {
 if(![principal,rate,years].every(Number.isFinite)||principal<10000||principal>100000000||rate<0||rate>30||!Number.isInteger(years)||years<1||years>50)return null;
 const months=years*12,r=rate/1200;
 return Math.round(r===0?principal/months:principal*r/(1-Math.pow(1+r,-months)));
}

