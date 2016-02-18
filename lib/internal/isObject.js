
/**
 * Tests whether supplied parameter is a true object
 */
export default function isObject(obj) {
  return obj && toString.call(obj) === '[object Object]';
}
