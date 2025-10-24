# 🤝 Contributing to NotebookLM Clone

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project
- Show empathy towards others

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/yourusername/notebooklm-clone.git
cd notebooklm-clone
```

### 3. Set Up Development Environment

Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md) to get the project running locally.

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates

## 💻 Development Guidelines

### Code Style

#### JavaScript/React
- Use **ES6+** syntax
- Use **functional components** with hooks
- Use **async/await** instead of promises
- Add **JSDoc comments** for functions
- Follow **camelCase** for variables/functions
- Follow **PascalCase** for components

#### Example:
```javascript
/**
 * Calculate the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function calculateSum(a, b) {
  return a + b;
}
```

### File Organization

- Keep files focused and single-purpose
- Group related functionality
- Use clear, descriptive names
- Follow existing project structure

### Component Guidelines

```jsx
/**
 * ComponentName - Brief description
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 * @param {Function} props.onClick - Click handler
 */
function ComponentName({ title, onClick }) {
  // Component logic
  
  return (
    <div className="component-class">
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

## 🧪 Testing

### Before Submitting

1. **Test all features:**
   - Upload different PDF files
   - Test chat functionality
   - Verify citations work
   - Check PDF navigation

2. **Check console:**
   - No errors in browser console
   - No errors in terminal

3. **Test edge cases:**
   - Large PDFs
   - Empty queries
   - Network errors
   - Invalid inputs

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Build process or auxiliary tool changes

### Examples

```bash
feat(chat): add message history export

fix(pdf): resolve page navigation bug

docs(readme): update installation instructions

refactor(api): simplify error handling
```

## 🔄 Pull Request Process

### 1. Update Your Branch

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Push Your Changes

```bash
git push origin feature/your-feature-name
```

### 3. Create Pull Request

- Go to GitHub and create a PR
- Fill out the PR template
- Link related issues
- Add screenshots if UI changes
- Request review

### 4. PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
- [ ] All features tested
- [ ] Commit messages are clear

### 5. Review Process

- Maintainers will review your PR
- Address feedback and comments
- Make requested changes
- Push updates to your branch

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Test on latest version

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Mockups, examples, or references
```

## 🎯 Areas for Contribution

### High Priority
- [ ] Add unit tests
- [ ] Improve error handling
- [ ] Add loading states
- [ ] Optimize performance
- [ ] Accessibility improvements

### Medium Priority
- [ ] Dark mode support
- [ ] Multiple document support
- [ ] Export chat history
- [ ] Keyboard shortcuts
- [ ] Mobile responsive design

### Low Priority
- [ ] Custom themes
- [ ] Internationalization (i18n)
- [ ] Advanced PDF features
- [ ] Voice input
- [ ] Collaborative features

## 📚 Resources

### Documentation
- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/)

### Tools
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

## ❓ Questions

If you have questions:
1. Check existing documentation
2. Search closed issues
3. Ask in discussions
4. Create a new issue

## 🙏 Thank You

Your contributions make this project better for everyone!

---

**Happy coding! 🎉**
