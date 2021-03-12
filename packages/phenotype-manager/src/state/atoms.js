import { atom } from "recoil";

const bundleAtom = atom({
  key: "phenotypeManagerBundle",
  default: {
    resourceType: "Bundle",
    entry: [],
  },
});

const selectedAtom = atom({
  key: "phenotypeManagerSelected",
  default: null,
});

export { bundleAtom, selectedAtom };
