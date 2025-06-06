
## 2.0.0

### Major Changes

- Convert to TypeScript
- Use modern toolchain (`tsup`, `vitest`)
- Remove dependencies to `is-string` and `objectAssign` packages
- Remove `formatColumn`
- Remove `format` and `parse` aliases
- `formatMoney()`, `formatNumber()` and `unformat()` not accept `Array` as first argument. If you wish format/unformat arrays you should use `formatMoneyArray()`, `formatNumberArray()` and `unformatArray()`

## 1.1.0-1 - 2016-02-24

- Remove "internal" methods

## 1.0.0-1 - 2016-02-18-22

- Initial release (fork accounting.js)
- Apply PR from original project
