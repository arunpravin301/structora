import fs from "fs";
import path from "path";
import type { PortableTextBlock } from "next-sanity";
import type { Blog } from "./content";

function parseInlineSpans(text: string, blockKey: string) {
  const children: Array<{ _type: "span"; _key: string; text: string; marks: string[] }> = [];
  const markDefs: Array<{ _key: string; _type: "link"; href: string }> = [];

  // Tokenize markdown links [label](url), bold **text**, italic *text*, inline code `code`
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let spanIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      children.push({
        _type: "span",
        _key: `${blockKey}-s${spanIdx++}`,
        text: text.slice(lastIdx, match.index),
        marks: [],
      });
    }

    if (match[2] !== undefined && match[3] !== undefined) {
      const linkKey = `${blockKey}-l${spanIdx}`;
      // Convert absolute structoraindia.com links to internal paths when appropriate
      const rawHref = match[3].trim();
      const href = rawHref.replace(/^https?:\/\/(www\.)?structoraindia\.com/, "") || "/";
      markDefs.push({ _key: linkKey, _type: "link", href });
      children.push({
        _type: "span",
        _key: `${blockKey}-s${spanIdx++}`,
        text: match[2],
        marks: [linkKey],
      });
    } else if (match[4] !== undefined) {
      children.push({
        _type: "span",
        _key: `${blockKey}-s${spanIdx++}`,
        text: match[4],
        marks: ["strong"],
      });
    } else if (match[5] !== undefined) {
      children.push({
        _type: "span",
        _key: `${blockKey}-s${spanIdx++}`,
        text: match[5],
        marks: ["em"],
      });
    } else if (match[6] !== undefined) {
      children.push({
        _type: "span",
        _key: `${blockKey}-s${spanIdx++}`,
        text: match[6],
        marks: ["code"],
      });
    }

    lastIdx = tokenRegex.lastIndex;
  }

  if (lastIdx < text.length || children.length === 0) {
    children.push({
      _type: "span",
      _key: `${blockKey}-s${spanIdx++}`,
      text: text.slice(lastIdx),
      marks: [],
    });
  }

  return { children, markDefs };
}

function parseMarkdownBlog(raw: string, filename: string): Blog | null {
  const normalized = raw.replace(/\r\n/g, "\n");
  const fmMatch = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return null;

  const fmText = fmMatch[1];
  const contentText = fmMatch[2];

  const meta: Record<string, string> = {};
  for (const line of fmText.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.+)$/);
    if (m) {
      meta[m[1]] = m[2].trim().replace(/^"(.*)"$/, "$1");
    }
  }

  const slug = meta.slug || filename.replace(/\.md$/, "");
  const title = meta.title || slug;

  // Separate main body from "## Frequently Asked Questions" section
  const faqSplit = contentText.split(/\n##\s+Frequently [Aa]sked [Qq]uestions\s*\n/);
  const mainMarkdown = faqSplit[0] || "";
  const faqMarkdown = faqSplit[1] || "";

  const faqs: Array<{ question: string; answer: string }> = [];
  if (faqMarkdown.trim()) {
    const faqBlocks = faqMarkdown.split(/\n###\s+/).filter(Boolean);
    for (const fb of faqBlocks) {
      const cleaned = fb.replace(/^###\s+/, "").trim();
      const nlIdx = cleaned.indexOf("\n");
      if (nlIdx !== -1) {
        const question = cleaned.slice(0, nlIdx).trim();
        const answer = cleaned
          .slice(nlIdx + 1)
          .trim()
          .replace(/\*\*([^*]+)\*\*/g, "$1")
          .replace(/`([^`]+)`/g, "$1")
          .replace(/\s+/g, " ");
        if (question && answer) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  const body: PortableTextBlock[] = [];
  const lines = mainMarkdown.split("\n");
  let blockIdx = 0;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(" ").trim();
    paragraphBuffer = [];
    if (!text) return;
    const key = `b${++blockIdx}`;
    const { children, markDefs } = parseInlineSpans(text, key);
    body.push({
      _type: "block",
      _key: key,
      style: "normal",
      markDefs,
      children,
    });
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    // Skip top-level H1 since PageHero renders the article title
    if (line.startsWith("# ")) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      const text = line.slice(3).trim();
      const key = `h2-${++blockIdx}`;
      const { children, markDefs } = parseInlineSpans(text, key);
      body.push({
        _type: "block",
        _key: key,
        style: "h2",
        markDefs,
        children,
      });
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      const text = line.slice(4).trim();
      const key = `h3-${++blockIdx}`;
      const { children, markDefs } = parseInlineSpans(text, key);
      body.push({
        _type: "block",
        _key: key,
        style: "h3",
        markDefs,
        children,
      });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      const text = line.slice(2).trim();
      const key = `ul-${++blockIdx}`;
      const { children, markDefs } = parseInlineSpans(text, key);
      body.push({
        _type: "block",
        _key: key,
        style: "normal",
        listItem: "bullet",
        level: 1,
        markDefs,
        children,
      } as PortableTextBlock);
      continue;
    }

    const numMatch = line.match(/^\d+\.\s+(.+)$/);
    if (numMatch) {
      flushParagraph();
      const text = numMatch[1].trim();
      const key = `ol-${++blockIdx}`;
      const { children, markDefs } = parseInlineSpans(text, key);
      body.push({
        _type: "block",
        _key: key,
        style: "normal",
        listItem: "number",
        level: 1,
        markDefs,
        children,
      } as PortableTextBlock);
      continue;
    }

    paragraphBuffer.push(line);
  }
  flushParagraph();

  const publishedAt = meta.publishedAt
    ? new Date(meta.publishedAt).toISOString()
    : "2026-10-16T10:00:00.000Z";

  return {
    _id: `local-blog-${slug}`,
    _updatedAt: publishedAt,
    title,
    slug: { current: slug },
    publishedAt,
    category: meta.category || "Construction Guide",
    readTime: meta.readTime || "7 min read",
    showToc: meta.showToc !== "false",
    seoTitle: meta.seoTitle || title,
    seoDescription: meta.seoDescription || "",
    faqs,
    body,
  };
}

export function getLocalBlogs(): Blog[] {
  const candidateDirs = [
    path.resolve(process.cwd(), "../../../Blogs"),
    path.resolve(process.cwd(), "content/blogs"),
  ];

  const dir = candidateDirs.find((d) => fs.existsSync(d));
  if (!dir) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const blogs: Blog[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = parseMarkdownBlog(raw, file);
    if (parsed) blogs.push(parsed);
  }
  return blogs;
}
