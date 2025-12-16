# Publishing CultureCoded SDKs

This guide walks you through publishing the JavaScript and Python SDKs to npm and PyPI.

## Prerequisites

### For npm (JavaScript SDK)
1. Create an npm account at https://www.npmjs.com/signup
2. Verify your email address
3. Set up 2FA (recommended for security)

### For PyPI (Python SDK)
1. Create a PyPI account at https://pypi.org/account/register/
2. Verify your email address
3. Set up 2FA (recommended for security)
4. Create an API token at https://pypi.org/manage/account/token/

---

## Publishing the JavaScript SDK

### 1. Navigate to the SDK directory
```bash
cd sdk/javascript
```

### 2. Install dependencies
```bash
npm install
```

### 3. Build the package
```bash
npm run build
```

This creates the `dist/` folder with compiled JavaScript, ES modules, and TypeScript definitions.

### 4. Login to npm
```bash
npm login
```
Enter your npm username, password, and email. If you have 2FA enabled, you'll also enter an OTP.

### 5. Publish the package
```bash
npm publish --access public
```

Note: The `--access public` flag is required for scoped packages like `@culturecoded/sdk`.

### 6. Verify publication
Visit https://www.npmjs.com/package/@culturecoded/sdk to confirm your package is live.

### Updating the package
1. Update the version in `package.json`
2. Run `npm run build`
3. Run `npm publish`

---

## Publishing the Python SDK

### 1. Navigate to the SDK directory
```bash
cd sdk/python
```

### 2. Install build tools
```bash
pip install build twine
```

### 3. Build the package
```bash
python -m build
```

This creates the `dist/` folder with `.whl` and `.tar.gz` files.

### 4. Upload to PyPI
```bash
python -m twine upload dist/*
```

You'll be prompted for your PyPI username and password. 
- For username, use `__token__`
- For password, use your API token (starts with `pypi-`)

### 5. Verify publication
Visit https://pypi.org/project/culturecoded/ to confirm your package is live.

### Updating the package
1. Update the version in `pyproject.toml` and `culturecoded/__init__.py`
2. Remove old builds: `rm -rf dist/`
3. Rebuild: `python -m build`
4. Upload: `python -m twine upload dist/*`

---

## Version Numbering

Follow semantic versioning (SemVer):
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backwards compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backwards compatible

---

## Testing Before Publishing

### JavaScript
```bash
cd sdk/javascript
npm run build
npm pack  # Creates a .tgz file you can install locally to test
```

### Python
```bash
cd sdk/python
pip install -e .  # Install in editable mode for local testing
```

---

## Required: Update API Base URL

Before publishing, update the base URL in both SDKs to point to your production API:

### JavaScript (`sdk/javascript/src/client.ts`)
```typescript
this.baseUrl = config.baseUrl || 'https://YOUR-PRODUCTION-URL.replit.app';
```

### Python (`sdk/python/culturecoded/client.py`)
```python
base_url: str = "https://YOUR-PRODUCTION-URL.replit.app",
```

---

## Scoped Package Name

The JavaScript SDK uses `@culturecoded/sdk` which is a scoped package. To publish scoped packages:

1. You need to create an npm organization named "culturecoded"
   - Go to https://www.npmjs.com/org/create
   - Organization name: `culturecoded`

2. Or rename the package to an unscoped name in `package.json`:
   ```json
   "name": "culturecoded-sdk"
   ```

---

## Automated Publishing (Optional)

For CI/CD publishing, you can use GitHub Actions:

### npm (`.github/workflows/npm-publish.yml`)
```yaml
name: Publish to npm
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: cd sdk/javascript && npm ci
      - run: cd sdk/javascript && npm run build
      - run: cd sdk/javascript && npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### PyPI (`.github/workflows/pypi-publish.yml`)
```yaml
name: Publish to PyPI
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install build twine
      - run: cd sdk/python && python -m build
      - run: cd sdk/python && python -m twine upload dist/*
        env:
          TWINE_USERNAME: __token__
          TWINE_PASSWORD: ${{ secrets.PYPI_TOKEN }}
```

---

## Questions?

If you run into issues:
1. Check that your package name isn't already taken
2. Verify your authentication credentials
3. Make sure all required files are included in the package
