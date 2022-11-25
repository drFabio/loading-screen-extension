import { renderHook } from "@testing-library/react";
import { useDataSources } from "./useDataSources";

describe(`useDataSources`, () => {
  const mockSources = new Array(13)
    .fill({})
    .map((_, index) => `source ${index}`);

  it(`renders without configuration`, () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    const expectedResult = mockSources[Math.floor(0.5 * 13)];
    const { result } = renderHook(() => useDataSources(mockSources));
    expect(result.current).toEqual(expectedResult);
  });
  it.todo(`renders with configuration`);
});
