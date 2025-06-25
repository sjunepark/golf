# Markdown Best Practices

## Code Block Language Specifications

**ALWAYS** add language specifications to code blocks in markdown files for:

1. **Better syntax highlighting** in IDEs and documentation viewers
2. **Improved readability** and code comprehension
3. **Consistent formatting** across documentation
4. **Better integration** with static site generators and documentation tools

### Common Language Identifiers

- `typescript` or `ts` - TypeScript code
- `javascript` or `js` - JavaScript code
- `json` - JSON configuration files
- `bash` or `shell` - Shell commands
- `text` - Plain text, ASCII art, directory structures
- `html` - HTML markup
- `css` - CSS styles
- `yaml` or `yml` - YAML configuration
- `toml` - TOML configuration
- `md` or `markdown` - Markdown content

### Examples

❌ **Incorrect** (no language specification):
```
const example = "hello world";
```

✅ **Correct** (with language specification):
```typescript
const example = "hello world";
```

❌ **Incorrect** (no language for directory structure):
```
src/
├── components/
└── pages/
```

✅ **Correct** (with text specification):
```text
src/
├── components/
└── pages/
```

### Special Cases

- Use `text` for directory structures, ASCII diagrams, and plain text
- Use `bash` for shell commands and scripts
- Use `json` for configuration files and data structures
- When in doubt, use a generic language that provides basic highlighting

This practice ensures consistent, readable documentation across the entire project.