const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Убираем query string
  let url = req.url.split('?')[0];
  
  // Для root — index.html
  if (url === '/') {
    url = '/index.html';
  }
  
  // Убираем ведущий слеш для path.join
  let filePath = path.join(__dirname, url);
  
  // Проверяем, что путь внутри проекта
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  // Обработка директорий — если путь заканчивается на /, добавляем index.html
  if (url.endsWith('/')) {
    filePath = path.join(__dirname, url, 'index.html');
  }
  
  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('404:', req.url);
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Root:', __dirname);
});
