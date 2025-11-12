# Markdown UI Toolkit

A live markdown editor with advanced features powered by pymdown-extensions.

## Demo

![Demo Video](docs/live_editor.mp4)

## Live Demo

Try the standalone version: [here](https://viperx7.github.io/pymdown-live-edit/standalone-clean.html)
some features are missing in the above one [see issues](#Known Issues)

## Quick Start


### Main Version (Flask Server)
```bash
pip install flask markdown pymdown-extensions
python app.py
```
Open http://localhost:5000

### Standalone Version (Browser-only)
Open `standalone-clean.html` in any modern browser.
*Note: Limited features - see Known Issues below.*

## Features

- Live markdown preview
- Code syntax highlighting with line numbers
- Mermaid diagrams
- Admonitions (note, warning, etc.)
- Tabbed content
- Task lists
- Copy code buttons

## Files

- `app.py` - Main Flask server version (recommended)
- `standalone-clean.html` - Browser-only version (limited features)
- `static/css/style.css` - Shared styling

## Known Issues

- Standalone version: Code block line numbers, titles, and line highlights are not fully supported

## Acknowledgments

- Built with [pymdown-extensions](https://github.com/facelessuser/pymdown-extensions) for advanced markdown features
- Parts of this project were built using AI assistance
