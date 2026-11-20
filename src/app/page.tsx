import fs from "node:fs";
import path from "node:path";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  const html = fs.readFileSync(path.join(process.cwd(), "src/content/body.html"), "utf8");
  return <Portfolio html={html} />;
}
