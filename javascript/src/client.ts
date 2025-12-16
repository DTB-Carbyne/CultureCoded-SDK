import type {
  CultureCodedConfig,
  AnalyzeDesignOptions,
  Analysis,
  EthnicGroup,
  ExportOptions,
  ExportResult,
  User,
  UsageStats,
  RegionsResponse,
  ApiError,
} from './types';

/**
 * CultureCoded API Client
 * 
 * Official JavaScript/TypeScript SDK for the CultureCoded Cultural UX Intelligence Platform.
 * 
 * @example
 * ```typescript
 * import { CultureCoded } from '@culturecoded/sdk';
 * 
 * const cc = new CultureCoded({ apiKey: process.env.CULTURECODED_API_KEY });
 * 
 * const analysis = await cc.analyzeDesign({
 *   imageUrl: 'https://example.com/design.png',
 *   targetRegion: 'Africa',
 *   targetCountry: 'Nigeria',
 *   ethnicGroup: 'Yoruba',
 *   designType: 'landing_page',
 *   industry: 'fintech'
 * });
 * 
 * console.log(analysis.recommendations);
 * ```
 */
export class CultureCoded {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: CultureCodedConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required. Get one at https://culturecoded.io/api-docs');
    }
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://culturecoded.replit.app';
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    path: string,
    body?: object
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    
    const headers: Record<string, string> = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'User-Agent': 'culturecoded-sdk-js/1.0.0',
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as ApiError;
      const error = new Error(errorData.message || `Request failed with status ${response.status}`) as Error & ApiError;
      error.status = response.status;
      error.code = errorData.code;
      throw error;
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  // ============================================
  // Cultural Analysis
  // ============================================

  /**
   * Analyze a design for cultural adaptation recommendations.
   * 
   * @param options - Analysis options including image, target market, and design type
   * @returns Analysis results with recommendations and cultural insights
   * 
   * @example
   * ```typescript
   * const analysis = await cc.analyzeDesign({
   *   imageUrl: 'https://example.com/landing.png',
   *   targetRegion: 'Africa',
   *   targetCountry: 'Nigeria',
   *   ethnicGroup: 'Yoruba',
   *   designType: 'landing_page',
   *   industry: 'fintech'
   * });
   * ```
   */
  async analyzeDesign(options: AnalyzeDesignOptions): Promise<Analysis> {
    if (!options.imageUrl && !options.imageBase64) {
      throw new Error('Either imageUrl or imageBase64 is required');
    }
    return this.request<Analysis>('POST', '/api/v1/analyze', options);
  }

  /**
   * Get all analyses for the authenticated user.
   * 
   * @returns Array of analysis objects
   */
  async getAnalyses(): Promise<Analysis[]> {
    return this.request<Analysis[]>('GET', '/api/v1/analyses');
  }

  /**
   * Get a specific analysis by ID.
   * 
   * @param id - Analysis ID
   * @returns Full analysis with recommendations
   */
  async getAnalysis(id: string): Promise<Analysis> {
    return this.request<Analysis>('GET', `/api/v1/analyses/${id}`);
  }

  /**
   * Delete an analysis.
   * 
   * @param id - Analysis ID to delete
   */
  async deleteAnalysis(id: string): Promise<void> {
    await this.request<void>('DELETE', `/api/v1/analyses/${id}`);
  }

  // ============================================
  // Cultural Communities (Ethnic Groups)
  // ============================================

  /**
   * Get available cultural communities for a specific country.
   * Use these for more targeted analysis within a market.
   * 
   * @param country - Country name (e.g., "Nigeria", "Kenya")
   * @returns Array of ethnic groups with cultural dimension profiles
   * 
   * @example
   * ```typescript
   * const groups = await cc.getEthnicGroups('Nigeria');
   * // [{ name: 'Yoruba', ... }, { name: 'Igbo', ... }, ...]
   * ```
   */
  async getEthnicGroups(country: string): Promise<EthnicGroup[]> {
    return this.request<EthnicGroup[]>('GET', `/api/v1/ethnic-groups/${encodeURIComponent(country)}`);
  }

  /**
   * Get all available regions and their countries.
   * 
   * @returns Object mapping regions to arrays of country names
   */
  async getRegions(): Promise<RegionsResponse> {
    return this.request<RegionsResponse>('GET', '/api/v1/regions');
  }

  // ============================================
  // Export & Integrations
  // ============================================

  /**
   * Export an analysis in various formats.
   * 
   * @param options - Export options including format and Figma file key
   * @returns Export result with download URL or Figma data
   * 
   * @example
   * ```typescript
   * // Export to PDF
   * const pdfExport = await cc.exportAnalysis({
   *   analysisId: 'abc123',
   *   format: 'pdf'
   * });
   * 
   * // Export to Figma
   * const figmaExport = await cc.exportAnalysis({
   *   analysisId: 'abc123',
   *   format: 'figma',
   *   figmaFileKey: 'your-figma-file-key'
   * });
   * ```
   */
  async exportAnalysis(options: ExportOptions): Promise<ExportResult> {
    if (options.format === 'figma' && !options.figmaFileKey) {
      throw new Error('figmaFileKey is required for Figma exports');
    }
    return this.request<ExportResult>('POST', '/api/v1/exports', options);
  }

  /**
   * Alias for exportAnalysis with Figma format.
   * 
   * @param analysisId - Analysis ID to export
   * @param figmaFileKey - Figma file key to update
   * @returns Figma export data
   */
  async exportToFigma(analysisId: string, figmaFileKey: string): Promise<ExportResult> {
    return this.exportAnalysis({
      analysisId,
      format: 'figma',
      figmaFileKey,
    });
  }

  /**
   * Get all exports for the authenticated user.
   * 
   * @returns Array of export records
   */
  async getExports(): Promise<ExportResult[]> {
    return this.request<ExportResult[]>('GET', '/api/v1/exports');
  }

  // ============================================
  // User & Credits
  // ============================================

  /**
   * Get current user profile.
   * 
   * @returns User profile including credits and tier
   */
  async getUser(): Promise<User> {
    return this.request<User>('GET', '/api/v1/user');
  }

  /**
   * Get API usage statistics for the current billing period.
   * 
   * @returns Usage stats including analyses count and credits used
   */
  async getUsage(): Promise<UsageStats> {
    return this.request<UsageStats>('GET', '/api/v1/stats');
  }
}
