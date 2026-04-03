const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AI Poet Application...\n');

// Start backend server
const backend = spawn('node', ['src/poet/server.js'], {
  stdio: 'pipe',
  cwd: path.resolve(__dirname)
});

backend.stdout.on('data', (data) => {
  console.log(`Backend: ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`Backend Error: ${data}`);
});

// Start frontend development server
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'pipe',
  cwd: path.resolve(__dirname)
});

frontend.stdout.on('data', (data) => {
  console.log(`Frontend: ${data}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`Frontend Error: ${data}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('📝 Backend server starting on http://localhost:3001');
console.log('🌐 Frontend server starting on http://localhost:5173');
console.log('🎯 Access AI Poet at: http://localhost:5173/poet');
console.log('\n⚠️  Make sure to set your OPENAI_API_KEY in src/poet/.env');
console.log('💡 Press Ctrl+C to stop both servers\n');
