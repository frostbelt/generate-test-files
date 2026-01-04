# generate-test-files

A powerful CLI tool for generating test files of various types and sizes. Perfect for testing file uploads, storage systems, or any scenario where you need test files quickly.

## Features

- 📁 **Multiple File Types**: Support for text, binary, JSON, HTML, CSV, XML, and zero-filled files
- 🖼️ **Image Files**: Generate JPEG, PNG, GIF, WebP, and BMP images
- 🎬 **Video Files**: Generate MP4, AVI, MOV, MKV, and WebM videos
- 📏 **Flexible Sizing**: Specify file sizes in B, KB, MB, GB, or TB
- 🔢 **Batch Generation**: Generate multiple files at once with automatic numbering
- 🎯 **Custom Output**: Specify output directory or use current directory
- ⚡ **Fast Generation**: Efficient file generation using Node.js streams
- 🏷️ **Smart Naming**: Automatic timestamp-based file naming with sequence numbers

## Installation

### Global Installation

```bash
npm install -g generate-test-files
```

### Local Installation

```bash
npm install generate-test-files
```

## Usage

### Command Line Interface

```bash
generate-test-files --size <size> [options]
```

#### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--type` | File type | `binary` |
| `--ext` | File extension | Auto-detected from type |
| `--size` | File size (required) | - |
| `--output` | Output directory | Current directory |
| `--count` | Number of files to generate | `1` |

#### Supported File Types

**Text and Code Files:**
- `text`, `txt` - Plain text files
- `json` - JSON data files
- `html` - HTML documents
- `csv` - CSV data files
- `xml` - XML documents

**Binary Files:**
- `binary` - Random binary data
- `zero` - Zero-filled files (for testing large file uploads)

**Image Files:**
- `jpeg` - JPEG images
- `png` - PNG images
- `gif` - GIF images
- `webp` - WebP images
- `bmp` - BMP images

**Video Files:**
- `mp4` - MP4 videos
- `avi` - AVI videos
- `mov` - MOV videos
- `mkv` - MKV videos
- `webm` - WebM videos

#### Size Format

Supported size formats:
- `B` - Bytes (e.g., `100B`)
- `KB` - Kilobytes (e.g., `500KB`)
- `MB` - Megabytes (e.g., `2MB`)
- `GB` - Gigabytes (e.g., `1GB`)
- `TB` - Terabytes (e.g., `100TB`)

### Examples

#### Generate a single binary file

```bash
generate-test-files --size 1MB
```

#### Generate JSON files

```bash
generate-test-files --type json --size 500KB
```

#### Generate image files

```bash
# Generate JPEG image
generate-test-files --type jpeg --size 2MB

# Generate PNG image
generate-test-files --type png --size 1MB

# Generate GIF image
generate-test-files --type gif --size 500KB
```

#### Generate video files

```bash
# Generate MP4 video
generate-test-files --type mp4 --size 10MB

# Generate AVI video
generate-test-files --type avi --size 5MB
```

#### Generate multiple files

```bash
# Generate 5 text files
generate-test-files --type text --size 2MB --count 5

# Generate 3 JPEG images
generate-test-files --type jpeg --size 1MB --count 3
```

#### Specify output directory

```bash
generate-test-files --type binary --size 100MB --output ./uploads
```

#### Custom file extension

```bash
generate-test-files --type text --ext txt --size 2MB --count 5
```

#### Generate multiple different types

```bash
# Generate a set of test files
generate-test-files --type jpeg --size 2MB --count 2
generate-test-files --type png --size 1MB --count 2
generate-test-files --type json --size 500KB --count 2
generate-test-files --type mp4 --size 5MB --count 1
```

## Programmatic Usage

You can also use this package as a library in your Node.js projects:

```javascript
const { generateTestFiles } = require('generate-test-files');

// Generate a single file
const files = generateTestFiles({
  type: 'json',
  size: '1MB',
  output: './test-files'
});

console.log('Generated files:', files);

// Generate multiple files
const multipleFiles = generateTestFiles({
  type: 'jpeg',
  size: '2MB',
  count: 5,
  output: './images'
});

console.log(`Generated ${multipleFiles.length} files`);
```

### API

#### `generateTestFiles(options)`

Generate test files based on the provided options.

**Parameters:**
- `options.type` (string): File type (default: `'binary'`)
- `options.ext` (string): File extension (optional, auto-detected from type)
- `options.size` (string): File size (required, e.g., `'1MB'`, `'500KB'`)
- `options.output` (string): Output directory (default: current directory)
- `options.count` (number): Number of files to generate (default: `1`)

**Returns:**
- Array of objects with file information:
  ```javascript
  [
    {
      path: '/path/to/file.jpg',
      name: '10-30-15_2_00MB_1.jpg',
      size: 2097152,
      formattedSize: '2.00MB'
    }
  ]
  ```

## File Naming Convention

Generated files follow this naming pattern:

```
时-分-秒_大小_序号.扩展名
```

Examples:
- `10-30-15_2_00MB_1.jpg` - 2MB JPEG image file
- `10-30-20_1_00MB_2.png` - 1MB PNG image file
- `10-30-25_500_00KB_1.json` - 500KB JSON file

**Naming Rules:**
1. **Timezone**: China timezone (UTC+8)
2. **Time**: Only hours, minutes, and seconds (format: HH-MM-SS)
3. **Size**: File size with decimal point replaced by underscore
4. **Index**: Automatic numbering for batch generation (starting from 1) to avoid file overwrites

## Use Cases

- **Testing File Uploads**: Generate test files of various sizes to test upload functionality
- **Storage Testing**: Test storage systems with files of different types and sizes
- **Performance Testing**: Generate large files to test system performance
- **Development**: Quickly create test data for development and testing
- **CI/CD**: Integrate into automated testing pipelines

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
