// interactiveAreas.js

export const MAP_VIEWBOX = { width: 1075, height: 709 };
export const FESTIVAL_VIEWBOX = { width: 1075, height: 709 }; // ret til festivalArea.svg's viewBox
export const LEFT_RATIO = 1065 / (1065 + 435); // ≈ 0.71

export const MAP_AREAS = [
  {
    id: "festival_site",
    x: 390,
    y: 120,
    width: 230,
    height: 150,
  }, // kortets festival-område
];

export const FESTIVAL_AREAS = [
  { id: "stage_orange", x: 351, y: 164, width: 197.425, height: 150 },
  { id: "stand_food", x: 137, y: 281, width: 140, height: 170 },
  { id: "stand_merch", x: 790, y: 324, width: 140, height: 150 },
];

export function getAreaAtPoint(x, y, areas) {
  return (
    areas.find(
      (r) => x >= r.x && x <= r.x + r.width && y >= r.y && y <= r.y + r.height,
    )?.id ?? null
  );
}

export const INFOBOX_AREAS = [
  {
    id: "infobox_close",
    x: LEFT_RATIO + 0.01,
    y: 0.0,
    width: 0.1,
    height: 0.1,
  },
  // tilføj flere efter behov
];
