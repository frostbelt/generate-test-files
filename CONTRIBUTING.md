# Contributing to generate-test-files

Thank you for your interest in contributing to `generate-test-files`! This document provides guidelines and instructions for contributing to the project.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Environment information (Node.js version, OS, etc.)
- Any relevant screenshots or error messages

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear and descriptive title
- A detailed description of the enhancement
- Explain why this enhancement would be useful
- Provide examples or mockups if applicable

### Pull Requests

We welcome pull requests! Here's how to contribute:

1. **Fork the repository**
   - Click the "Fork" button on the GitHub repository

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/generate-test-files.git
   cd generate-test-files
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**
   ```bash
   npm link
   generate-test-files --type your-type --size 1MB
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for code style changes
   - `refactor:` for code refactoring
   - `test:` for adding or updating tests
   - `chore:` for maintenance tasks

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit the PR

## Development Setup

### Prerequisites

- Node.js >= 12.0.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/generate-test-files.git
cd generate-test-files

# Install dependencies
npm install

# Link the package locally
npm link
```

### Project Structure

```
generate-test-files/
├── bin/                    # CLI executable
│   └── generate-test-files.js
├── lib/                    # Library code
│   ├── index.js           # Main library
│   └── generators.js      # File generators
├── test/                   # Test files
│   └── index.test.js
├── .gitignore             # Git ignore file
├── .npmignore             # npm ignore file
├── CHANGELOG.md           # Changelog
├── LICENSE                # MIT License
├── package.json           # Package configuration
├── PUBLISHING.md          # Publishing guide
├── README.md              # Main documentation
└── CONTRIBUTING.md        # This file
```

### Adding New File Types

To add support for a new file type:

1. **Add the generator function** in `lib/generators.js`:
   ```javascript
   function generateYourFile(filePath, size) {
     // Your implementation
   }
   ```

2. **Export the generator**:
   ```javascript
   module.exports = {
     // ... existing generators
     'yourtype': generateYourFile
   };
   ```

3. **Add the type extension** in `lib/index.js`:
   ```javascript
   const typeExtensions = {
     // ... existing types
     'yourtype': 'ext'
   };
   ```

4. **Update documentation** in `README.md`:
   - Add the new type to the supported file types list
   - Add usage examples

5. **Test the new type**:
   ```bash
   generate-test-files --type yourtype --size 1MB
   ```

### Code Style Guidelines

- Use 2 spaces for indentation
- Use single quotes for strings
- Add JSDoc comments for functions
- Keep functions focused and small
- Follow existing code patterns

### Testing

Before submitting a PR, ensure:

- All existing functionality still works
- New features are tested
- Code follows the project's style guidelines
- Documentation is updated

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

Examples of unacceptable behavior:

- Harassment or discriminatory language
- Personal attacks or insults
- Public or private harassment
- Publishing others' private information without permission

### Our Responsibilities

Project maintainers are responsible for clarifying standards of acceptable behavior and will take appropriate and fair corrective action in response to any instances of unacceptable behavior.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community.

## Getting Help

If you need help:

- Check the [README.md](README.md) for usage instructions
- Search existing [issues](https://github.com/yourusername/generate-test-files/issues)
- Create a new issue with your question
- Join our community discussions

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Acknowledgments

Thank you to all contributors who have helped make `generate-test-files` better!
