import fs from "fs";
import archieml from "archieml";
import fetch from "node-fetch";
import docs from "../google.config.js";
import csv from "csvtojson";
import fastcsv from "fast-csv";

const CWD = process.cwd();

const fetchGoogle = async ({ id, gid }) => {
  console.log(`fetching...${id}`);

  const base = "https://docs.google.com";
  const post = gid
    ? `spreadsheets/u/1/d/${id}/export?format=csv&id=${id}&gid=${gid}`
    : `document/d/${id}/export?format=txt`;
  const url = `${base}/${post}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    if (gid) return text;

    const parsed = archieml.load(text);
    const str = JSON.stringify(parsed);
    return str;
  } catch (err) {
    throw new Error(err);
  }
};

(async () => {
  for (let d of docs) {
    try {
      const str = await fetchGoogle(d);
      const file = `${CWD}/${d.filepath}`;
      fs.writeFileSync(file, str);
    } catch (err) {
      console.log(err);
    }
  }

  processData();
})();

const processData = async () => {
  console.log(`processing data...`);

  // any additional data processing steps you want to run anytime the data is pulled
  // Figure out which rows from data have have corresponding portraits
  const portraitsFolder = "static/assets/images/portraits";
  let data = await csv().fromFile("src/data/banknotesData.csv");
  let nameIDs = await csv().fromFile("src/data/nameIDs.csv");

  // get a list of portraits
  let portraits = [];
  fs.readdirSync(portraitsFolder).forEach(file => {
    if (/\.png/.test(file)) {
      portraits.push(file);
    }
  });

  // add hasPortrait prop to data
  data = data.map(d => {
    const id = nameIDs.find(dd => dd.name === d.name).country_nameID;
    const portraitName = `${id}_300.png`;
    let portraitFile = portraits.find(dd => dd === portraitName);
    const hasPortrait = portraitFile !== undefined;
    return {
      ...d,
      hasPortrait,
      id,
    };
  });

  // write data back to disk
  const ws = fs.createWriteStream("src/data/banknotesData.csv");
  fastcsv.write(data, { headers: true }).pipe(ws);
};
