# Publishing Guide

This guide will help you publish the `generate-test-files` package to npm.

## Prerequisites

1. **Node.js account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **npm CLI**: Ensure you have npm installed (comes with Node.js)

## Steps to Publish

### 1. Update Package Information

Before publishing, update the following in `package.json`:

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/generate-test-files.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/generate-test-files/issues"
  },
  "homepage": "https://github.com/yourusername/generate-test-files#readme"
}
```

### 2. Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### 3. Verify Package Name

Check if the package name is available:

```bash
npm view generate-test-files
```

If you get a 404 error, the name is available. If not, you'll need to choose a different name or use a scoped package.

### 4. Test Locally

Before publishing, test the package locally:

```bash
npm link
```

This creates a symlink to your package, allowing you to test the CLI:

```bash
generate-test-files --help
generate-test-files --type jpeg --size 1MB
```

### 5. Check Package Contents

Verify what will be published:

```bash
npm pack --dry-run
```

This will show you the files that will be included in the package without actually creating it.

### 6. Create a Tarball (Optional)

To create a tarball for testing:

```bash
npm pack
```

This creates a `.tgz` file that you can test locally:

```bash
npm install ./generate-test-files-1.0.0.tgz
```

### 7. Publish to npm

Once you're ready, publish the package:

```bash
npm publish
```

For the first time, npm will ask you to confirm your email address.

### 8. Verify Publication

Check that your package is published:

```bash
npm view generate-test-files
```

Or visit [https://www.npmjs.com/package/generate-test-files](https://www.npmjs.com/package/generate-test-files)

## Publishing Updates

When you make changes to the package:

1. **Update version** in `package.json` (follow semantic versioning):
   - `1.0.0` → `1.0.1` (patch - bug fixes)
   - `1.0.0` → `1.1.0` (minor - new features)
   - `1.0.0` → `2.0.0` (major - breaking changes)

2. **Update CHANGELOG.md** with the changes

3. **Commit and push** your changes to git

4. **Publish** the new version:
   ```bash
   npm publish
   ```

## Scoped Packages

If you want to use a scoped package (e.g., `@username/generate-test-files`):

1. Update `package.json`:
   ```json
   {
     "name": "@username/generate-test-files"
   }
   ```

2. Publish:
   ```bash
   npm publish --access public
   ```

Note: Scoped packages are private by default, so you need to specify `--access public`.

## Unpublishing

If you need to unpublish a package (use with caution):

```bash
npm unpublish generate-test-files --force
```

**Warning**: You can only unpublish a package within 72 hours of publication. After that, you can only deprecate it.

## Best Practices

1. **Use semantic versioning**: Follow [SemVer](https://semver.org/) for version numbers
2. **Keep CHANGELOG.md updated**: Document all changes
3. **Test before publishing**: Always test locally first
4. **Use `.npmignore`**: Exclude unnecessary files from the package
5. **Add tags**: Use `npm publish --tag beta` for pre-release versions

## Troubleshooting

### "Package name already exists"

Choose a different name or use a scoped package.

### "403 Forbidden"

Make sure you're logged in and have permission to publish the package.

### "You do not have permission to publish this package"

The package name is already owned by another user. Choose a different name.

### Files not being included

Check your `.npmignore` file and ensure the files are listed in the `files` array in `package.json`.

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
