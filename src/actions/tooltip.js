/*
This action triggers a custom tooltip component to appear when a given element is hovered. You supply
the component (and any number of props) as input parameters to the action. 

Usage:

<div
  use=tooltip={{
    component: MyTooltip,
    props: {
      title: 'My Custom Tooltip'
    }
  }}
> Hover me </div>

The action will handle the positioning of the tooltip using Popper.js. Set the popper 
options in here to change where and how the tooltip gets positioned. 

At minimum, the custom tooltip component should have the following features:

<script>
  export let x;
  export let y;
</script>

<div id="tooltip" style="top: {y}px; left: {x}px;">
TOOL TIP CONTENT
</div>

<style>
  .tooltip {
    position: absolute;
  }
</style>

*/

import { createPopper } from "@popperjs/core";

export function tooltip(element, params = {}) {
  let tooltipRef;
  let popperRef;
  let tooltipComponent = params.component;
  let tooltipProps = params.props;

  function mouseOver(event) {
    tooltipRef = new tooltipComponent({
      props: {
        ...tooltipProps,
        x: event.pageX,
        y: event.pageY,
      },
      target: document.body,
    });

    let tooltip = document.querySelector("#tooltip");
    tooltip.setAttribute("data-show", "");
    popperRef = createPopper(element, tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  }

  function mouseMove(event) {
    // tooltipRef.$set({
    //   x: event.pageX,
    //   y: event.pageY,
    // });
  }

  function mouseLeave() {
    let tooltip = document.querySelector("#tooltip");
    tooltip.removeAttribute("data-show");

    if (popperRef) {
      popperRef.destroy();
      popperRef = null;
    }

    tooltipRef.$destroy();
  }

  element.addEventListener("mouseover", mouseOver);
  element.addEventListener("mouseleave", mouseLeave);
  element.addEventListener("mousemove", mouseMove);

  return {
    destroy() {
      element.removeEventListener("mouseover", mouseOver);
      element.removeEventListener("mouseleave", mouseLeave);
      element.removeEventListener("mousemove", mouseMove);
    },
  };
}
