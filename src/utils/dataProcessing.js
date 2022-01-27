import * as d3 from "d3";

export const normRankBills = bills => {
  /* 
  given an array representing bill data from a particular country, rank the bills
  from smallest to largest, and then normalize the ranks to the range [0,1]. Add the 
  normalized rank value to the original bills array and return

  Bill ranks are normalized to allow comparisons between countries. If not normalized, the 
  rank would be dependent on the number of bills per country, which varies across the
  countries in the dataset. 
  */
  // make ranked array of UNIQUE bill values
  const billRanks = Array.from(new Set(bills.map(d => d.billValue)))
    .sort((a, b) => d3.ascending(a, b))
    .map((d, i) => ({ rank: i + 1, val: d }));

  // scale to normalize a given bill to the range 0-1 based on the bill's rank
  const norm = d3
    .scaleLinear()
    .domain(d3.extent(billRanks, d => d.rank))
    .range([0, 1]);

  // get normalized rank for all bills
  return bills.map(bill => {
    // get the rank for this bill based on it's value
    const billRank = billRanks.find(d => d.val === bill.billValue).rank;
    return {
      ...bill,
      normRank: norm(billRank), // <- return the normaized bill rank
    };
  });
};
