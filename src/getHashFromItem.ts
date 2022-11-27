import { v5 as uuidv5 } from "uuid";

export function getHashFromItem(item: any) {
  const ITEM_NS = "915b67d4-725c-4145-b254-36117f5f79a1";
  return uuidv5(JSON.stringify(item), ITEM_NS);
}
