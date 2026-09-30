import { access, mkdir } from "node:fs/promises";
import { basename, extname, join, parse, resolve } from "node:path";

async function exists(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

export async function nextResultOutput(
  file: string,
  root: string = process.cwd()
): Promise<string> {
  const resultDir = resolve(root, "result");
  const requested = basename(file);
  const extension = extname(requested);
  const name = parse(requested).name;

  await mkdir(resultDir, { recursive: true });

  let candidate = join(resultDir, requested);
  let index = 2;

  while (await exists(candidate)) {
    candidate = join(resultDir, `${name}-${index}${extension}`);
    index += 1;
  }

  return candidate;
}
