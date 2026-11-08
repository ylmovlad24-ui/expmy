# -*- coding: utf-8 -*-
from ftplib import FTP
import os
import time

FTP_SERVER = 'ruvip69.hostiman.ru'
FTP_USER = 'expert'
FTP_PASS = 'Vlad752312'
REMOTE_PATH = '/www/expert.h1n.ru'
PROJECT_ROOT = r'C:\Users\Анна\IdeaProjects\expmy'

# Files to skip
SKIP = {
    '.git', '.idea', '.gigaide', '.gitignore',
    '__pycache__', 'node_modules', '.gigacode',
    '.pyc',
}

def ensure_dir(ftp, path):
    """Create directory and all parent directories"""
    parts = path.split('/')
    current = ''
    for part in parts:
        if part:
            current += '/' + part
            try:
                ftp.cwd(current)
            except:
                try:
                    ftp.mkd(current)
                    ftp.cwd(current)
                except:
                    # Directory might already exist
                    ftp.cwd(current)

def upload_file(ftp, local_path, remote_path):
    remote_unix = remote_path.replace('\\', '/')
    with open(local_path, 'rb') as f:
        ftp.storbinary('STOR ' + remote_unix, f)
    return os.path.getsize(local_path)

def walk_and_upload(ftp, local_dir, remote_dir):
    # Ensure remote directory exists
    ensure_dir(ftp, remote_dir)
    
    for item in sorted(os.listdir(local_dir)):
        if item in SKIP:
            continue
        
        local_path = os.path.join(local_dir, item)
        remote_path = os.path.join(remote_dir, item)
        
        if os.path.isdir(local_path):
            walk_and_upload(ftp, local_path, remote_path)
        else:
            try:
                size = upload_file(ftp, local_path, remote_path)
                print('  ' + item + ' (' + str(size) + ' bytes)')
            except Exception as e:
                print('  ERROR: ' + item + ' - ' + str(e))

def main():
    print('='*80)
    print('UPLOADING FILES TO HOSTING')
    print('='*80)
    
    print('\nConnecting to FTP...')
    ftp = FTP()
    ftp.connect(FTP_SERVER, 21)
    ftp.login(FTP_USER, FTP_PASS)
    
    # Create directory structure
    print('\nCreating directory structure...')
    ensure_dir(ftp, REMOTE_PATH)
    ftp.cwd(REMOTE_PATH)
    ftp.voidcmd('TYPE I')
    print('[OK] Directory created and connected')
    
    # Upload all files
    print('\nUploading files...')
    start_time = time.time()
    walk_and_upload(ftp, PROJECT_ROOT, REMOTE_PATH)
    elapsed = time.time() - start_time
    print('\nUpload complete in ' + str(round(elapsed, 1)) + ' seconds')
    
    # Verify
    print('\nVerifying...')
    remote_bytes = []
    ftp.retrbinary('RETR index.html', remote_bytes.append)
    data = b''.join(remote_bytes)
    print('index.html: ' + str(len(data)) + ' bytes')
    
    ftp.quit()
    
    print('\n' + '='*80)
    print('DONE!')
    print('='*80)

if __name__ == '__main__':
    main()
