import { execFile } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function runMakeables(args: string[], cwd: string): Promise<void> {
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
    "Makeables CLI was not found. Run npm install before rendering card images.",
    { cause: lastError }
  );
}
