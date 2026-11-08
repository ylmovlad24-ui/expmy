# -*- coding: utf-8 -*-
import subprocess
import os
import time

# SSH/SFTP credentials
SSH_HOST = 'ruvip69.hostiman.ru'
SSH_PORT = 8228
SSH_USER = 's277847'
SSH_PASS = '6GsjCe53s9'
REMOTE_PATH = '/www/expert.h1n.ru'
PROJECT_ROOT = r'C:\Users\Анна\IdeaProjects\expmy'
PLINK_PATH = r'C:\Program Files\PuTTY\plink.exe'

# Files to skip
SKIP = {
    '.git', '.idea', '.gigaide', '.gitignore',
    '__pycache__', 'node_modules', '.gigacode',
    '.pyc', 'upload_sftp.py', 'upload_files.py',
    'upload_to_hosting.py', 'upload_final.py',
}

def upload_file_via_sftp(local_path, remote_path):
    """Upload a single file via SFTP using plink"""
    # Create sftp script
    script = 'put "' + local_path + '" "' + remote_path + '"\n'
    script_file = 'sftp_script.txt'
    
    with open(script_file, 'w') as f:
        f.write(script)
    
    # Run plink
    cmd = [
        PLINK_PATH,
        '-ssh',
        '-P', str(SSH_PORT),
        '-l', SSH_USER,
        '-pw', SSH_PASS,
        '-batch',
        '-s',
        SSH_HOST
    ]
    
    with open(script_file, 'r') as f:
        result = subprocess.run(cmd, stdin=f, capture_output=True, text=True)
    
    os.remove(script_file)
    
    if result.returncode == 0:
        return os.path.getsize(local_path)
    else:
        raise Exception(result.stderr)

def walk_and_upload(local_dir, remote_dir):
    """Recursively upload directory contents"""
    for item in sorted(os.listdir(local_dir)):
        if item in SKIP:
            continue
        
        local_path = os.path.join(local_dir, item)
        remote_path = remote_dir + '/' + item
        
        if os.path.isdir(local_path):
            # Create remote directory via SSH
            cmd = [
                PLINK_PATH,
                '-ssh',
                '-P', str(SSH_PORT),
                '-l', SSH_USER,
                '-pw', SSH_PASS,
                '-batch',
                'mkdir -p ' + remote_path
            ]
            subprocess.run(cmd, capture_output=True)
            print('  Created: ' + remote_path)
            walk_and_upload(local_path, remote_path)
        else:
            try:
                size = upload_file_via_sftp(local_path, remote_path)
                print('  Uploaded: ' + item + ' (' + str(size) + ' bytes)')
            except Exception as e:
                print('  ERROR: ' + item + ' - ' + str(e))

def main():
    print('='*80)
    print('UPLOADING FILES VIA SFTP')
    print('='*80)
    
    # Upload files
    print('\nUploading files:')
    start_time = time.time()
    walk_and_upload(PROJECT_ROOT, REMOTE_PATH)
    elapsed = time.time() - start_time
    print('\nUpload complete in ' + str(round(elapsed, 1)) + ' seconds')
    
    # Verify index.html
    print('\nVerifying index.html...')
    cmd = [
        PLINK_PATH,
        '-ssh',
        '-P', str(SSH_PORT),
        '-l', SSH_USER,
        '-pw', SSH_PASS,
        '-batch',
        'ls -l ' + REMOTE_PATH + '/index.html'
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        print(result.stdout)
    else:
        print('ERROR: ' + result.stderr)
    
    print('\n' + '='*80)
    print('DONE!')
    print('='*80)

if __name__ == '__main__':
    main()
