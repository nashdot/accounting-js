---
"accounting-js": major
---

- Convert to TypeScript
- Use modern toolchain (`tsup`, `vitest`)
- Remove dependencies to `is-string` and `objectAssign` packages
- Remove `formatColumn`
- Remove `format` and `parse` aliases
- `formatMoney()`, `formatNumber()` and `unformat()` not accept `Array` as first argument. If you wish format/unformat arrays you should use `formatMoneyArray()`, `formatNumberArray()` and `unformatArray()`
