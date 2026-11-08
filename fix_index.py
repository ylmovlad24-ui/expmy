# -*- coding: utf-8 -*-
from ftplib import FTP

FTP_SERVER = 'ruvip69.hostiman.ru'
FTP_USER = 'expert'
FTP_PASS = 'Vlad752312'
REMOTE_PATH = '/www/expert.h1n.ru'

def main():
    print('Connecting to FTP...')
    ftp = FTP()
    ftp.connect(FTP_SERVER, 21)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(REMOTE_PATH)
    ftp.voidcmd('TYPE I')
    
    # Step 1: Download current index.html (47KB new file)
    print('\nStep 1: Downloading current index.html...')
    remote_bytes = []
    ftp.retrbinary('RETR index.html', remote_bytes.append)
    index_html_data = b''.join(remote_bytes)
    print('  Saved: ' + str(len(index_html_data)) + ' bytes')
    
    # Step 2: Rename index.html to index_main.html
    print('\nStep 2: Renaming index.html to index_main.html...')
    # Upload index_main.html
    with open('index_main.html', 'wb') as f:
        f.write(index_html_data)
    with open('index_main.html', 'rb') as f:
        ftp.storbinary('STOR index_main.html', f)
    print('  Uploaded index_main.html')
    
    # Step 3: Delete old index.html
    print('\nStep 3: Deleting old index.html...')
    ftp.delete('index.html')
    print('  Deleted')
    
    # Step 4: Create new index.html with meta redirect to index.php
    print('\nStep 4: Creating new index.html with redirect...')
    redirect_html = b'''<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=index.php">
  <title>Redirecting...</title>
</head>
<body>
  <script>window.location.href="index.php";</script>
</body>
</html>
'''
    with open('redirect.html', 'wb') as f:
        f.write(redirect_html)
    with open('redirect.html', 'rb') as f:
        ftp.storbinary('STOR index.html', f)
    print('  Uploaded redirect index.html')
    
    # Verify
    print('\nVerifying...')
    remote_bytes = []
    ftp.retrbinary('RETR index.php', remote_bytes.append)
    php_data = b''.join(remote_bytes)
    print('  index.php: ' + str(len(php_data)) + ' bytes')
    
    remote_bytes = []
    ftp.retrbinary('RETR index_main.html', remote_bytes.append)
    main_data = b''.join(remote_bytes)
    print('  index_main.html: ' + str(len(main_data)) + ' bytes')
    
    ftp.quit()
    
    # Clean up
    import os
    os.remove('index_main.html')
    os.remove('redirect.html')
    
    print('\nDone! Now https://expert.h1n.ru/ will redirect to index.php (47KB)')

if __name__ == '__main__':
    main()
