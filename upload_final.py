# -*- coding: utf-8 -*-
from ftplib import FTP
import os

FTP_SERVER = 'ruvip69.hostiman.ru'
FTP_USER = 'expert'
FTP_PASS = 'Vlad752312'
REMOTE_PATH = ''  # Корень FTP = /www/expert.h1n.ru
PROJECT_ROOT = r'C:\Users\Анна\IdeaProjects\expmy'

SKIP = {
    '.git', '.idea', '.gigaide', '.gitignore',
    '__pycache__', 'node_modules', '.gigacode',
    '.pyc', 'upload_final.py', 'upload_to_hosting.py',
}

def create_all_dirs(ftp, local_dir, remote_dir):
    """Create all directories recursively"""
    for item in os.listdir(local_dir):
        if item in SKIP:
            continue
        local_path = os.path.join(local_dir, item)
        remote_path = os.path.join(remote_dir, item)
        if os.path.isdir(local_path):
            try:
                ftp.mkd(remote_path)
                print('  Created: ' + remote_path)
            except:
                pass
            create_all_dirs(ftp, local_path, remote_path)

def upload_file(ftp, local_path, remote_path):
    remote_unix = remote_path.replace('\\', '/')
    with open(local_path, 'rb') as f:
        ftp.storbinary('STOR ' + remote_unix, f)

def walk_and_upload(ftp, local_dir, remote_dir):
    for item in sorted(os.listdir(local_dir)):
        if item in SKIP:
            continue
        local_path = os.path.join(local_dir, item)
        remote_path = os.path.join(remote_dir, item)
        if os.path.isdir(local_path):
            walk_and_upload(ftp, local_path, remote_path)
        else:
            upload_file(ftp, local_path, remote_path)
            print('  ' + item)

def main():
    print('Connecting...')
    ftp = FTP()
    ftp.connect(FTP_SERVER, 21)
    ftp.login(FTP_USER, FTP_PASS)
    
    # FTP chroot: /www/expert.h1n.ru is visible as /
    print('Using root directory (chroot)')
    ftp.voidcmd('TYPE I')
    print('[OK] Connected')
    
    # Create all directories first
    print('\nCreating subdirectories:')
    create_all_dirs(ftp, PROJECT_ROOT, REMOTE_PATH)
    print('[OK] All subdirectories created')
    
    # Upload files
    print('\nUploading files:')
    walk_and_upload(ftp, PROJECT_ROOT, REMOTE_PATH)
    
    # Verify
    print('\nVerifying...')
    remote_bytes = []
    ftp.retrbinary('RETR index.html', remote_bytes.append)
    data = b''.join(remote_bytes)
    print('index.html: ' + str(len(data)) + ' bytes')
    
    ftp.quit()
    print('\nDONE!')

if __name__ == '__main__':
    main()
