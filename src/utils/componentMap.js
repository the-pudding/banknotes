import Heading from "$components/common/Heading.svelte";
import TextBasic from "$components/common/TextBasic.svelte";
import TextAndImages from "$components/common/TextAndImages.svelte";
import InlineFigure from "$components/common/InlineFigure.svelte";
import VizOccupation from "$components/visualizations/VizOccupation.svelte";
import VizFirsts from "$components/visualizations/Firsts/VizFirsts.svelte";
import VizDenominations from "$components/visualizations/Denominations/VizDenominations.svelte";

import Null from "$components/common/Null.svelte";

const vizMap = {
  // <id from copy doc>: <component>
  occupationViz: VizOccupation,
  firstsViz: VizFirsts,
  denominationsViz: VizDenominations,
};

export function getComponent(copyEntry) {
  /*
   Copy entries from the googleDoc are mapped to specfic components. For each
   entry, return the appropriate component and component properties based on 
   the entries type and value
  */
  const { type, value } = copyEntry;
  switch (type) {
    case "heading": // <-- type property from converted gDoc copy object
      return {
        name: "Heading",
        cmp: Heading,
        props: { title: value.title },
      };
    case "text":
      return {
        name: "TextBasic",
        cmp: TextBasic,
        props: { text: value },
      };
    case "textAndImages":
      return {
        name: "TextAndImages",
        cmp: TextAndImages,
        props: { text: value.text, images: value.images },
      };
    case "image":
      return {
        name: "InlineFigure",
        cmp: InlineFigure,
        props: { img: value.id, alt: value.caption },
      };
    case "viz":
      return {
        name: value.id,
        cmp: vizMap[value.id],
        props: {},
      };
    default:
      console.log(`count not find component to match type ${type}`);
      return {
        name: "Null",
        cmp: Null,
        props: {},
      };
  }
}
