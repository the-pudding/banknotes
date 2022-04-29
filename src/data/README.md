Data for The Pudding essay [Who's in Your Wallet?](https://pudding.cool/2022/04/banknotes/) published April 2022

Each row in `banknotesData.csv` represents a unique banknote + person combination. 

## Variables

| Variable | Description |
| --- | --- |
| `country` | Country name |
| `countryAbbr` | 3-letter country abbreviation |
| `currencyName` | local name of currency (e.g. `Peso`) |
| `name` | Name of person depicted on banknote |
| `gender` | Gender of the person depicted |
| `profession` | Profession of the person depicted |
| `	knownForBeingFirst` | Whether or not the person is known for being a "first" or not (possible values: `Yes`, `No`) |
| `currentBillValue` | Value of the banknote in local currency |
| `propTotalBills` | Proportion (for this currency) of total bills in circulation |
| `firstAppearanceDate` | Year when person first appeared on banknote |
| `deathDate` | Year when person died |
| `appearanceDeathDiff` | Number of years between `firstAppearanceDate` and `deathDate` |
| `comments` | misc. notes about this individual |
| `hoverText` | tooltip text for this banknote/person |
| `hasPortrait` | whether or not we have a portrait image associated with this individual (possible values: `TRUE` or `FALSE`) |
| `id` | unique id assigned to this individual |