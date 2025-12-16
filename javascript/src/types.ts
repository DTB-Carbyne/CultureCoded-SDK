/**
 * CultureCoded SDK Types
 */

export interface CultureCodedConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface AnalyzeDesignOptions {
  /** URL of the design image to analyze */
  imageUrl?: string;
  /** Base64-encoded image data */
  imageBase64?: string;
  /** Target region (e.g., "Africa", "Asia-Pacific", "Europe") */
  targetRegion: string;
  /** Target country within the region */
  targetCountry: string;
  /** Optional ethnic group for more targeted analysis */
  ethnicGroup?: string;
  /** Type of design being analyzed */
  designType: 'landing_page' | 'mobile_app' | 'dashboard' | 'ecommerce' | 'social_media' | 'email' | 'advertisement' | 'other';
  /** Industry context */
  industry?: string;
  /** Additional context or notes */
  additionalContext?: string;
}

export interface Recommendation {
  category: string;
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  culturalRationale?: string;
  researchFramework?: string;
}

export interface CulturalDimensions {
  powerDistance?: number;
  individualism?: number;
  masculinity?: number;
  uncertaintyAvoidance?: number;
  longTermOrientation?: number;
  indulgence?: number;
  contextStyle?: 'high' | 'low';
}

export interface ResearchSource {
  framework: string;
  author: string;
  region?: string;
  year?: number;
}

export interface Analysis {
  id: string;
  userId: string;
  targetRegion: string;
  targetCountry: string;
  ethnicGroup?: string;
  designType: string;
  industry?: string;
  recommendations: Recommendation[];
  culturalDimensions?: CulturalDimensions;
  researchSources?: ResearchSource[];
  createdAt: string;
}

export interface EthnicGroup {
  id: number;
  name: string;
  country: string;
  culturalDimensions?: CulturalDimensions;
  designConsiderations?: string[];
}

export interface ExportOptions {
  analysisId: string;
  format: 'pdf' | 'csv' | 'figma';
  figmaFileKey?: string;
}

export interface ExportResult {
  id?: string;
  format: string;
  downloadUrl?: string;
  figmaData?: object;
  creditCost: number;
  success?: boolean;
  analysisId?: string;
  exportedAt?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  credits: number;
  tier: 'starter' | 'professional' | 'enterprise';
}

export interface UsageStats {
  analysesThisMonth: number;
  creditsUsed: number;
  creditsRemaining: number;
}

export interface RegionsResponse {
  [region: string]: string[];
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
