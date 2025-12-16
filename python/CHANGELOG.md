# Changelog

All notable changes to the CultureCoded Python SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2025-12-16

## [1.0.0] - 2024-12-15

### Added
- Initial release of the CultureCoded Python SDK
- `CultureCoded` client class with API key authentication
- `analyze_design()` - Create cultural UX analysis for designs
- `get_analyses()` / `get_analysis(id)` - Retrieve analysis results
- `delete_analysis(id)` - Delete an analysis
- `get_ethnic_groups(country)` - Get cultural communities by country
- `get_regions()` - Get available target regions
- `export_analysis()` - Export analysis in PDF, CSV, or Figma formats
- `export_to_figma()` - Convenience method for Figma exports
- `get_exports()` - List export history
- `get_user()` - Get current user profile
- `get_usage()` - Get API usage statistics
- Full type hints with dataclasses
- Comprehensive docstrings
