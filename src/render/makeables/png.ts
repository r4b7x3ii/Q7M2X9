import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import type { MockCard, RenderOptions } from "../../types/index.js";
import { assertOutputMissing } from "../files.js";
import { renderCardSvg } from "../svg/index.js";

const execFileAsync = promisify(execFile);

async function runMakeables(args: string[], cwd: string): Promise<void> {
  const executable = process.platform === "win32" ? "makeables.cmd" : "makeables";
  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
  const candidates = [
    join(packageRoot, "node_modules", ".bin", executable),
    join(process.cwd(), "node_modules", ".bin", executable),
    executable
  ];

  let lastError: unknown;

  for (const command of candidates) {
    try {
      await execFileAsync(command, args, {
        cwd,
        maxBuffer: 10 * 1024 * 1024
      });
      return;
    } catch (error) {
      lastError = error;
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  throw new Error(
    "Makeables CLI was not found. Run npm install before rendering PNG output.",
    { cause: lastError }
  );
}

export async function renderCardPng(
  card: MockCard,
  output: string,
  options: RenderOptions = {}
): Promise<string> {
  if (extname(output).toLowerCase() !== ".png") {
    throw new Error("PNG output must use a .png extension");
  }

  const target = await assertOutputMissing(output);
  const workdir = await mkdtemp(join(tmpdir(), "q7m2x9-"));
  const artwork = join(workdir, "card.svg");
  const design = join(workdir, "card.json");

  try {
    await writeFile(artwork, renderCardSvg(card, options), "utf8");
    await runMakeables(["new", "card", "--file", artwork, "--out", design], workdir);
    await runMakeables(["render", "--file", design, "--out", target], workdir);
    return target;
  } finally {
    await rm(workdir, { recursive: true, force: true });
  }
}
