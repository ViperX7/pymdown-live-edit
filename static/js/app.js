class MarkdownEditor {
    constructor() {
        this.markdownInput = document.getElementById('markdown-input');
        this.htmlOutput = document.getElementById('html-output');
        this.rawHtmlOutput = document.getElementById('raw-html-output');
        this.viewToggle = document.getElementById('view-toggle');
        this.toggleText = document.getElementById('toggle-text');
        this.debounceTimer = null;
        this.showingRawHtml = false;
        this.currentHtml = '';
        
        this.init();
    }
    
    init() {
        // Initialize mermaid
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose'
        });
        
        // Add event listeners
        this.markdownInput.addEventListener('input', () => {
            this.debounceConvert();
        });
        
        this.viewToggle.addEventListener('click', () => {
            this.toggleView();
        });
        
        // Load sample content
        this.loadSampleContent();
        
        // Initial conversion
        this.convertMarkdown();
    }
    
    debounceConvert() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.convertMarkdown();
        }, 300);
    }
    
    async convertMarkdown() {
        const markdownText = this.markdownInput.value;
        
        try {
            const response = await fetch('/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ markdown: markdownText })
            });
            
            const data = await response.json();
            this.currentHtml = data.html;
            
            // Update the current view
            this.updateView();
            
            if (!this.showingRawHtml) {
                // Re-initialize highlight.js for new code blocks
                this.htmlOutput.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
                
                // Re-initialize mermaid for new diagrams
                const mermaidElements = this.htmlOutput.querySelectorAll('.mermaid');
                if (mermaidElements.length > 0) {
                    // Clear any existing data-processed attributes
                    mermaidElements.forEach(element => {
                        element.removeAttribute('data-processed');
                    });
                    
                    // Re-run mermaid initialization
                    mermaid.init(undefined, mermaidElements);
                }
                
                // Enhance code block titles
                this.enhanceCodeBlockTitles();
            }
            
        } catch (error) {
            console.error('Error converting markdown:', error);
            this.htmlOutput.innerHTML = '<p style="color: red;">Error converting markdown</p>';
        }
    }
    
    loadSampleContent() {
        const sampleMarkdown = `# Markdown UI Toolkit Editor

Welcome to the **Markdown UI Toolkit Editor**! This editor supports *pymdown-extensions* for enhanced markdown features.

## Features

### Basic Markdown
- **Bold text**
- *Italic text*
- ~~Strikethrough~~
- ==Highlight==
- H~2~O (subscript)
- X^2^ (superscript)

### Code Highlighting
\`\`\`python
def hello_world():
    print("Hello, World!")
    return "success"
\`\`\`

### Code with Line Numbers
\`\`\`python linenums="1"
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Example usage
result = calculate_fibonacci(10)
print(f"Fibonacci(10) = {result}")
\`\`\`

### Code with Line Numbers and Highlighting
\`\`\`python linenums="1" hl_lines="2 3 7"
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Example usage  
result = calculate_fibonacci(10)
print(f"Fibonacci(10) = {result}")
\`\`\`

### Code with Title
\`\`\`python title="fibonacci.py" linenums="1"
def calculate_fibonacci(n):
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

def main():
    result = calculate_fibonacci(10)
    print(f"Fibonacci(10) = {result}")

if __name__ == "__main__":
    main()
\`\`\`

### Task Lists
- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

### Tables
| Feature | Status | Priority |
|---------|--------|----------|
| Editor | ✅ Done | High |
| Preview | ✅ Done | High |
| Export | ⏳ Todo | Medium |

### Keyboard Shortcuts
Press ++ctrl+c++ to copy and ++ctrl+v++ to paste.

### Math (if enabled)
$$E = mc^2$$

### Critic Markup
{++This text has been added++}
{--This text has been deleted--}
{~~This~>That~~} (substitution)
{==This text is highlighted==}
{>>This is a comment<<}

### Details/Summary
??? note "Click to expand"
    This is hidden content that can be expanded.

### Tabbed Content
=== "Tab 1"
    Content for tab 1

=== "Tab 2"
    Content for tab 2

### Mermaid Diagrams
\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
\`\`\`

### Admonitions
!!! note "Important Note"
    This is a note admonition. Use it for general information.

!!! warning "Warning"
    This is a warning admonition. Use it for potential issues.

!!! danger "Danger"
    This is a danger admonition. Use it for critical warnings.

!!! success "Success"
    This is a success admonition. Use it for positive outcomes.

!!! info "Information"
    This is an info admonition. Use it for additional details.

!!! tip "Pro Tip"
    This is a tip admonition. Use it for helpful suggestions.

Try editing this markdown to see the live preview in action!`;
        
        this.markdownInput.value = sampleMarkdown;
    }
    
    toggleView() {
        this.showingRawHtml = !this.showingRawHtml;
        this.updateView();
        
        // Update button text
        this.toggleText.textContent = this.showingRawHtml ? 'Show Preview' : 'Show HTML';
    }
    
    updateView() {
        if (this.showingRawHtml) {
            // Show raw HTML
            this.htmlOutput.style.display = 'none';
            this.rawHtmlOutput.style.display = 'block';
            this.rawHtmlOutput.textContent = this.currentHtml;
        } else {
            // Show rendered HTML
            this.htmlOutput.style.display = 'block';
            this.rawHtmlOutput.style.display = 'none';
            this.htmlOutput.innerHTML = this.currentHtml;
        }
    }
    
    enhanceCodeBlockTitles() {
        // Find all code block titles and enhance them
        const filenameElements = this.htmlOutput.querySelectorAll('.highlighttable .filename .filename');
        
        filenameElements.forEach(element => {
            // Skip if already enhanced
            if (element.querySelector('.copy-btn')) return;
            
            // Find the associated code block for copy functionality
            const codeBlock = element.closest('.highlight');
            
            // Store original text content
            const originalText = element.textContent;
            
            // Clear the element and restructure
            element.innerHTML = '';
            
            // Create text span (left side)
            const textSpan = document.createElement('span');
            textSpan.textContent = originalText;
            
            // Create copy button (right side)
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = 'Copy';
            copyBtn.title = 'Copy code to clipboard';
            
            // Add click handler for copy functionality
            copyBtn.addEventListener('click', () => {
                const codeContent = codeBlock.querySelector('.code pre code');
                if (codeContent) {
                    const text = codeContent.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        copyBtn.textContent = 'Copied!';
                        setTimeout(() => {
                            copyBtn.textContent = 'Copy';
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy code:', err);
                    });
                }
            });
            
            // Assemble the simple structure: text on left, button on right
            element.appendChild(textSpan);
            element.appendChild(copyBtn);
        });
    }
}

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MarkdownEditor();
});