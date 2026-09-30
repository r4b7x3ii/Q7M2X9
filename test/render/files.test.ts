import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { nextResultOutput } from "../../src/render/files.js";

test("uses result folder and increments existing filenames", async () => {
  const root = await mkdtemp(join(tmpdir(), "q7m2x9-test-"));

  try {
    const first = await nextResultOutput("card.png", root);
    assert.equal(first, join(root, "result", "card.png"));

    await writeFile(first, "");
    const second = await nextResultOutput("card.png", root);
    assert.equal(second, join(root, "result", "card-2.png"));

    await writeFile(second, "");
    const third = await nextResultOutput("card.png", root);
    assert.equal(third, join(root, "result", "card-3.png"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
