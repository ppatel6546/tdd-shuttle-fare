
const BASE_FARE_CENTS = 200;
const INCLUDED_KM = 5;
const PER_EXTRA_KM_CENTS = 50;
const DISCOUNTS = {
  adult: 1.0,
  student: 0.5,
  senior: 0.5,
  child: 0.0
};
const PEAK_SURCHARGE_CENTS = 100;

function fareCents(distanceKm, rider = "adult", peak = false) {
  if (distanceKm < 0) {
    throw new RangeError("distance must be non-negative");
  }

  if (!Object.hasOwn(DISCOUNTS, rider)) {
    throw new Error(`unknown rider type: ${rider}`);
  }

  const extraKm = Math.max(0, Math.ceil(distanceKm - INCLUDED_KM));

  let full = BASE_FARE_CENTS + extraKm * PER_EXTRA_KM_CENTS;

  if (peak) {
    full += PEAK_SURCHARGE_CENTS;
  }

  return Math.round(full * DISCOUNTS[rider]);
}

// Weekly fare cap - first TDD implementation
function weeklyTotal(fares) {
  if (fares.some(fare => fare < 0)) {
    throw new RangeError("fares must be non-negative");
  }

  const total = fares.reduce((sum, fare) => sum + fare, 0);

  return Math.min(total, 1500);
}


module.exports = { fareCents, weeklyTotal };
