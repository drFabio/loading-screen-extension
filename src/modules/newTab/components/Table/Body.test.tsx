import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Body } from "./Body";

describe(`Body`, () => {
  test(`Renders header`, () => {
    render(
      <table>
        <Body
          isRow
          rows={[["Simple"], [{ rowSpan: 3, colSpan: 7, text: "Complex" }]]}
        />
      </table>
    );

    screen.getByText("Simple");
    const cell = screen.getByText<HTMLTableCellElement>("Complex");
    expect(cell.rowSpan).toBe(3);
    expect(cell.colSpan).toBe(7);
  });
  test(`Renders body`, () => {
    render(
      <table>
        <Body
          rows={[["Simple"], [{ rowSpan: 3, colSpan: 7, text: "Complex" }]]}
        />
      </table>
    );

    screen.getByText("Simple");
    const cell = screen.getByText<HTMLTableCellElement>("Complex");
    expect(cell.rowSpan).toBe(3);
    expect(cell.colSpan).toBe(7);
  });
});
