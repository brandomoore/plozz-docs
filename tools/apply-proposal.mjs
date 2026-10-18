import { readdirSync, readFileSync, writeFileSync, mkdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './lib.mjs';

const directory = process.argv[2];
if (!directory) throw new Error('Provide the downloaded proposal directory.');
const input = resolve(ROOT, directory);
const files = readdirSync(input, { recursive: true, withFileTypes: true });
const proposal = new Map();
for (const entry of files) {
  if (!entry.isFile()) throw new Error('Proposal must contain only flat content files.');
  if (!/^(?:[a-z][a-z0-9-]{1,60}\.md|pages\.json)$/.test(entry.name)) throw new Error(`Unexpected proposal file: ${entry.name}`);
  const value = readFileSync(resolve(input, entry.name));
  if (value.length > 128_000) throw new Error('Proposal file exceeds size limit.');
  proposal.set(entry.name, value);
}
if (!proposal.has('pages.json') || !proposal.has('getting-started.md')) throw new Error('Incomplete proposal.');
mkdirSync(resolve(ROOT, 'content'), { recursive: true });
for (const file of readdirSync(resolve(ROOT, 'content'))) {
  if (!/^(?:[a-z][a-z0-9-]{1,60}\.md|pages\.json)$/.test(file)) throw new Error('Unexpected file in content directory.');
}
for (const [name, value] of proposal) writeFileSync(resolve(ROOT, 'content', name), value);
for (const file of readdirSync(resolve(ROOT, 'content'))) {
  if (!proposal.has(file)) unlinkSync(resolve(ROOT, 'content', file));
}
