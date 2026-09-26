import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const result = spawnSync(process.execPath, ['scripts/run-framework.mjs', 'build'], {
  cwd: root, stdio: 'inherit', env: { ...process.env, GITHUB_PAGES: 'true' },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const output = new URL('../dist/client/', import.meta.url);
if (!existsSync(new URL('index.html', output))) throw new Error('Static index.html was not generated.');
writeFileSync(new URL('CNAME', output), 'volatile.btrbot.com\n');
writeFileSync(new URL('.nojekyll', output), '');
console.log('GitHub Pages output ready: dist/client (volatile.btrbot.com)');
