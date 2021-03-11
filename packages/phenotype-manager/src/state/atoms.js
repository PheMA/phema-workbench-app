import { atom } from "recoil";

import data from "../state/data";

const bundleAtom = atom({
  key: "phenotypeManagerBundle",
  default: data,
});

const selectedAtom = atom({
  key: "phenotypeManagerSelected",
  default: null,
});

export { bundleAtom, selectedAtom };
