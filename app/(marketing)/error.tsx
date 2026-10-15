"use client";
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="pt-36 pb-24 px-6 max-w-3xl mx-auto"><h1 className="text-3xl mb-6">This page is temporarily unavailable.</h1><p>Please try again. You can also call <a className="underline" href="tel:+918248362020">82483 62020</a>.</p><button className="btn btn-cta mt-8" onClick={reset}>Try again</button></section>;}

