
/**
 * Tests whether supplied parameter is an array
 * from underscore.js, delegates to ECMA5's native Array.isArray
 */
export default function isArray(obj) {
  return Array.isArray ? Array.isArray(obj) : toString.call(obj) === '[object Array]';
}
