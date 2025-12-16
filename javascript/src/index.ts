/**
 * CultureCoded SDK
 * 
 * Official JavaScript/TypeScript SDK for the CultureCoded Cultural UX Intelligence Platform.
 * Analyze designs for cultural adaptation and get AI-powered recommendations based on
 * 11 cross-cultural research frameworks.
 * 
 * @packageDocumentation
 * 
 * @example
 * ```typescript
 * import { CultureCoded } from '@culturecoded/sdk';
 * 
 * const cc = new CultureCoded({ 
 *   apiKey: process.env.CULTURECODED_API_KEY 
 * });
 * 
 * // Analyze a design
 * const analysis = await cc.analyzeDesign({
 *   imageUrl: 'https://example.com/landing-page.png',
 *   targetRegion: 'Africa',
 *   targetCountry: 'Nigeria',
 *   ethnicGroup: 'Yoruba',
 *   designType: 'landing_page',
 *   industry: 'fintech'
 * });
 * 
 * // Get recommendations
 * for (const rec of analysis.recommendations) {
 *   console.log(`${rec.category} (${rec.priority}): ${rec.suggestion}`);
 * }
 * 
 * // Export to Figma
 * const figmaExport = await cc.exportToFigma(analysis.id, 'your-figma-file-key');
 * ```
 */

export { CultureCoded } from './client';
export type {
  CultureCodedConfig,
  AnalyzeDesignOptions,
  Analysis,
  Recommendation,
  CulturalDimensions,
  ResearchSource,
  EthnicGroup,
  ExportOptions,
  ExportResult,
  User,
  UsageStats,
  RegionsResponse,
  ApiError,
} from './types';
