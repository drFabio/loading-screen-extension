import { renderHook } from "@testing-library/react";
import { useSettings } from "./useSettings";
import { sources as mockSources } from "../assets/sources";
import { act } from "react-dom/test-utils";
jest.mock("../assets/sources", () => ({
  sources: [{ id: "source 1", title: "title 1" }, { id: "source 2" }],
}));

describe(`useSettings`, () => {
  let mockGetItem: jest.SpyInstance;
  let mockSetItem: jest.SpyInstance;
  const savedDeactivatedMap = {
    [mockSources[1].id]: true,
  };
  const savedHideMap = {
    [mockSources[1].id]: {
      hash1: true,
    },
  };

  const savedWeightMap = {
    [mockSources[1].id]: {
      hash2: 5,
    },
  };
  const savedLocalStorage = {
    deactivatedMap: JSON.stringify(savedDeactivatedMap),
    hideMap: JSON.stringify(savedHideMap),
    weightMap: JSON.stringify(savedWeightMap),
  };
  beforeEach(() => {
    /**
     * @see {@link https://github.com/jsdom/jsdom/issues/2318}
     */
    mockGetItem = jest.spyOn(Storage.prototype, "getItem");
    mockGetItem.mockImplementation((key) => {
      return savedLocalStorage[key];
    });
    mockSetItem = jest.spyOn(Storage.prototype, "setItem");
  });
  it(`renders listing sources`, () => {
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
  it(`Toogles activation saving`, () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.toogleActivation(mockSources[1].id);
    });
    expect(mockSetItem).toHaveBeenCalledWith(
      "deactivatedMap",
      JSON.stringify({
        [mockSources[1].id]: false,
      })
    );
  });
  it(`Hides item`, () => {
    const { result } = renderHook(() => useSettings());
    const hash = `newHash`;
    act(() => {
      result.current.hideItem(mockSources[1].id, hash);
    });
    expect(mockSetItem).toHaveBeenCalledWith(
      "hideMap",
      JSON.stringify({
        ...savedHideMap,
        [mockSources[1].id]: {
          ...savedHideMap[mockSources[1].id],
          [hash]: true,
        },
      })
    );
  });
  it(`Show item`, () => {
    const { result } = renderHook(() => useSettings());
    const hash = `hash1`;
    act(() => {
      result.current.showItem(mockSources[1].id, hash);
    });
    expect(mockSetItem).toHaveBeenCalledWith(
      "hideMap",
      JSON.stringify({
        ...savedHideMap,
        [mockSources[1].id]: {
          ...savedHideMap[mockSources[1].id],
          [hash]: false,
        },
      })
    );
  });
  it(`Decreases weight`, () => {
    const { result } = renderHook(() => useSettings());
    const hash = `hash2`;
    act(() => {
      result.current.decreaseWeight(mockSources[1].id, hash);
    });
    expect(mockSetItem).toHaveBeenCalledWith(
      "weightMap",
      JSON.stringify({
        ...savedWeightMap,
        [mockSources[1].id]: {
          ...savedWeightMap[mockSources[1].id],
          [hash]: savedWeightMap[mockSources[1].id][hash] - 1,
        },
      })
    );
  });
  it(`increases weight`, () => {
    const { result } = renderHook(() => useSettings());
    const hash = `hash2`;
    act(() => {
      result.current.increaseWeight(mockSources[1].id, hash);
    });
    expect(mockSetItem).toHaveBeenCalledWith(
      "weightMap",
      JSON.stringify({
        ...savedWeightMap,
        [mockSources[1].id]: {
          ...savedWeightMap[mockSources[1].id],
          [hash]: savedWeightMap[mockSources[1].id][hash] + 1,
        },
      })
    );
  });
});
