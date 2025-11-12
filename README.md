# Markdown UI Toolkit

A live markdown editor with advanced features powered by pymdown-extensions.

## Demo


https://github.com/user-attachments/assets/3b3cf2dd-7ffa-4812-a21b-6279473285c3



## Live Demo

Try the standalone version: <a href="https://viperx7.github.io/pymdown-live-edit/standalone-clean.html" target="_blank">here</a>

Some features are missing in the above one - [see issues](#known-issues)

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
