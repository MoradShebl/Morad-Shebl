const https = require('https');
const fs = require('fs');
const path = require('path');

const fontsToDownload = [
  {
    url: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    filename: 'Inter-Regular.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2ZL7.woff2',
    filename: 'Inter-Bold.woff2'
  }
];

const fontsDir = path.join(__dirname, '../public/fonts');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

fontsToDownload.forEach(({ url, filename }) => {
  https.get(url, (response) => {
    const filePath = path.join(fontsDir, filename);
    const fileStream = fs.createWriteStream(filePath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      console.log(`Downloaded ${filename}`);
      fileStream.close();
    });
  });
});
