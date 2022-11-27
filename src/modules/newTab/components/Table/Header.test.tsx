import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import React from "react";

describe(`Tabs`, () => {
  test(`Renders a rich header`, () => {
    render(
      <table>
        <Header
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
