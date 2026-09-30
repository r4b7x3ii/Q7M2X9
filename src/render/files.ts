import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export async function assertOutputMissing(file: string): Promise<string> {
  const target = resolve(file);

  try {
    await access(target);
    throw new Error(`Output already exists: ${target}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  await mkdir(dirname(target), { recursive: true });
  return target;
}

export async function writeTextOutput(file: string, content: string): Promise<string> {
  const target = await assertOutputMissing(file);
  await writeFile(target, content, "utf8");
  return target;
}
