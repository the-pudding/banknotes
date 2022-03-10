const upperLimit = 2050;

export const chartSteps = [
  {
    // step1 - hannibal
    xRange: [-200, upperLimit],
    yRange: [0, 2500],
    xAxisStep: 200,
    yAxisStep: 200,
  },
  {
    // step2 - s.korea
    xRange: [1200, upperLimit],
    yRange: [0, 700],
    xAxisStep: 200,
    yAxisStep: 150,
  },
  {
    // step3 - ?
    xRange: [1200, upperLimit],
    yRange: [0, 700],
    xAxisStep: 200,
    yAxisStep: 150,
  },
  {
    // step4 - shortest
    xRange: [1800, upperLimit],
    yRange: [-100, 100],
    xAxisStep: 25,
    yAxisStep: 50,
  },
  {
    // step5
    xRange: [1875, upperLimit],
    yRange: [-50, 10],
    xAxisStep: 25,
    yAxisStep: 10,
  },
];

export const defaultChart = {
  xRange: [-200, upperLimit],
  yRange: [0, 2500],
  xAxisStep: 200,
  yAxisStep: 200,
};
