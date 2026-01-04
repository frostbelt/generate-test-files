const { generateTestFiles, parseSize, formatSize, generateFileName } = require('../lib');
const fs = require('fs');
const path = require('path');

describe('generate-test-files', () => {
  const testDir = path.join(__dirname, 'temp-test-files');
  
  beforeEach(() => {
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });
  
  afterEach(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });
  
  describe('parseSize', () => {
    test('should parse bytes', () => {
      expect(parseSize('100B')).toBe(100);
    });
    
    test('should parse kilobytes', () => {
      expect(parseSize('1KB')).toBe(1024);
      expect(parseSize('500KB')).toBe(512000);
    });
    
    test('should parse megabytes', () => {
      expect(parseSize('1MB')).toBe(1048576);
      expect(parseSize('2MB')).toBe(2097152);
    });
    
    test('should parse gigabytes', () => {
      expect(parseSize('1GB')).toBe(1073741824);
    });
    
    test('should parse terabytes', () => {
      expect(parseSize('1TB')).toBe(1099511627776);
    });
    
    test('should handle decimal values', () => {
      expect(parseSize('1.5MB')).toBe(1572864);
    });
  });
  
  describe('formatSize', () => {
    test('should format bytes', () => {
      expect(formatSize(100)).toBe('100B');
    });
    
    test('should format kilobytes', () => {
      expect(formatSize(1024)).toBe('1.00KB');
      expect(formatSize(512000)).toBe('500.00KB');
    });
    
    test('should format megabytes', () => {
      expect(formatSize(1048576)).toBe('1.00MB');
      expect(formatSize(2097152)).toBe('2.00MB');
    });
    
    test('should format gigabytes', () => {
      expect(formatSize(1073741824)).toBe('1.00GB');
    });
  });
  
  describe('generateFileName', () => {
    test('should generate filename with correct format', () => {
      const fileName = generateFileName('jpg', 2097152, 1);
      expect(fileName).toMatch(/^\d{2}-\d{2}-\d{2}_\d+_\d+KB_\d+\.jpg$/);
    });
    
    test('should include index in filename', () => {
      const fileName1 = generateFileName('jpg', 2097152, 1);
      const fileName2 = generateFileName('jpg', 2097152, 2);
      expect(fileName1).toMatch(/_1\.jpg$/);
      expect(fileName2).toMatch(/_2\.jpg$/);
    });
  });
  
  describe('generateTestFiles', () => {
    test('should generate a single binary file', () => {
      const files = generateTestFiles({
        type: 'binary',
        size: '1KB',
        output: testDir
      });
      
      expect(files).toHaveLength(1);
      expect(files[0].name).toMatch(/_1\.bin$/);
      expect(files[0].size).toBe(1024);
      expect(fs.existsSync(files[0].path)).toBe(true);
    });
    
    test('should generate multiple files', () => {
      const files = generateTestFiles({
        type: 'text',
        size: '1KB',
        count: 3,
        output: testDir
      });
      
      expect(files).toHaveLength(3);
      files.forEach((file, index) => {
        expect(file.name).toMatch(/_${index + 1}\.txt$/);
        expect(fs.existsSync(file.path)).toBe(true);
      });
    });
    
    test('should generate JSON files', () => {
      const files = generateTestFiles({
        type: 'json',
        size: '1KB',
        output: testDir
      });
      
      expect(files).toHaveLength(1);
      const content = fs.readFileSync(files[0].path, 'utf8');
      expect(() => JSON.parse(content)).not.toThrow();
    });
    
    test('should generate image files', () => {
      const types = ['jpeg', 'png', 'gif'];
      
      types.forEach(type => {
        const files = generateTestFiles({
          type: type,
          size: '1KB',
          output: testDir
        });
        
        expect(files).toHaveLength(1);
        expect(fs.existsSync(files[0].path)).toBe(true);
      });
    });
    
    test('should generate video files', () => {
      const types = ['mp4', 'avi', 'mov'];
      
      types.forEach(type => {
        const files = generateTestFiles({
          type: type,
          size: '1KB',
          output: testDir
        });
        
        expect(files).toHaveLength(1);
        expect(fs.existsSync(files[0].path)).toBe(true);
      });
    });
    
    test('should throw error for invalid size', () => {
      expect(() => {
        generateTestFiles({
          type: 'binary',
          size: 'invalid',
          output: testDir
        });
      }).toThrow();
    });
    
    test('should throw error for unknown file type', () => {
      expect(() => {
        generateTestFiles({
          type: 'unknown',
          size: '1KB',
          output: testDir
        });
      }).toThrow();
    });
  });
});
