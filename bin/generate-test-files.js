#!/usr/bin/env node

const { generateTestFiles } = require('../lib');

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: generate-test-files <options>');
    console.log('');
    console.log('Options:');
    console.log('  --type <type>      File type: text, binary, json, html, csv, xml, zero,');
    console.log('                     jpeg, png, gif, webp, bmp, mp4, avi, mov, mkv, webm');
    console.log('                     (default: binary)');
    console.log('  --ext <extension>  File extension (default: auto-detect from type)');
    console.log('  --size <size>      File size (e.g., 1KB, 5MB, 100GB) (required)');
    console.log('  --output <dir>     Output directory (default: current directory)');
    console.log('  --count <number>   Number of files to generate (default: 1)');
    console.log('');
    console.log('Examples:');
    console.log('  generate-test-files --size 1MB');
    console.log('  generate-test-files --type json --size 500KB');
    console.log('  generate-test-files --type jpeg --size 2MB');
    console.log('  generate-test-files --type mp4 --size 10MB');
    console.log('  generate-test-files --type text --ext txt --size 2MB --count 5');
    console.log('  generate-test-files --type binary --size 100MB --output ./uploads');
    return;
  }

  // 解析参数
  const params = {
    type: 'binary',
    ext: null,
    size: null,
    output: process.cwd(),
    count: 1
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--type':
        params.type = args[++i].toLowerCase();
        break;
      case '--ext':
        params.ext = args[++i];
        break;
      case '--size':
        params.size = args[++i];
        break;
      case '--output':
        params.output = args[++i];
        break;
      case '--count':
        params.count = parseInt(args[++i]);
        break;
      default:
        console.error(`Unknown option: ${args[i]}`);
        process.exit(1);
    }
  }

  try {
    const generatedFiles = generateTestFiles(params);
    
    console.log(`Generating ${params.count} file(s)...`);
    console.log(`Type: ${params.type}`);
    console.log(`Size: ${generatedFiles[0]?.formattedSize || params.size}`);
    console.log(`Output: ${require('path').resolve(params.output)}`);
    console.log('');
    
    generatedFiles.forEach(file => {
      console.log(`✓ Generated: ${file.name} (${file.formattedSize})`);
    });
    
    console.log('');
    console.log('Done!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// 运行主函数
main();
