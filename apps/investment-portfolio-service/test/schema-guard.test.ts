import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const schemaDir = resolve(dirname(fileURLToPath(import.meta.url)), '../src/db/schema');

const banned = [
  { pattern: /\breal\s*\(/, why: 'real is IEEE float — use money()/quantity()/rate()' },
  { pattern: /\bdoublePrecision\s*\(/, why: 'double precision is IEEE float — use money()' },
  { pattern: /mode:\s*['"]number['"]/, why: "mode: 'number' reads numerics through a double" },
  { pattern: /\bnumeric\s*\(/, why: 'call money()/quantity()/rate() so precision stays uniform' },
  { pattern: /withTimezone:\s*false/, why: 'instants are timestamptz — use timestamptz()' },
];

const schemaFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return schemaFiles(path);
      return entry.name.endsWith('.ts') ? [path] : [];
    }),
  );
  return nested.flat();
};

describe('schema guard', () => {
  it('keeps float and ad-hoc numeric out of the schema', async () => {
    const files = await schemaFiles(schemaDir);
    const contents = await Promise.all(
      files.map(async (file) => ({ file, source: await readFile(file, 'utf8') })),
    );

    const violations = contents.flatMap(({ file, source }) =>
      banned
        .filter(({ pattern }) => pattern.test(source))
        .map(({ why }) => `${file.slice(schemaDir.length + 1)}: ${why}`),
    );

    expect(violations).toEqual([]);
  });
});
