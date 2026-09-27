const { mkdirSync } = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const pad = value => String(value).padStart(2, '0');
const now = new Date();
const testArguments = process.argv.slice(2);
const specFiles = testArguments.filter(argument => /\.spec\.[cm]?js$/i.test(argument));
const runLabel = specFiles.length === 1
  ? path.parse(specFiles[0]).name.replace(/[^a-z0-9.-]/gi, '_')
  : specFiles.length > 1
    ? 'multiple-specs'
    : 'all-specs';
const runId = `${runLabel}_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
const runDir = path.join(process.cwd(), 'allure-history', runId);
const resultsDir = path.join(runDir, 'results');
const reportDir = path.join(runDir, 'report');
const binDir = path.join(process.cwd(), 'node_modules', '.bin');
const command = name => path.join(binDir, process.platform === 'win32' ? `${name}.cmd` : name);

mkdirSync(resultsDir, { recursive: true });

const run = (name, args, env) => {
  const result = spawnSync(command(name), args, {
    cwd: process.cwd(),
    env,
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  return result.status ?? 1;
};

const testExitCode = run('playwright', ['test', ...testArguments], {
  ...process.env,
  ALLURE_RESULTS_DIR: resultsDir,
});
const reportExitCode = run(
  'allure',
  ['awesome', resultsDir, '--output', reportDir, '--single-file'],
  process.env,
);

console.log(`\nStandalone Allure report saved to: ${path.join(reportDir, 'index.html')}`);
console.log('Open the newest saved report with: npm run allure:open');

process.exitCode = testExitCode || reportExitCode;
