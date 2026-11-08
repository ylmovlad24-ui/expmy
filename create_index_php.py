# -*- coding: utf-8 -*-
from ftplib import FTP

FTP_SERVER = 'ruvip69.hostiman.ru'
FTP_USER = 'expert'
FTP_PASS = 'Vlad752312'
REMOTE_PATH = '/www/expert.h1n.ru'

# Create index.php that serves index.html
index_php_content = b'''<?php
// Serve index.html directly - bypasses Nginx cache
$file = __DIR__ . '/index.html';
if (file_exists($file)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($file);
    exit;
}
http_response_code(404);
echo 'Not found';
?>
'''

def main():
    print('Connecting to FTP...')
    ftp = FTP()
    ftp.connect(FTP_SERVER, 21)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(REMOTE_PATH)
    ftp.voidcmd('TYPE I')
    
    print('Creating index.php...')
    with open('index_temp.php', 'wb') as f:
        f.write(index_php_content)
    
    with open('index_temp.php', 'rb') as f:
        ftp.storbinary('STOR index.php', f)
    
    print('[OK] index.php uploaded')
    
    # Verify
    remote_bytes = []
    ftp.retrbinary('RETR index.php', remote_bytes.append)
    data = b''.join(remote_bytes)
    print('Uploaded size: ' + str(len(data)) + ' bytes')
    
    ftp.quit()
    
    # Clean up
    import os
    os.remove('index_temp.php')
    
    print('\nDone! Now test: https://expert.h1n.ru/')

if __name__ == '__main__':
    main()
