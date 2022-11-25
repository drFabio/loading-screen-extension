import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tabs } from "./Tabs";
import React from "react";

describe(`Tabs`, () => {
  test(`Renders text`, () => {
    render(<Tabs />);
  });
});
