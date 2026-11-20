"use client";
import { useEffect } from "react";
import { DATA } from "@/content/data";
import { initPortfolio } from "@/lib/portfolio";

export default function Portfolio({ html }: { html: string }) {
  useEffect(() => {
    const w = window as any;
    if (w.__portfolioInit) return;
    w.__portfolioInit = true;
    initPortfolio(DATA);
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
