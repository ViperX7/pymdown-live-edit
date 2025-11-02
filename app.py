from flask import Flask, render_template, request, jsonify
import markdown
from pymdownx import superfences, highlight, inlinehilite, keys, magiclink, betterem, caret, mark, tilde, smartsymbols, emoji, tasklist, arithmatex, critic, details, tabbed

app = Flask(__name__)

# Configure markdown with pymdown extensions
md = markdown.Markdown(extensions=[
    'pymdownx.superfences',
    'pymdownx.highlight',
    'pymdownx.inlinehilite',
    'pymdownx.keys',
    'pymdownx.magiclink',
    'pymdownx.betterem',
    'pymdownx.caret',
    'pymdownx.mark',
    'pymdownx.tilde',
    'pymdownx.smartsymbols',
    'pymdownx.emoji',
    'pymdownx.tasklist',
    'pymdownx.arithmatex',
    'pymdownx.critic',
    'pymdownx.details',
    'pymdownx.tabbed',
    'admonition',
    'codehilite',
    'tables',
    'toc'
], extension_configs={
    'pymdownx.highlight': {
        'css_class': 'highlight',
        'linenums_style': 'table'
    },
    'pymdownx.superfences': {
        'custom_fences': [
            {
                'name': 'mermaid',
                'class': 'mermaid',
                'format': superfences.fence_div_format
            }
        ]
    },
    'pymdownx.tasklist': {
        'custom_checkbox': True
    }
})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_markdown():
    markdown_text = request.json.get('markdown', '')
    html = md.convert(markdown_text)
    md.reset()  # Reset for next conversion
    return jsonify({'html': html})

if __name__ == '__main__':
    app.run(debug=True)