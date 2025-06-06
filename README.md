[![NPM version](https://img.shields.io/npm/v/accounting-js.svg)](https://www.npmjs.com/package/accounting-js)

**accounting-js** is a tiny JavaScript library for number, money and currency parsing/formatting. It's lightweight, fully localizable, has no dependencies, and works great client-side or server-side. Use standalone or as a nodeJS/npm and AMD/requireJS module.

[Documentation](http://nashdot.github.io/accounting-js)

## Quickstart

### Install

```shell
npm install accounting-js
```

### Use

#### Format number

```javascript
import { formatNumber } from 'accounting-js';

// Default usage
formatNumber(5318008);
// ⇨ 5,318,008

// Custom format
formatNumber(9876543.21, { precision: 3, thousand: " " });
// ⇨ 9 876 543.210
```

#### Format money

```javascript
import { formatMoney } from 'accounting-js';

// Default usage
formatMoney(12345678);
// ⇨ $12,345,678.00

// European formatting (custom symbol and separators)
formatMoney(4999.99, { symbol: "€", precision: 2, thousand: ".", decimal: "," });
// ⇨ €4.999,99
```

#### Convert money to numeric

```javascript
import { unformat } from 'accounting-js';

unformat('£ 12,345,678.90 GBP');
// ⇨ 12345678.9
```

#### Accounting toFixed()

```javascript
// Native toFixed has rounding issues
(0.615).toFixed(2);
// ⇨ '0.61'

// With accounting-js
toFixed(0.615, 2);
// ⇨ '0.62'
```

---
Copyright (c) 2016-present Stanislav Lesnikov, MIT License

Copyright (c) 2014 Open Exchange Rates, MIT License
