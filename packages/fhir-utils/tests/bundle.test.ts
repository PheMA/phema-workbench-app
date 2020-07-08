import { BundleUtils } from "../src";

const bundle = require("./fixtures/bundle.test.json");

test("Gets CodeSystems out of Bundle", () => {
  const codeSystems = BundleUtils.extractResources(bundle, ["CodeSystem"]);

  expect(codeSystems).toMatchSnapshot();
});
