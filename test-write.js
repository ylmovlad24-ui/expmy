const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = 'C:/Users/Vlad/Documents/Ptodjec/expmy/assets/css/main-optimized.css';

console.log('Testing write to:', OUTPUT_FILE);

try {
    fs.writeFileSync(OUTPUT_FILE, 'test', 'utf8');
    console.log('✅ Write successful!');
} catch (error) {
    console.error('❌ Error:', error.message);
}
