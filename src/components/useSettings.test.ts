import { renderHook } from "@testing-library/react";
import { useSettings } from "./useSettings";
import { sources as mockSources } from "../assets/sources";
jest.mock("../assets/sources", () => ({
  sources: [{ id: "source 1", title: "title 1" }, { id: "source 2" }],
}));

describe(`useSettings`, () => {
  let mockGetItem: jest.Mock;
  let mockSetItem: jest.Mock;

  beforeEach(() => {
    mockGetItem = jest.fn();

    mockSetItem = jest.fn();
    jest.spyOn(Storage.prototype, "getItem");
    Storage.prototype.getItem = mockGetItem;
    Storage.prototype.setItem = mockSetItem;
  });
  it(`renders listing sources`, () => {
    /**
     * @see {@link https://github.com/jsdom/jsdom/issues/2318}
     */
    jest.spyOn(Storage.prototype, "getItem");
    mockGetItem.mockImplementation(() =>
      JSON.stringify({
        [mockSources[1].id]: true,
      })
    );

    const expectedResult = [
      {
        title: mockSources[0].title,
        deactivated: false,
        id: mockSources[0].id,
      },
      {
        title: mockSources[1].id,
        deactivated: true,
        id: mockSources[1].id,
      },
    ];
    const { result } = renderHook(() => useSettings());

    expect(result.current.sources).toEqual(expectedResult);
  });
  it.todo(`can toogle activation saving `);
});
