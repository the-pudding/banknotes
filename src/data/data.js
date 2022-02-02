import banknotesCSV from "$data/banknotesData.csv";

export const rawData = banknotesCSV.map(d => {
  return {
    ...d,
    knownForBeingFirst: d.knownForBeingFirst === "Yes",
    billCount: +d.billCount,
    currentBillValue: +d.currentBillValue,
    firstAppearanceDate: +d.firstAppearanceDate,
    deathDate: +d.deathDate,
    appearanceDeathDiff: +d.appearanceDeathDiff,
    hasPortrait: d.hasPortrait === "true",
  };
});
