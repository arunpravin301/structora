# AI writing, detection and the Structora articles

Research date: 16 October 2026. These notes are for the website owner, separate from the public articles.

## What Google actually says

Google does not describe AI involvement alone as grounds for a penalty. Its guidance focuses on original, useful, trustworthy content and the purpose of producing it. Automation used primarily to manipulate search rankings breaches its policies. [Google’s guidance on AI-generated content](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content).

Its more recent guidance specifically warns about generating many pages without adding value. Having a person rewrite those pages does not by itself address that problem. [Google’s generative AI guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

A commercial detector score is not a Google ranking report. Google has not published a universal “AI percentage” threshold for a blog to pass. No detector result can establish that these articles will rank or avoid every possible search issue.

## How text is identified as AI-written

There are several approaches, rather than one reliable test:

- Statistical methods assess how predictable the wording is under a language model. Terms such as perplexity describe predictability; “burstiness” is often used loosely for variation. Neither is an authorship certificate.
- Trained classifiers learn patterns from labelled human and generated examples. Their judgments depend on the models, genres, languages and writing styles represented in their training and evaluation.
- Human readers notice recurring sentence structures, generic claims, repetitive summaries, shallow examples and confident inaccuracies. Those can be editorial weaknesses without proving who wrote the text.
- Provenance and watermark approaches look for specific evidence from a creation system. They are different from guessing from writing style, and are not a universal feature of all generated text.

Research gives reasons to be cautious about detector claims. A COLING 2025 study found substantial sensitivity to style and text complexity, with some evaluated conditions reducing classification to chance performance. That is a result for the systems and conditions studied, not proof that every detector always fails. [Doughman et al., 2025](https://aclanthology.org/2025.coling-main.288/).

Research on non-native English writing also found false positives and bias in the tested detectors. Polished or straightforward English can therefore be flagged despite human authorship. [Liang et al., 2023](https://arxiv.org/abs/2304.02819).

## How to make the writing natural and useful

The editorial approach used for these three articles is:

1. Give each article a distinct job: estimate a budget, prepare a build, or compare quotations.
2. Open with the reader’s actual decision and answer it directly.
3. Use concrete objects and decisions: a sump, a tile allowance, an area statement, a drawing revision.
4. Vary paragraph length according to the idea rather than following a repeated template.
5. Remove filler, superlatives, unnecessary transitions and repeated sales claims.
6. Use source-backed business details and label hypothetical calculations.
7. Keep natural terminology for the audience, including sq ft, lakh, plot, compound wall and built-up area.
8. Edit for clarity aloud. Preserve technical meaning when simplifying language.
9. Add genuine first-hand details only when the client supplies and verifies them.
10. Attribute external guidance and make it clear where a professional must assess the actual property.

Adding deliberate errors, running repeated paraphrases or inventing a personal story is not an editorial standard. I have not claimed these drafts are human-authored or run them through a detector to manufacture a “human” score.

Google’s quality questions support checking originality, completeness, expertise and authorship information. Use an actual author or reviewer only when that person has genuinely participated. [Creating helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

## What was checked for the drafts

Article 1 uses the local website’s config/pricing.json, Kumbakonam section, as inspected on 16 October 2026:
Basic ₹2,349; Standard ₹2,510; Premium ₹2,929; Luxury ₹3,199 per sq ft.

The 1,200 sq ft calculations were checked:
₹28,18,800; ₹30,12,000; ₹35,14,800; ₹38,38,800 respectively.

These are configured Structora rates, not independently confirmed current offers or local market averages. Client approval is still needed before publication. Tax inclusion was not established and is explicitly left for the written quotation.

The exclusion list comes from that same schedule. The drafts do not claim that every package contains every technical service or that an excluded service is unnecessary.

The office locations and contact destinations come from config/site.ts. No client testimonial, completed-project story, interview, engineer review or author qualification was invented.

Article 2 uses government and BIS sources for general context, with the links beside the relevant claims. The Tamil Nadu planning portal could not be retrieved during research. No current fee, setback, eligibility limit or guaranteed approval timeline is asserted.

Article 3’s quotation calculations are explicitly hypothetical examples, not offers from real competing builders.

## Before publication

- Ask Structora to confirm the rates, allowances and exclusion wording in article 1.
- Have the person responsible for planning/engineering review article 2 for the services and locations the company handles.
- Add a real author/reviewer only after that review; do not attach invented credentials or a false “human-written” label.
- Use real project photography with the necessary permission. Captions should describe the actual pictured work.
- Enter metadata into the corresponding Sanity fields; the YAML at the top of each file is editorial metadata, not article body.
- Move each FAQ question and answer into Sanity’s FAQ repeater, or retain the section in the body, but do not duplicate it.
- Leave readTime blank for the CMS to calculate. Enable showToc.
- The current Portable Text schema supports paragraphs, headings and lists, so the articles avoid tables.
- These files are complete editorial drafts. They have not been uploaded to Sanity or published.
- The site’s static deployment still requires a rebuild and upload after publishing new articles.

The writing aims for a clear, specific company voice. Actual human review and truthful business detail can strengthen it; “100% human” detection or guaranteed rankings cannot be promised.
