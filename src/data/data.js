import banknotesCSV from "$data/banknotesData.csv";

export const rawData = banknotesCSV.map(d => {
  return {
    ...d,
    knownForBeingFirst: d.knownForBeingFirst === "Yes",
    billCount: +d.billCount,
    currentBillValue: +d.currentBillValue,
    firstAppearanceDate: new Date(d.firstAppearanceDate, 0, 2), //  <-- make Jan 2nd so year isn't messed up by timezone
    deathDate: new Date(d.deathDate, 0, 2),
    appearanceDeathDiff: +d.appearanceDeathDiff,
  };
});
