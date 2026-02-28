# Contributing

## Workflow

1. Create a branch from `main`
2. Make focused changes
3. Run checks
4. Open a PR with clear summary and test notes

## Local Checks

```bash
npm run lint
npm run build
npm run preview
```

## Coding Notes

- Keep changes small and targeted
- Match existing React + Tailwind patterns
- Use `AppContext` flows instead of introducing duplicate global state
- Avoid unrelated refactors in the same PR

## PR Guidelines

- Use conventional style titles: `feat(scope): ...`, `fix(scope): ...`, `docs(scope): ...`
- Include: what changed, why, and how you tested
- Add screenshots for visible UI changes

## Issues

When reporting bugs, include reproduction steps, expected/actual behavior, and environment details.
