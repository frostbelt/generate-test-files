# 测试文件生成器

这是一个 Node.js 脚本，用于生成各种测试上传用的文件。支持指定文件类型、扩展名和大小，每次生成的文件以时间为文件名（精确到秒），文件名中携带文件大小信息。

## 功能特性

- ✅ 支持多种文件类型（文本、二进制、JSON、HTML、CSV、XML、零填充）
- ✅ 支持常见图片格式（JPEG、PNG、GIF、WebP、BMP）
- ✅ 支持常见视频格式（MP4、AVI、MOV、MKV、WebM）
- ✅ 可指定文件扩展名
- ✅ 精确控制文件大小（支持 B、KB、MB、GB、TB）
- ✅ 自动生成带时间戳的文件名（精确到秒）
- ✅ 文件名包含大小信息
- ✅ 支持批量生成多个文件
- ✅ 默认在当前目录生成文件
- ✅ 可自定义输出目录

## 使用方法

### 基本语法

```bash
node generate-test-files.js [options]
```

### 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--type <type>` | 文件类型：text, binary, json, html, csv, xml, zero, jpeg, png, gif, webp, bmp, mp4, avi, mov, mkv, webm | binary |
| `--ext <extension>` | 文件扩展名 | 自动根据类型检测 |
| `--size <size>` | 文件大小（如 1KB, 5MB, 100GB） | **必填** |
| `--output <dir>` | 输出目录 | 当前目录 |
| `--count <number>` | 生成文件数量 | 1 |

### 文件类型说明

**文本和代码文件：**
- **text**: 文本文件（默认扩展名 .txt）
- **json**: JSON 数据文件（默认扩展名 .json）
- **html**: HTML 网页文件（默认扩展名 .html）
- **csv**: CSV 数据文件（默认扩展名 .csv）
- **xml**: XML 数据文件（默认扩展名 .xml）

**二进制文件：**
- **binary**: 随机二进制文件（默认扩展名 .bin）
- **zero**: 零填充文件（用于测试大文件上传，默认扩展名 .dat）

**图片文件：**
- **jpeg**: JPEG 图片文件（默认扩展名 .jpg）
- **png**: PNG 图片文件（默认扩展名 .png）
- **gif**: GIF 图片文件（默认扩展名 .gif）
- **webp**: WebP 图片文件（默认扩展名 .webp）
- **bmp**: BMP 图片文件（默认扩展名 .bmp）

**视频文件：**
- **mp4**: MP4 视频文件（默认扩展名 .mp4）
- **avi**: AVI 视频文件（默认扩展名 .avi）
- **mov**: MOV 视频文件（默认扩展名 .mov）
- **mkv**: MKV 视频文件（默认扩展名 .mkv）
- **webm**: WebM 视频文件（默认扩展名 .webm）

## 使用示例

### 1. 生成 1MB 的二进制文件
```bash
node generate-test-files.js --size 1MB
```

### 2. 生成 500KB 的 JSON 文件
```bash
node generate-test-files.js --type json --size 500KB
```

### 3. 生成 5 个 2MB 的文本文件
```bash
node generate-test-files.js --type text --size 2MB --count 5
```

### 4. 生成 100MB 的零填充文件（用于大文件测试）
```bash
node generate-test-files.js --type zero --size 100MB
```

### 5. 生成自定义扩展名的文件
```bash
node generate-test-files.js --type text --ext log --size 1MB
```

### 6. 指定输出目录
```bash
node generate-test-files.js --type binary --size 50MB --output ./uploads
```

### 7. 生成图片文件
```bash
# 生成 JPEG 图片
node generate-test-files.js --type jpeg --size 2MB

# 生成 PNG 图片
node generate-test-files.js --type png --size 1MB

# 生成 GIF 图片
node generate-test-files.js --type gif --size 500KB

# 生成 WebP 图片
node generate-test-files.js --type webp --size 1MB

# 生成 BMP 图片
node generate-test-files.js --type bmp --size 2MB
```

### 8. 生成视频文件
```bash
# 生成 MP4 视频
node generate-test-files.js --type mp4 --size 10MB

# 生成 AVI 视频
node generate-test-files.js --type avi --size 5MB

# 生成 MOV 视频
node generate-test-files.js --type mov --size 15MB

# 生成 MKV 视频
node generate-test-files.js --type mkv --size 20MB

# 生成 WebM 视频
node generate-test-files.js --type webm --size 8MB
```

### 9. 生成多个不同类型的文件
```bash
# 生成 JSON 文件
node generate-test-files.js --type json --size 1MB

# 生成 CSV 文件
node generate-test-files.js --type csv --size 500KB

# 生成 HTML 文件
node generate-test-files.js --type html --size 2MB

# 生成 JPEG 图片
node generate-test-files.js --type jpeg --size 1MB

# 生成 MP4 视频
node generate-test-files.js --type mp4 --size 5MB
```

## 文件命名规则

生成的文件名格式为：
```
时-分-秒_大小_序号.扩展名
```

示例：
- `10-57-02_2_00MB_1.jpg`
- `10-57-06_1_00MB_1.png`
- `10-57-06_500_00KB_1.json`

**说明：**
- 时间使用中国时区（UTC+8）
- 只包含时分秒，不包含日期
- 大小格式化后的小数点替换为下划线
- 序号：批量生成时自动添加序号（从1开始），避免文件覆盖

## 大小格式支持

支持以下大小单位：
- `B` - 字节
- `KB` - 千字节
- `MB` - 兆字节
- `GB` - 吉字节
- `TB` - 太字节

示例：
- `100B` - 100 字节
- `1KB` - 1 千字节
- `5MB` - 5 兆字节
- `2GB` - 2 吉字节

## 输出示例

```
Generating 3 file(s)...
Type: json
Size: 1MB
Output: /Users/xxx/test-files

✓ Generated: 2024-01-15_14-30-25_1MB.json (1MB)
✓ Generated: 2024-01-15_14-30-26_1MB.json (1MB)
✓ Generated: 2024-01-15_14-30-27_1MB.json (1MB)

Done!
```

## 常见用例

### 测试小文件上传
```bash
node generate-test-files.js --type json --size 10KB --count 10
```

### 测试中等文件上传
```bash
node generate-test-files.js --type binary --size 5MB --count 3
```

### 测试大文件上传
```bash
node generate-test-files.js --type zero --size 500MB
```

### 测试超大文件上传
```bash
node generate-test-files.js --type zero --size 2GB
```

### 生成各种类型的测试文件
```bash
# 文本文件
node generate-test-files.js --type text --size 1MB

# JSON 文件
node generate-test-files.js --type json --size 500KB

# CSV 文件
node generate-test-files.js --type csv --size 2MB

# HTML 文件
node generate-test-files.js --type html --size 1MB

# XML 文件
node generate-test-files.js --type xml --size 500KB
```

## 注意事项

1. 生成超大文件（如 GB 级别）可能需要较长时间和足够的磁盘空间
2. 二进制文件使用随机数据生成，每次生成的文件内容都不同
3. 零填充文件适合测试大文件上传性能，因为生成速度快
4. 默认输出目录为 `./test-files`，如果不存在会自动创建

## 系统要求

- Node.js 12.0 或更高版本
- 无需额外依赖，使用 Node.js 内置模块

## 许可证

MIT
