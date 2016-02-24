/**
 * Check and normalise the value of precision (must be positive integer)
 */
function _checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val) ? base : val;
}

export default _checkPrecision;
