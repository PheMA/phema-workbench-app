import { Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export const PhenotypeToaster = Toaster.create({
  className: "phenotype-toaster",
  position: Position.TOP,
});
