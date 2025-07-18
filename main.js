const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const http = require('http');

let backendProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Load frontend (use localhost)
  win.loadURL('http://localhost:5173');
}

function startBackend() {
  backendProcess = spawn('node', ['backend/server.js'], {
    stdio: 'inherit',
    shell: true
  });

  backendProcess.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
}

function waitForBackendReady(url, callback) {
  const interval = setInterval(() => {
    http.get(url, (res) => {
      console.log(`Polling backend... Status code: ${res.statusCode}`);

      // Accept ANY valid HTTP response (even 404) as "backend ready"
      if (res.statusCode >= 200 && res.statusCode < 500) {
        clearInterval(interval);
        console.log('Backend is ready.');
        callback();
      }
    }).on('error', (err) => {
      // Connection failed - keep retrying
    });
  }, 1000); // Poll every 1 second
}

app.whenReady().then(() => {
  startBackend();
  waitForBackendReady('http://localhost:5000/', createWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
