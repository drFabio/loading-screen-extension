import { renderHook } from "@testing-library/react";
import { SourceTypes, useDataSources } from "./useDataSources";

describe(`useDataSources`, () => {
  const mockSources = new Array(13).fill({}).map((_, index) => ({
    data: new Array(17).fill("").reduce(
      (acc, _, index) => ({
        ...acc,
        [`data ${index}`]: `data ${index}`,
      }),
      {}
    ),
    name: `source ${index}`,
    type: SourceTypes.EQUIVALENCE,
  }));

  it(`renders without configuration`, () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    const expectedSource = mockSources[Math.floor(0.5 * 13)];
    const resultIndex = Math.floor(0.5 * 17);

    const expectedData = Object.entries(expectedSource.data)[resultIndex];
    const { result } = renderHook(() => useDataSources(mockSources));
    expect(result.current).toEqual({
      name: expectedSource.name,
      type: expectedSource.type,
      choice: expectedData,
    });
  });
  it.todo(`renders with configuration`);
});
