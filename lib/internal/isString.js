
/**
 * Tests whether supplied parameter is a string
 * from underscore.js
 */
export default function isString(obj) {
  return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
}
