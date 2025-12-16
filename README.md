# CultureCoded SDK

Official SDKs for the CultureCoded Cultural UX Intelligence Platform.

Analyze designs for cultural adaptation and get AI-powered recommendations based on 11 cross-cultural research frameworks from researchers worldwide.

## Available SDKs

| SDK | Package | Version |
|-----|---------|---------|
| **JavaScript/TypeScript** | [@culturecoded/sdk](https://www.npmjs.com/package/@culturecoded/sdk) | [![npm](https://img.shields.io/npm/v/@culturecoded/sdk)](https://www.npmjs.com/package/@culturecoded/sdk) |
| **Python** | [culturecoded](https://pypi.org/project/culturecoded/) | [![PyPI](https://img.shields.io/pypi/v/culturecoded)](https://pypi.org/project/culturecoded/) |

## Quick Start

### JavaScript/TypeScript

```bash
npm install @culturecoded/sdk
```

```typescript
import { CultureCoded } from '@culturecoded/sdk';

const cc = new CultureCoded({ apiKey: process.env.CULTURECODED_API_KEY });

const analysis = await cc.analyzeDesign({
  imageUrl: 'https://example.com/design.png',
  targetRegion: 'Africa',
  targetCountry: 'Nigeria',
  designType: 'landing_page'
});
```

### Python

```bash
pip install culturecoded
```

```python
from culturecoded import CultureCoded

cc = CultureCoded(api_key=os.environ["CULTURECODED_API_KEY"])

analysis = cc.analyze_design(
    image_url="https://example.com/design.png",
    target_region="Africa",
    target_country="Nigeria",
    design_type="landing_page"
)
```

## Documentation

- **JavaScript SDK:** [sdk/javascript/README.md](sdk/javascript/README.md)
- **Python SDK:** [sdk/python/README.md](sdk/python/README.md)
- **API Documentation:** [culturecoded.io/api-docs](https://culturecoded.io/api-docs)

## Getting Your API Key

1. Sign up at [culturecoded.io](https://culturecoded.io)
2. Navigate to **Settings** > **API Keys**
3. Generate a new API key

## Research Frameworks

CultureCoded's AI analysis incorporates 11 cross-cultural HCI research frameworks:

- Hofstede's Cultural Dimensions
- Hall's Context Theory
- Trompenaars' 7 Dimensions
- Lewis Model
- Marcus User-Centered Design
- Rau's Cross-Cultural Framework
- Nisbett's Holistic-Analytic Cognition
- Sun's Discursive Affordances
- Rajamanickam's Information Design
- Bidwell's Afro-centric HCI
- Moalosi's Ubuntu Design Philosophy

## License

MIT

## Links

- [Website](https://culturecoded.io)
- [Figma Plugin](https://www.figma.com/community/plugin/culturecoded)
- [Support](mailto:support@culturecoded.io)
