# CONTRIBUTING – How to Help

## Getting Started

1. **Find an issue**: Browse [GitHub Issues](https://github.com/yourusername/namami/issues)
2. **Comment**: Let maintainers know you're interested
3. **Fork & clone**: Create your own copy
4. **Create branch**: `git checkout -b feature/your-feature`
5. **Make changes** → **Test** → **Submit PR**

## Code Standards

### Naming Conventions
- Components: `PascalCase` (e.g., `HabitCard`)
- Functions: `camelCase` (e.g., `computeStreak`)
- Constants: `UPPER_SNAKE_CASE`
- Variables: `camelCase` (e.g., `isComplete`)

### JavaScript Style

```javascript
// ✅ Good
const HabitCard = ({ habit, onUpdate }) => {
  const [expanded, setExpanded] = useState(false)
  const handleClick = () => setExpanded(!expanded)
  return <div>{habit.name}</div>
}

// ❌ Avoid
var habitCard = function(props) {
  var expanded = useState(false)  // var usage
  var nested = x ? y ? z : a : b   // nested ternaries
}
```

**Rules**:
- Use `const`/`let`, not `var`
- Destructure props
- Keep functions focused
- Use Context for global state (no prop drilling)
- Add comments for "why", not "what"

### React Best Practices

```javascript
// ✅ Hooks at top level
const [state, setState] = useState(null)
const { habits } = useContext(AppContext)
useEffect(() => { /* ... */ }, [habits])

// ❌ Hooks inside conditionals
if (condition) const [state, setState] = useState(null)
```

### CSS with Tailwind

```javascript
// ✅ Use Tailwind classes
<button className="px-4 py-2 bg-cyan-500 text-white rounded">Click</button>

// ❌ Avoid inline styles
<button style={{ padding: '8px 16px' }}>Click</button>
```

## Git Workflow

### Branch Naming
```
feature/description   # New feature
fix/issue            # Bug fix
docs/topic           # Documentation
refactor/component   # Code improvement
test/feature         # Tests
```

### Commit Messages

Format: `type(scope): description`

```
✅ feat(habits): add three-goal-type system
✅ fix(heatmap): correct color intensity calculation
✅ docs(readme): add deployment guide
❌ feat: added goal types                    (lowercase scope needed)
❌ fix: Fixed heatmap                        (capital, period)
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

Keep commits atomic (one logical change per commit).

## Testing

Before submitting PR:

```bash
npm run build
npm run lint
npm run preview  # Test build locally
```

**Manual testing**:
- [ ] Desktop, tablet, mobile
- [ ] Light & dark mode
- [ ] Offline mode (DevTools: Network → Offline)
- [ ] No console errors
- [ ] Keyboard navigation works

## PR Process

### 1. Check Before Submitting

```bash
git fetch upstream
git rebase upstream/main
npm run lint -- --fix
git log --oneline -5  # Clean history
```

### 2. Create PR

Use title: `type(scope): description`

Example: `feat(gamification): add per-habit streak bonuses`

**Description requirements**:
- What does it do?
- Why? (closes #issue if applicable)
- How to test?

### 3. Be Open to Feedback

Reviewers may request changes. Respond professionally:
```
Great point! I've updated the logic to...
```

### 4. Merge

Maintainer clicks "Squash and merge" when approved.

## Reporting Issues

**Bug Report**:
```markdown
**Describe bug**: What's broken?
**Steps to reproduce**: How do I see the bug?
**Expected**: What should happen?
**Actual**: What actually happens?
**Environment**: Browser, OS, device
```

**Feature Request**:
```markdown
**Problem**: What's the pain point?
**Solution**: Your proposed solution
**Examples**: How would it work?
```

## Code of Conduct

- Be respectful and professional
- Welcome diverse perspectives
- Focus on ideas, not individuals
- Report harassment to maintainers

---

**Questions?** Open a GitHub Discussion or check [TECHNICAL.md](TECHNICAL.md)
