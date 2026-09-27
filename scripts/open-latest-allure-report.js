const { existsSync, readdirSync, statSync } = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const historyDir = path.join(process.cwd(), 'allure-history');
const runNames = existsSync(historyDir)
  ? readdirSync(historyDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort((first, second) =>
        statSync(path.join(historyDir, second)).mtimeMs - statSync(path.join(historyDir, first)).mtimeMs,
      )
  : [];
const latestRun = runNames.find(name => existsSync(path.join(historyDir, name, 'report', 'index.html')));

if (!latestRun) {
  console.error('No saved Allure reports were found. Run "npm test" first.');
  process.exitCode = 1;
} else {
  const reportFile = path.join(historyDir, latestRun, 'report', 'index.html');
  console.log(`Opening standalone Allure report: ${reportFile}`);
  const command = process.platform === 'win32'
    ? ['cmd.exe', ['/c', 'start', '', reportFile]]
    : process.platform === 'darwin'
      ? ['open', [reportFile]]
      : ['xdg-open', [reportFile]];
  const browser = spawn(command[0], command[1], { detached: true, stdio: 'ignore' });
  browser.unref();
}
