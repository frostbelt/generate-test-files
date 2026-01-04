const fs = require('fs');
const crypto = require('crypto');

/**
 * 生成文本文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateTextFile(filePath, size) {
  const content = 'This is a test file for upload testing. '.repeat(Math.ceil(size / 40));
  const buffer = Buffer.from(content.slice(0, size));
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成二进制文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateBinaryFile(filePath, size) {
  const buffer = crypto.randomBytes(size);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 JSON 文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateJsonFile(filePath, size) {
  const data = {
    timestamp: new Date().toISOString(),
    description: 'Test JSON file for upload testing',
    items: []
  };

  // 添加足够的数据以达到目标大小
  let jsonStr = JSON.stringify(data, null, 2);
  while (jsonStr.length < size) {
    data.items.push({
      id: data.items.length + 1,
      name: `Item ${data.items.length + 1}`,
      value: Math.random(),
      data: crypto.randomBytes(32).toString('hex')
    });
    jsonStr = JSON.stringify(data, null, 2);
  }

  // 截断到精确大小
  const buffer = Buffer.from(jsonStr.slice(0, size));
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 HTML 文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateHtmlFile(filePath, size) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test HTML File</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .content { background: #f5f5f5; padding: 20px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Test HTML File for Upload Testing</h1>
        <div class="content">
            <p>This is a test file generated for upload testing purposes.</p>
        </div>
    </div>
</body>
</html>`;

  const content = template.repeat(Math.ceil(size / template.length));
  const buffer = Buffer.from(content.slice(0, size));
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 CSV 文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateCsvFile(filePath, size) {
  const header = 'id,name,email,age,created_at\n';
  const rows = [];
  
  for (let i = 1; i <= 1000; i++) {
    rows.push(`${i},User${i},user${i}@example.com,${20 + (i % 50)},${new Date().toISOString()}`);
  }
  
  const content = header + rows.join('\n');
  const repeatedContent = content.repeat(Math.ceil(size / content.length));
  const buffer = Buffer.from(repeatedContent.slice(0, size));
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 XML 文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateXmlFile(filePath, size) {
  const template = `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <metadata>
        <created>${new Date().toISOString()}</created>
        <description>Test XML file for upload testing</description>
    </metadata>
    <items>
        <item id="1">
            <name>Test Item 1</name>
            <value>100</value>
        </item>
    </items>
</root>`;

  const content = template.repeat(Math.ceil(size / template.length));
  const buffer = Buffer.from(content.slice(0, size));
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成零填充文件（用于测试大文件上传）
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateZeroFile(filePath, size) {
  const buffer = Buffer.alloc(size, 0);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 JPEG 图片文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateJpegFile(filePath, size) {
  // JPEG 文件头 (FF D8 FF E0)
  const header = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]);
  // JPEG 文件尾 (FF D9)
  const footer = Buffer.from([0xFF, 0xD9]);
  
  const contentSize = size - header.length - footer.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content, footer]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 PNG 图片文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generatePngFile(filePath, size) {
  // PNG 文件头 (89 50 4E 47 0D 0A 1A 0A)
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  // PNG 文件尾 (49 45 4E 44 AE 42 60 82)
  const footer = Buffer.from([0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
  
  const contentSize = size - header.length - footer.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content, footer]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 GIF 图片文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateGifFile(filePath, size) {
  // GIF87a 文件头
  const header = Buffer.from('GIF87a', 'ascii');
  // GIF 文件尾 (3B)
  const footer = Buffer.from([0x3B]);
  
  const contentSize = size - header.length - footer.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content, footer]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 WebP 图片文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateWebPFile(filePath, size) {
  // WebP 文件头 (52 49 46 46 ... 57 45 42 50)
  const header = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // "RIFF"
    0x00, 0x00, 0x00, 0x00, // 文件大小（占位）
    0x57, 0x45, 0x42, 0x50  // "WEBP"
  ]);
  
  const contentSize = size - header.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 BMP 图片文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateBmpFile(filePath, size) {
  // BMP 文件头 (42 4D)
  const header = Buffer.from([0x42, 0x4D]);
  
  const contentSize = size - header.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 MP4 视频文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateMp4File(filePath, size) {
  // MP4 文件头 (ftyp box)
  const header = Buffer.from([
    0x00, 0x00, 0x00, 0x18, // box size
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    0x69, 0x73, 0x6F, 0x6D, // "isom"
    0x00, 0x00, 0x02, 0x00, // minor version
    0x69, 0x73, 0x6F, 0x6D, // "isom"
    0x61, 0x76, 0x63, 0x31  // "avc1"
  ]);
  
  const contentSize = size - header.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 AVI 视频文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateAviFile(filePath, size) {
  // AVI 文件头 (RIFF...AVI )
  const header = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // "RIFF"
    0x00, 0x00, 0x00, 0x00, // 文件大小（占位）
    0x41, 0x56, 0x49, 0x20  // "AVI "
  ]);
  
  const contentSize = size - header.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 MOV 视频文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateMovFile(filePath, size) {
  // MOV 文件头
  const header = Buffer.from([
    0x00, 0x00, 0x00, 0x18, // box size
    0x66, 0x74, 0x79, 0x70, // "ftyp"
    0x71, 0x74, 0x20, 0x20, // "qt  "
    0x20, 0x05, 0x03, 0x00, // version
    0x71, 0x74, 0x20, 0x20  // "qt  "
  ]);
  
  const contentSize = size - header.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 MKV 视频文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateMkvFile(filePath, size) {
  // MKV 文件头 (EBML header)
  const header = Buffer.from([
    0x1A, 0x45, 0xDF, 0xA3, // EBML header ID
    0x93, 0x42, 0x86, 0x81, // EBML version
    0x01, 0x42, 0xF7, 0x81  // read version
  ]);
  
  const contentSize = size - header.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content]);
  fs.writeFileSync(filePath, buffer);
}

/**
 * 生成 WebM 视频文件
 * @param {string} filePath - 文件路径
 * @param {number} size - 文件大小（字节）
 */
function generateWebMFile(filePath, size) {
  // WebM 文件头 (与 MKV 相同的 EBML header)
  const header = Buffer.from([
    0x1A, 0x45, 0xDF, 0xA3, // EBML header ID
    0x93, 0x42, 0x86, 0x81, // EBML version
    0x01, 0x42, 0xF7, 0x81  // read version
  ]);
  
  const contentSize = size - header.length;
  const content = crypto.randomBytes(Math.max(0, contentSize));
  
  const buffer = Buffer.concat([header, content]);
  fs.writeFileSync(filePath, buffer);
}

module.exports = {
  'text': generateTextFile,
  'txt': generateTextFile,
  'binary': generateBinaryFile,
  'json': generateJsonFile,
  'html': generateHtmlFile,
  'csv': generateCsvFile,
  'xml': generateXmlFile,
  'zero': generateZeroFile,
  'jpeg': generateJpegFile,
  'jpg': generateJpegFile,
  'png': generatePngFile,
  'gif': generateGifFile,
  'webp': generateWebPFile,
  'bmp': generateBmpFile,
  'mp4': generateMp4File,
  'avi': generateAviFile,
  'mov': generateMovFile,
  'mkv': generateMkvFile,
  'webm': generateWebMFile
};
