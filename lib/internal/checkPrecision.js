/**
 * Check and normalise the value of precision (must be positive integer).
 */
function checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val) ? base : val;
}

export default checkPrecision;
