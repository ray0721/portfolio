// Pure functions (no imports) so they are easy to test. Builds the knowledge base and finds relevant chunks.
export type Chunk = { id: string; title: string; url: string; text: string };

const STOP = new Set("a an the and or of to in on for with is are was were be by at as it its this that what which who how does do did has have rayhan his he about from can any".split(" "));
const tok = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));

// Visitors phrase things differently from the page text, so a few related words are added to the query.
const SYN: Record<string, string> = {
  publish: "publication paper journal article", paper: "publication journal", stud: "education university degree student",
  school: "education university", degree: "education university", graduat: "education", work: "experience intern role",
  job: "experience intern", contact: "email form", reach: "contact email", skill: "tools skills", tool: "tools skills",
  tech: "tools skills", hire: "contact", certif: "credentials award", award: "credentials", dashboard: "tableau dashboard",
};
export function retrieve(chunks: Chunk[], query: string, k = 6): Chunk[] {
  const base = tok(query);
  const extra = base.flatMap((w) => Object.entries(SYN).filter(([key]) => w.startsWith(key)).map(([, v]) => v));
  const q = [...base, ...tok(extra.join(" "))];
  if (!base.length || !chunks.length) return [];
  const docs = chunks.map((c) => tok(c.title + " " + c.text));
  const N = docs.length;
  const avg = docs.reduce((a, d) => a + d.length, 0) / N || 1;
  const df = new Map<string, number>();
  docs.forEach((d) => new Set(d).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)));
  return chunks
    .map((c, i) => {
      const d = docs[i];
      const tf = new Map<string, number>();
      d.forEach((w) => tf.set(w, (tf.get(w) ?? 0) + 1));
      let s = 0;
      for (const w of q) {
        const f = tf.get(w) ?? 0;
        if (!f) continue;
        const n = df.get(w) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        s += (idf * f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (d.length / avg)));
      }
      return { c, s };
    })
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .map((x) => x.c);
}

const strip = (h: string) =>
  h.replace(/<!--[\s\S]*?-->/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

// D = the DATA object from content/data.ts, html = content/body.html
export function buildChunks(D: any, html: string): Chunk[] {
  const out: Chunk[] = [];
  const sections: Record<string, string> = {
    statement: "Research statement", education: "Education", experience: "Professional experience",
    community: "Community engagement", expertise: "Expertise and collaboration",
  };
  for (const [id, title] of Object.entries(sections)) {
    const m = html.match(new RegExp(`<section id="${id}"[^>]*>([\\s\\S]*?)</section>`));
    const t = m ? strip(m[1]) : "";
    if (t) out.push({ id, title, url: `#${id}`, text: t });
  }
  (D.publications ?? []).forEach((p: any, i: number) =>
    out.push({
      id: `pub${i}`, title: p.title, url: "#publications",
      text: `Publication: ${p.title}. Authors: ${p.authors.map((a: string[]) => a[0] + " " + a[1]).join(", ")}. ${p.journal}, ${p.section}, ${p.type}, volume ${p.volume}, ${p.date}. DOI ${p.doi}. Topics: ${p.topics.join(", ")}. Summary: ${p.abstract}`,
    }));
  const det = D.projectDetails ?? {};
  (D.projects ?? []).forEach(([name, cat]: [string, string], i: number) => {
    const d = det[name];
    const parts = [`Project: ${name}. Category: ${cat}.`];
    if (!d) parts.push("A detailed write-up has not been added yet.");
    else {
      if (d.overview) parts.push(`Overview: ${d.overview}`);
      if (d.problem) parts.push(`Business problem: ${d.problem}`);
      if (d.question) parts.push(`Research question: ${d.question}`);
      if (d.dataset) parts.push(`Dataset: ${d.dataset}`);
      if (d.tools?.length) parts.push(`Tools: ${d.tools.join(", ")}.`);
      if (d.method) parts.push(`Method: ${d.method}`);
      if (d.process) parts.push(`Process: ${d.process}`);
      (d.findings ?? []).filter(Boolean).forEach((f: string) => parts.push(`Finding: ${f}`));
      (d.recommendations ?? []).filter(Boolean).forEach((f: string) => parts.push(`Recommendation: ${f}`));
      if (d.github) parts.push(`GitHub: ${d.github}`);
    }
    out.push({ id: `proj${i}`, title: name, url: "#projects", text: parts.join(" ") });
  });
  Object.entries(D.skills ?? {}).forEach(([g, v]: [string, any]) =>
    out.push({ id: `skill-${g}`, title: `Skills: ${g}`, url: "#skills", text: `${g}: ${v.join(", ")}.` }));
  (D.credentials ?? []).forEach((c: any, i: number) =>
    out.push({ id: `cred${i}`, title: c.title, url: "#credentials", text: `${c.title}. ${c.issuer}. ${c.date}. ${c.note ?? ""}` }));
  (D.dashboards ?? []).forEach((d: any, i: number) =>
    out.push({ id: `dash${i}`, title: d.title, url: "#lab", text: `Dashboard: ${d.title}. ${d.description ?? ""} Data source: ${d.source ?? "n/a"}. Method: ${d.method ?? "n/a"}.` }));
  (D.articles ?? []).forEach((a: any, i: number) =>
    out.push({ id: `art${i}`, title: a.title, url: "#insights", text: `Article: ${a.title}. ${a.category}. ${a.summary}` }));
  (D.development ?? []).forEach((x: any, i: number) =>
    out.push({ id: `dev${i}`, title: x.title, url: "#development", text: `${x.type}: ${x.title}. ${x.org ?? ""} ${x.date ?? ""}` }));
  const links = Object.entries(D.links ?? {}).filter(([, u]) => u).map(([k, u]) => `${k}: ${u}`);
  out.push({ id: "profiles", title: "Academic and professional profiles", url: "#collab", text: `Profiles and links. ${links.join("; ")}` });
  out.push({ id: "contact", title: "Contact", url: "#contact", text: `To contact Rayhan, use the contact form or the inquiry buttons in the Contact section.${D.email ? " Email: " + D.email + "." : ""}` });
  return out;
}
