# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.0.5]
### Changed
- Refactored large components (MusicVisualizer, ImageGenerator, ChatBot) into smaller, more maintainable sub-components.
- Improved code organization and reduced token consumption.
- Enhanced dark mode support for all new sub-components.

## [v0.0.4]
### Fixed
- Resolved hydration mismatch errors by optimizing layout structure and Footer component.
- Added explicit Suspense boundaries for better loading states.

## [v0.0.3]
### Added
- Web MIDI API support for external keyboard integration.
- Sheet music visualization using ABC notation.
- Audio recording and export capabilities.
- Streaming AI responses for real-time chat experience.
- Dark/Light mode toggle with `next-themes`.
- Multi-touch support for the virtual piano.
- Global state management with Zustand.
- PWA support with manifest.json.

## [v0.0.2]
### Added
- Multi-language support (11 languages).
- Download button for generated images.
- Clear chat button.
- Markdown support for chat messages.
- SEO and GEO meta tags.

### Changed
- Refactored directory structure (moved components, services, contexts, types to `app/`).
- Updated app title with version number.

## [v0.0.1]
### Added
- Initial release.
- Music Visualizer feature.
- AI Tutor Chat feature.
- AI Art Generator feature.
