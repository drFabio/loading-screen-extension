import { renderHook } from "@testing-library/react";
import { getHashFromItem } from "../../../getHashFromItem";
import {
  EquivalenceInputSource,
  SourceConfiguration,
  SourceTypes,
} from "../../../types";
import { useDataSources } from "./useDataSources";

describe(`useDataSources`, () => {
  const mockSources = new Array(13).fill({}).map((_, index) => ({
    data: new Array(17).fill("").map(
      (_, index) =>
        ({
          type: SourceTypes.EQUIVALENCE,
          value: {
            [`data ${index}`]: `data ${index}`,
          },
        } as EquivalenceInputSource)
    ),
    id: `source ${index}`,
  }));

  it(`renders without configuration`, () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    const expectedSource = mockSources[Math.floor(0.5 * 13)];
    const resultIndex = Math.floor(0.5 * 17);

    const { result } = renderHook(() => useDataSources(mockSources));
    expect(result.current).toEqual(
      expect.objectContaining({
        id: expectedSource.id,
        type: expectedSource.data[resultIndex].type,
        choice: Object.entries(expectedSource.data[resultIndex].value)[0],
      })
    );
  });
  it(`Renders no choice if there is no availabel choice`, () => {
    const configuration: SourceConfiguration = {
      initialized: true,
      hideMap: {},
      weightMap: {},
      deactivatedMap: mockSources.reduce(
        (acc, { id }) => ({ ...acc, [id]: true }),
        {}
      ),
    };
    const { result } = renderHook(() =>
      useDataSources(mockSources, configuration)
    );
    expect(result.current).toEqual(
      expect.objectContaining({
        type: SourceTypes.STATEMENT,
        choice: "No sources, go to options to select them",
        id: "__NO_CHOICE__",
      })
    );
  });
  describe(`with configuration`, () => {
    it(`hides source`, () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.5);

      const activeSourceId = mockSources[0].id;
      const configuration: SourceConfiguration = {
        initialized: true,
        hideMap: {},
        weightMap: {},
        deactivatedMap: mockSources.reduce(
          (acc, { id }) => ({ ...acc, [id]: id !== activeSourceId }),
          {}
        ),
      };
      const expectedSource = mockSources[0];
      const resultIndex = Math.floor(0.5 * 17);

      const { result } = renderHook(() =>
        useDataSources(mockSources, configuration)
      );

      expect(result.current).toEqual(
        expect.objectContaining({
          id: expectedSource.id,
          type: expectedSource.data[resultIndex].type,
          choice: Object.entries(expectedSource.data[resultIndex].value)[0],
        })
      );
    });
    it(`respects hidden data`, () => {
      const resultIndex = Math.floor(0.2 * 17);

      jest
        .spyOn(global.Math, "random")
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(0.2);

      const expectedSource = mockSources[0];

      const configuration: SourceConfiguration = {
        initialized: true,
        weightMap: {},
        hideMap: {
          [expectedSource.id]: {
            [getHashFromItem(expectedSource.data[resultIndex].value)]: true,
          },
        },
        deactivatedMap: {},
      };

      const { result } = renderHook(() =>
        useDataSources(mockSources, configuration)
      );

      expect(result.current).toEqual(
        expect.objectContaining({
          id: expectedSource.id,
          type: expectedSource.data[resultIndex].type,
          /**
           * actual index was hidden, it would land on the next one
           */
          choice: Object.entries(expectedSource.data[resultIndex + 1].value)[0],
        })
      );
    });
    it(`respects weighted data`, () => {
      const resultIndex = 1;

      jest
        .spyOn(global.Math, "random")
        .mockReturnValueOnce(0)
        // the new number is 1+ 6+ 15 due to the weight, we want the top weighted element
        .mockReturnValue(0.32);
      const expectedSource = mockSources[0];
      const hash = getHashFromItem(expectedSource.data[1].value);
      const configuration: SourceConfiguration = {
        initialized: true,
        hideMap: {},
        weightMap: {
          [expectedSource.id]: {
            [hash]: 6,
          },
        },
        deactivatedMap: {},
      };

      const { result } = renderHook(() =>
        useDataSources(mockSources, configuration)
      );

      const expectedData = expectedSource.data[2];

      expect(result.current).toEqual(
        expect.objectContaining({
          id: expectedSource.id,
          type: expectedData.type,

          /**
           * actual index was hidden, it would land on the next one
           */
          choice: Object.entries(expectedData.value)[0],
        })
      );
    });
  });
});
