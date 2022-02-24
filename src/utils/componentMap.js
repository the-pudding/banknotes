import Hero from "$components/Hero.svelte";

import Null from "$components/common/Null.svelte";

const vizMap = {
  // <id from copy doc>: <component>
  // occupationViz: VizOccupation,
  // firstsViz: VizFirsts,
  // denominationsViz: VizDenominations,
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
    case "hero":
      return {
        name: "Hero",
        cmp: Hero,
        props: { title: value.title, subtitle: value.subtitle },
      };
    case "heading": // <-- type property from converted gDoc copy object
      return {
        name: "Heading",
        cmp: Heading,
        props: { title: value.title },
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
        props: { name: type },
      };
  }
}
