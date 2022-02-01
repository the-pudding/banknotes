import banknotesCSV from "$data/banknotesData.csv";
import nameIDs from "$data/nameIDs.csv";

export const rawData = banknotesCSV.map(d => {
  // get the nameID for this individual
  let id = nameIDs.find(dd => dd.name === d.name).country_nameID;

  return {
    ...d,
    id: id,
    knownForBeingFirst: d.knownForBeingFirst === "Yes",
    billCount: +d.billCount,
    currentBillValue: +d.currentBillValue,
    firstAppearanceDate: +d.firstAppearanceDate,
    deathDate: +d.deathDate,
    appearanceDeathDiff: +d.appearanceDeathDiff,
  };
});
