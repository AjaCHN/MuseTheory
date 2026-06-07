# MuseTheory AI

[中文文档](./README.md)

An intelligent music theory learning assistant that visualizes scales and chords, provides an AI tutor, and generates artistic musical imagery.

## Features

- **Music Visualizer**: Enter a scale or chord name to visualize it on a piano keyboard with sheet music display
- **AI Tutor**: Ask music theory questions in natural language and get streaming answers with multi-turn conversation support
- **AI Art Generator**: Create concept art from musical descriptions, supporting 1K/2K/4K resolutions
- **Multi-language**: Supports 11 languages

## Requirements

- Node.js 18+
- Gemini API Key (for AI features)

## Quick Start

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Configure environment: Create `.env.local` file and add `GEMINI_API_KEY=your_api_key`
4. Start development server: `npm run dev`
5. Open http://localhost:3000 in your browser

## Pages

| Path | Feature |
|------|---------|
| `/` | Music Visualizer (Home) |
| `/chat` | AI Tutor Chat |
| `/art` | AI Art Generator |

## Features

- **Lucky**: Click the dice button to randomly view a scale or chord
- **MIDI Keyboard**: Connect external MIDI keyboard devices
- **Audio Recording**: Record and export your performance

## Tech Stack

Next.js · React · Tailwind CSS · Gemini AI

## License

MIT
