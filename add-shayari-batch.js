const fs = require('fs');

// Read the shayari data
const shayariData = JSON.parse(fs.readFileSync('add-all-shayari.json', 'utf8'));

// Function to add shayari one by one
async function addShayari() {
  for (const shayari of shayariData) {
    try {
      const response = await fetch('https://www.digntag.in/api/admin-shayari-manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shayari)
      });
      
      const result = await response.json();
      console.log(`Added: ${shayari.language} ${shayari.lineCount} lines for ${shayari.recipient} - ${result.success ? 'SUCCESS' : 'FAILED'}`);
      
      if (!result.success) {
        console.error('Error:', result.error);
      }
      
      // Wait a bit between requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Network error:', error.message);
    }
  }
}

addShayari();
