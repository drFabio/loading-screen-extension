import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SourceTypes } from "../../../types";
import { Equivalence as MockedEquivalence } from "./Equivalence";
import { Table as MockedTable } from "./Table";
import { Tabs } from "./Tabs";
import { useDataSources as mockedUseDataSources } from "./useDataSources";
import { useSettings } from "../../../components/useSettings";

jest.mock("../../../getDeterministicPallette", () => ({
  getDeterministicPallette: jest.fn(() => ({
    color: "mockColor",
    backgroundColor: "mockBackgroundColor",
  })),
}));
jest.mock("../../../components/useSettings", () => ({
  useSettings: jest.fn(() => ({
    deactivatedMap: { someId: true },
    initialized: true,
  })),
}));
jest.mock("./useDataSources", () => ({
  useDataSources: jest.fn(),
}));

jest.mock("./Equivalence", () => ({ Equivalence: jest.fn(() => <div />) }));
jest.mock("./Table", () => ({ Table: jest.fn(() => <div />) }));

describe(`Tabs`, () => {
  test(`Renders equivalence`, () => {
    const term = "term";
    const definition = "definition";
    (mockedUseDataSources as jest.Mock).mockImplementation(() => ({
      type: SourceTypes.EQUIVALENCE,
      choice: [term, definition],
    }));
    render(<Tabs />);
    expect((MockedEquivalence as jest.Mock).mock.calls[0][0]).toEqual({
      term,
      definition,
    });
  });
  test(`Renders statement`, () => {
    const statement = "statement";
    (mockedUseDataSources as jest.Mock).mockImplementation(() => ({
      type: SourceTypes.STATEMENT,
      choice: statement,
    }));
    render(<Tabs />);
    screen.getByText(statement);
  });
  test(`Renders table`, () => {
    const header = [["header1"]];
    const rows = [["cell1"]];
    const title = "title";

    (mockedUseDataSources as jest.Mock).mockImplementation(() => ({
      type: SourceTypes.TABLE,
      choice: {
        header,
        rows,
        title,
      },
    }));
    render(<Tabs />);

    expect((MockedTable as jest.Mock).mock.calls[0][0]).toEqual({
      header,
      rows,
      title,
    });
  });
});
