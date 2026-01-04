const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const generators = require('./generators');

/**
 * 解析文件大小参数
 * @param {string} sizeStr - 大小字符串，如 "1KB", "5MB", "100GB"
 * @returns {number} - 文件大小（字节）
 */
function parseSize(sizeStr) {
  const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*([KMGT]?B?)$/i);
  if (!match) {
    throw new Error(`Invalid size format: ${sizeStr}. Use format like "1KB", "5MB", "100GB"`);
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  const units = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024
  };

  const multiplier = units[unit] || 1;
  return Math.floor(value * multiplier);
}

/**
 * 格式化文件大小用于显示
 * @param {number} bytes - 字节数
 * @returns {string} - 格式化后的大小
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`;
}

/**
 * 生成时间戳文件名
 * @param {string} ext - 文件扩展名
 * @param {number} size - 文件大小（字节）
 * @param {number} index - 文件序号（用于批量生成）
 * @returns {string} - 文件名
 */
function generateFileName(ext, size, index = 1) {
  const now = new Date();
  // 使用中国时区（UTC+8）
  const chinaTime = new Date(now.getTime() + (8 * 60 * 60 * 1000));
  const timestamp = chinaTime.toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .slice(11, 19); // 只保留时分秒部分
  const sizeFormatted = formatSize(size).replace('.', '_');
  return `${timestamp}_${sizeFormatted}_${index}.${ext}`;
}

/**
 * 生成测试文件
 * @param {Object} options - 生成选项
 * @param {string} options.type - 文件类型
 * @param {string} options.ext - 文件扩展名（可选）
 * @param {string} options.size - 文件大小
 * @param {string} options.output - 输出目录
 * @param {number} options.count - 生成数量
 * @returns {Array} - 生成的文件路径列表
 */
function generateTestFiles(options) {
  const {
    type = 'binary',
    ext = null,
    size,
    output = process.cwd(),
    count = 1
  } = options;

  if (!size) {
    throw new Error('--size is required');
  }

  const sizeInBytes = parseSize(size);

  // 自动检测扩展名
  const typeExtensions = {
    'text': 'txt',
    'txt': 'txt',
    'binary': 'bin',
    'json': 'json',
    'html': 'html',
    'csv': 'csv',
    'xml': 'xml',
    'zero': 'dat',
    'jpeg': 'jpg',
    'jpg': 'jpg',
    'png': 'png',
    'gif': 'gif',
    'webp': 'webp',
    'bmp': 'bmp',
    'mp4': 'mp4',
    'avi': 'avi',
    'mov': 'mov',
    'mkv': 'mkv',
    'webm': 'webm'
  };

  const extension = ext || typeExtensions[type] || 'bin';

  // 创建输出目录
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }

  const generator = generators[type];
  if (!generator) {
    throw new Error(`Unknown file type: ${type}. Supported types: ${Object.keys(generators).join(', ')}`);
  }

  const generatedFiles = [];

  for (let i = 0; i < count; i++) {
    const fileName = generateFileName(extension, sizeInBytes, i + 1);
    const filePath = path.join(output, fileName);

    generator(filePath, sizeInBytes);

    const actualSize = fs.statSync(filePath).size;
    generatedFiles.push({
      path: filePath,
      name: fileName,
      size: actualSize,
      formattedSize: formatSize(actualSize)
    });
  }

  return generatedFiles;
}

module.exports = {
  generateTestFiles,
  parseSize,
  formatSize,
  generateFileName
};
