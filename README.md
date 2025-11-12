# Markdown UI Toolkit

A live markdown editor with advanced features powered by pymdown-extensions.

## Demo

![Demo Video](docs/live_editor.mp4)

## Quick Start

### Flask Version (Server-based)
```bash
pip install flask markdown pymdown-extensions
python app.py
```
Open http://localhost:5000

### Standalone Version (Browser-only)
Open `standalone-clean.html` in any modern browser.

## Features

- Live markdown preview
- Code syntax highlighting with line numbers
- Mermaid diagrams
- Admonitions (note, warning, etc.)
- Tabbed content
- Task lists
- Copy code buttons

## Files

- `app.py` - Flask server version
- `standalone-clean.html` - Browser-only version (no server needed)
- `static/css/style.css` - Shared styling

## Known Issues

- Standalone version: Code block line numbers, titles, and line highlights are not fully supported

## Notes

- Parts of this project were built using AI assistance