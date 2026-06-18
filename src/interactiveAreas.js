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
  { id: "stage_orange", x: 370, y: 164, width: 197.425, height: 200 },
  { id: "stand_food", x: 157, y: 201, width: 150, height: 260 },
  { id: "stand_merch", x: 760, y: 304, width: 200, height: 230 },
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
