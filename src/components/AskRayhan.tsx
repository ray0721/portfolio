"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string; sources?: { title: string; url: string }[] };
const SUGGESTED = [
  "What research has Rayhan published?",
  "Which tools does Rayhan use?",
  "What analytics projects has he completed?",
  "How can I contact Rayhan about collaboration?",
];

export default function AskRayhan() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "end" }); }, [msgs, busy, open]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      const j = await r.json();
      setMsgs([...next, { role: "assistant", content: r.ok ? j.answer : j.error || "Something went wrong.", sources: r.ok ? j.sources : [] }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Could not reach the assistant. Please try again." }]);
    }
    setBusy(false);
  }

  if (!open)
    return (
      <button className="ar-fab" onClick={() => setOpen(true)} aria-label="Open Ask Rayhan AI chat">
        Ask Rayhan AI
      </button>
    );
  return (
    <section className="ar-panel" role="dialog" aria-label="Ask Rayhan AI" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <header className="ar-head">
        <b>Ask Rayhan AI</b>
        <span>
          <button onClick={() => { setMsgs([]); setInput(""); }}>Reset</button>
          <button onClick={() => setOpen(false)} aria-label="Close chat">Close</button>
        </span>
      </header>
      <div className="ar-body" aria-live="polite">
        {msgs.length === 0 && (
          <>
            <p className="ar-note">Ask about Rayhan’s research, projects, skills, education, or how to contact him. Answers come from this portfolio. Check important details with the linked sources.</p>
            <div className="ar-sugg">{SUGGESTED.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
          </>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`ar-msg ${m.role}`}>
            <p>{m.content}</p>
            {m.sources && m.sources.length > 0 && (
              <p className="ar-src">Sources: {m.sources.map((s, j) => <span key={j}>{j > 0 && " · "}<a href={s.url} onClick={() => setOpen(false)}>{s.title}</a></span>)}</p>
            )}
          </div>
        ))}
        {busy && <div className="ar-msg assistant" aria-label="Typing"><span className="ar-dots"><i /><i /><i /></span></div>}
        <div ref={end} />
      </div>
      <form className="ar-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input autoFocus value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Ask a question" aria-label="Your question" />
        <button type="submit" disabled={busy || !input.trim()}>Send</button>
      </form>
    </section>
  );
}
