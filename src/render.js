import { execFile } from "node:child_process";
import { access, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { promisify } from "node:util";
import { renderCardSvg } from "./svg.js";

const execFileAsync = promisify(execFile);

async function ensureMissing(file) {
  try {
    await access(file);
    throw new Error(`Output already exists: ${file}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

async function runMakeables(args, cwd) {
  const npx = process.platform === "win32" ? "npx.cmd" : "npx";
  await execFileAsync(npx, ["--no-install", "makeables", ...args], {
    cwd,
    maxBuffer: 10 * 1024 * 1024
  });
}

export async function writeCardSvg(card, output, options = {}) {
  const target = resolve(output);
  await ensureMissing(target);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderCardSvg(card, options), "utf8");
  return target;
}

export async function renderCardPng(card, output, options = {}) {
  const target = resolve(output);
  if (extname(target).toLowerCase() !== ".png") {
    throw new Error("PNG output must use a .png extension");
  }

  await ensureMissing(target);
  await mkdir(dirname(target), { recursive: true });

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
