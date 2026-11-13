# SECURITY - CRITICAL!

## Issue
Telegram Bot Token was in client JavaScript. Anyone could steal it.

## Solution
1. Token removed from assets/js/modules/forms.js
2. Server endpoint created: api/send-form.php
3. Forms now sent through server

## Usage
Client code (forms.js) sends to /api/send-form.php
Server handles Telegram API call securely

## Deploy
1. Upload api/send-form.php to server
2. Set permissions: chmod 644
3. Check CORS headers
