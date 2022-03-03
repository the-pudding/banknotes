import Heading from "$components/common/Heading.svelte";
import Hero from "$components/Hero.svelte";
import LearnMore from "$components/common/LearnMore.svelte";
import Methods from "$components/common/Methods.svelte";
import PortraitBox from "$components/common/PortraitBox.svelte";
import SlideShow from "$components/common/SlideShow.svelte";
import TextBasic from "$components/common/TextBasic.svelte";

import VizBanknotes from "$components/visualizations/Banknotes/VizBanknotes.svelte";
import VizDenominations from "$components/visualizations/Denominations/VizDenominations.svelte";
import VizSummary from "$components/visualizations/Summary/VizSummary.svelte";
import VizFirsts from "$components/visualizations/Firsts/VizFirsts.svelte";
import VizOccupation from "$components/visualizations/Occupation/VizOccupation.svelte";

import Null from "$components/common/Null.svelte";

const vizMap = {
  // <id from copy doc>: <component>
  banknotesViz: VizBanknotes,
  denominationsViz: VizDenominations,
  firstsViz: VizFirsts,
  summaryViz: VizSummary,
  // issueDateViz: VizIssueDate,
};

export function getComponent(copyEntry) {
  /*
   Copy entries from the googleDoc are mapped to specfic components. For each
   entry, return the appropriate component and component properties based on 
   the entrie's 'type' and 'value'
  */
  const { type, value } = copyEntry;
  switch (type) {
    case "heading": // <-- type property from converted gDoc copy object
      return {
        name: "Heading",
        cmp: Heading,
        props: { title: value.text },
      };
    case "hero":
      return {
        name: "Hero",
        cmp: Hero,
        props: { title: value.title, subtitle: value.subtitle },
      };
    case "learnMore":
      return {
        name: "LearnMore",
        cmp: LearnMore,
        props: { title: value.title, text: value.text },
      };
    case "methods":
      return {
        name: "Methods",
        cmp: Methods,
        props: { text: value.map(d => d.value) },
      };
    case "portraitBox":
      return {
        name: "PortraitBox",
        cmp: PortraitBox,
        props: { portraitID: value.portraitID, text: value.text },
      };
    case "textBasic":
      return {
        name: "TextBasic",
        cmp: TextBasic,
        props: { text: value.map(d => d.value) },
      };
    case "slideShow":
      return {
        name: "SlideShow",
        cmp: SlideShow,
        props: { images: value.images },
      };
    case "viz":
      return {
        name: value.id,
        cmp: vizMap[value.id],
        props: { props: value },
      };
    default:
      console.log(`count not find component to match type ${type}`);
      return {
        name: "Null",
        cmp: Null,
        props: { name: type },
      };
  }
}
