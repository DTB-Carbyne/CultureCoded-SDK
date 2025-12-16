# @culturecoded/sdk

Official JavaScript/TypeScript SDK for the CultureCoded Cultural UX Intelligence Platform.

Analyze designs for cultural adaptation and get AI-powered recommendations based on 11 cross-cultural research frameworks from researchers worldwide.

## Installation

```bash
npm install @culturecoded/sdk
# or
yarn add @culturecoded/sdk
# or
pnpm add @culturecoded/sdk
```

## Getting Started

### 1. Create an Account

Sign up for a CultureCoded account at [culturecoded.io](https://culturecoded.io) to get access to the platform.

### 2. Get Your API Key

1. Log in to your [CultureCoded Dashboard](https://culturecoded.io)
2. Navigate to **Settings** > **API Keys**
3. Click **Generate New API Key**
4. Copy your API key (starts with `cc_live_`)

> **Important:** Keep your API key secure. Never commit it to version control or expose it in client-side code.

### 3. Set Up Your Environment

We recommend storing your API key as an environment variable:

```bash
# .env file (add to .gitignore!)
CULTURECODED_API_KEY=cc_live_your_api_key_here
```

For different environments:
- **Node.js**: Use `dotenv` or your preferred env management
- **Next.js**: Add to `.env.local`
- **Vercel/Netlify**: Add via dashboard environment variables

### 4. Initialize the SDK

```typescript
import { CultureCoded } from '@culturecoded/sdk';

const cc = new CultureCoded({ 
  apiKey: process.env.CULTURECODED_API_KEY 
});
```

## Quick Start

```typescript
import { CultureCoded } from '@culturecoded/sdk';

const cc = new CultureCoded({ 
  apiKey: process.env.CULTURECODED_API_KEY 
});

// Analyze a design for cultural adaptation
const analysis = await cc.analyzeDesign({
  imageUrl: 'https://example.com/landing-page.png',
  targetRegion: 'Africa',
  targetCountry: 'Nigeria',
  ethnicGroup: 'Yoruba', // Optional: target specific cultural community
  designType: 'landing_page',
  industry: 'fintech'
});

// Get recommendations
for (const rec of analysis.recommendations) {
  console.log(`${rec.category} (${rec.priority}): ${rec.suggestion}`);
}
```

## Pricing & Credits

CultureCoded uses a credit-based system:

| Tier | Credits/Month | Price |
|------|---------------|-------|
| Starter | 50 | Free |
| Professional | 500 | $29/month |
| Enterprise | Unlimited | Custom |

Each design analysis costs credits based on complexity. Check your remaining credits:

```typescript
const user = await cc.getUser();
console.log(`Credits remaining: ${user.credits}`);
```

## API Reference

### Initialization

```typescript
const cc = new CultureCoded({
  apiKey: 'your-api-key', // Required
  baseUrl: 'https://culturecoded.replit.app' // Optional, defaults to production
});
```

### Cultural Analysis

#### `analyzeDesign(options)`

Analyze a design for cultural adaptation recommendations.

```typescript
const analysis = await cc.analyzeDesign({
  imageUrl: 'https://example.com/design.png',
  // or imageBase64: 'base64-encoded-image-data',
  targetRegion: 'Africa',
  targetCountry: 'Nigeria',
  ethnicGroup: 'Yoruba', // Optional
  designType: 'landing_page',
  industry: 'fintech' // Optional
});
```

**Design Types:** `landing_page`, `mobile_app`, `dashboard`, `ecommerce`, `social_media`, `email`, `advertisement`, `other`

**Regions:** `Africa`, `Asia-Pacific`, `Europe`, `Latin America`, `Middle East`, `North America`

#### `getAnalyses()`

Get all analyses for the authenticated user.

```typescript
const analyses = await cc.getAnalyses();
```

#### `getAnalysis(id)`

Get a specific analysis by ID.

```typescript
const analysis = await cc.getAnalysis('analysis-id');
```

### Cultural Communities

#### `getEthnicGroups(country)`

Get available cultural communities for more targeted analysis.

```typescript
const groups = await cc.getEthnicGroups('Nigeria');
// [
//   { name: 'Yoruba', culturalDimensions: {...} },
//   { name: 'Igbo', culturalDimensions: {...} },
//   { name: 'Hausa-Fulani', culturalDimensions: {...} }
// ]
```

#### `getRegions()`

Get all available regions and countries.

```typescript
const regions = await cc.getRegions();
// { Africa: ['Nigeria', 'Kenya', ...], 'Asia-Pacific': [...], ... }
```

### Export & Integrations

#### `exportAnalysis(options)`

Export an analysis in various formats.

```typescript
// Export to PDF
const pdfExport = await cc.exportAnalysis({
  analysisId: 'abc123',
  format: 'pdf'
});
console.log(pdfExport.downloadUrl);

// Export to Figma
const figmaExport = await cc.exportAnalysis({
  analysisId: 'abc123',
  format: 'figma',
  figmaFileKey: 'your-figma-file-key'
});
```

#### `exportToFigma(analysisId, figmaFileKey)`

Shorthand for Figma export.

```typescript
const figmaExport = await cc.exportToFigma('analysis-id', 'figma-file-key');
```

### User & Credits

#### `getUser()`

Get current user profile including credits and tier.

```typescript
const user = await cc.getUser();
console.log(`Credits remaining: ${user.credits}`);
console.log(`Tier: ${user.tier}`);
```

#### `getUsage()`

Get API usage statistics.

```typescript
const usage = await cc.getUsage();
console.log(`Analyses this month: ${usage.analysesThisMonth}`);
```

## TypeScript Support

This SDK is written in TypeScript and provides full type definitions. All types are exported:

```typescript
import type { 
  Analysis, 
  Recommendation, 
  EthnicGroup,
  CulturalDimensions,
  DesignType,
  Region
} from '@culturecoded/sdk';
```

## Error Handling

The SDK throws typed errors for different scenarios:

```typescript
import { CultureCoded, CultureCodedError } from '@culturecoded/sdk';

try {
  const analysis = await cc.analyzeDesign({ ... });
} catch (error) {
  if (error instanceof CultureCodedError) {
    switch (error.status) {
      case 401:
        console.error('Invalid API key');
        break;
      case 402:
        console.error('Insufficient credits - upgrade your plan');
        break;
      case 429:
        console.error('Rate limit exceeded - slow down requests');
        break;
      default:
        console.error('Error:', error.message);
    }
  }
}
```

## Examples

### Batch Analysis

```typescript
const designs = [
  { url: 'https://example.com/landing.png', type: 'landing_page' },
  { url: 'https://example.com/checkout.png', type: 'ecommerce' },
];

const analyses = await Promise.all(
  designs.map(d => cc.analyzeDesign({
    imageUrl: d.url,
    designType: d.type,
    targetRegion: 'Africa',
    targetCountry: 'Nigeria'
  }))
);
```

### Using with Next.js API Routes

```typescript
// pages/api/analyze.ts
import { CultureCoded } from '@culturecoded/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const cc = new CultureCoded({ 
  apiKey: process.env.CULTURECODED_API_KEY! 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl, targetCountry } = req.body;
  
  const analysis = await cc.analyzeDesign({
    imageUrl,
    targetRegion: 'Africa',
    targetCountry,
    designType: 'landing_page'
  });
  
  res.json(analysis);
}
```

## Research Frameworks

CultureCoded's AI analysis incorporates 11 cross-cultural HCI research frameworks:

### Western Foundational
- **Hofstede's Cultural Dimensions** (Netherlands)
- **Hall's Context Theory** (USA)
- **Trompenaars' 7 Dimensions** (Netherlands/UK)
- **Lewis Model** (UK)
- **Marcus User-Centered Design** (USA)

### East Asian HCI
- **Rau's Cross-Cultural Framework** (China)
- **Nisbett's Holistic-Analytic Cognition** (East-West)

### Global South HCI
- **Sun's Discursive Affordances** (China/USA)
- **Rajamanickam's Information Design** (India)
- **Bidwell's Afro-centric HCI** (South Africa)
- **Moalosi's Ubuntu Design Philosophy** (Botswana)

## Support

- **Documentation:** [culturecoded.io/api-docs](https://culturecoded.io/api-docs)
- **Dashboard:** [culturecoded.io](https://culturecoded.io)
- **Figma Plugin:** [Figma Community](https://www.figma.com/community/plugin/culturecoded)
- **Email:** support@culturecoded.io
- **GitHub Issues:** [Report bugs](https://github.com/culturecoded/sdk-js/issues)

## License

MIT
