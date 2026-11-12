const BASE_FARE_CENTS = 200;
const INCLUDED_KM = 5;
const PER_EXTRA_KM_CENTS = 50;
const DISCOUNTS = { adult: 1.0, student: 0.5, senior: 0.5, child: 0.0 };

/**
 * Returns the shuttle fare in cents.
 *
 * Rules (the specification):
 *  - The base fare of 200 cents covers the first 5 km (including exactly 5 km).
 *  - Each additional km, or part of a km, costs 50 cents.
 *  - Students and seniors pay half. Children ride free.
 *  - A negative distance throws RangeError. An unknown rider type throws Error.
 */
function fareCents(distanceKm, rider = "adult") {
  if (distanceKm < 0) {
    throw new RangeError("distance must be non-negative");
  }
  if (!Object.hasOwn(DISCOUNTS, rider)) {
    throw new Error(`unknown rider type: ${rider}`);
  }
  const extraKm = Math.max(0, Math.ceil(distanceKm - INCLUDED_KM));
  const full = BASE_FARE_CENTS + extraKm * PER_EXTRA_KM_CENTS;
  return Math.round(full * DISCOUNTS[rider]);
}

module.exports = { fareCents };