const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const tar = require('tar');
const { extractTemplate } = require('@capacitor/cli/dist/util/template');

test('Capacitor 6 extracts templates with the patched tar version', async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'capacitor-template-test-'));
  t.after(async () => {
    assert.equal(path.dirname(directory), os.tmpdir());
    await fs.rm(directory, { recursive: true, force: true });
  });
  const source = path.join(directory, 'source');
  const destination = path.join(directory, 'destination');
  const archive = path.join(directory, 'template.tar.gz');
  await fs.mkdir(source);
  await fs.writeFile(path.join(source, 'template.txt'), 'template content');
  await tar.create({ cwd: source, file: archive, gzip: true }, ['template.txt']);
  await extractTemplate(archive, destination);
  assert.equal(await fs.readFile(path.join(destination, 'template.txt'), 'utf8'), 'template content');
});
