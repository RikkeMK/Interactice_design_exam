import { forwardRef } from "react";

const TestBox = forwardRef(function TestBox(
  { area, className = "", isHovered = false },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`testBox ${className}`.trim()}
      data-hovered={isHovered ? "true" : "false"}
    >
      <h1>{area?.name}</h1>
    </div>
  );
});

export default TestBox;

const areas = {
  left: { name: "Left area" },
  center: { name: "Center area" },
  right: { name: "Right area" },
};

export function LeftBox({ isHovered = false }, ref) {
  return (
    <TestBox
      ref={ref}
      area={areas.left}
      className="testBoxLeft"
      isHovered={isHovered}
    />
  );
}

export const ForwardedLeftBox = forwardRef(LeftBox);

function CenterBox({ isHovered = false }, ref) {
  return (
    <TestBox
      ref={ref}
      area={areas.center}
      className="testBoxCenter"
      isHovered={isHovered}
    />
  );
}

export const ForwardedCenterBox = forwardRef(CenterBox);

function RightBox({ isHovered = false }, ref) {
  return (
    <TestBox
      ref={ref}
      area={areas.right}
      className="testBoxRight"
      isHovered={isHovered}
    />
  );
}

export const ForwardedRightBox = forwardRef(RightBox);
