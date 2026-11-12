const { fareCents } = require("../src/fare");

test("short trip: adult pays the base fare", () => {
  // Arrange
  const distanceKm = 3;

  // Act
  const result = fareCents(distanceKm, "adult");

  // Assert
  expect(result).toBe(200);
});


test("exactly 5 km is still the base fare", () => {
  expect(fareCents(5, "adult")).toBe(200);
});

test("each extra km costs 50 cents", () => {
  expect(fareCents(8, "adult")).toBe(350);
});

test("students pay half", () => {
  expect(fareCents(8, "student")).toBe(175);
});

test("children ride free", () => {
  expect(fareCents(20, "child")).toBe(0);
});

test("a negative distance throws a RangeError", () => {
  expect(() => fareCents(-1, "adult")).toThrow(RangeError);
});

test("an unknown rider type throws", () => {
  expect(() => fareCents(3, "pilot")).toThrow("unknown rider type");
});

test("part of a km is charged as a full km", () => {
  expect(fareCents(5.5, "adult")).toBe(250);
});

test("peak hours add a 100-cent surcharge", () => {
  expect(fareCents(3, "adult", true)).toBe(300);
});

test("students pay half of the peak surcharge too", () => {
  expect(fareCents(3, "student", true)).toBe(150);
});

