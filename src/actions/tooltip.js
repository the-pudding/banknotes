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

The action will pass in the x,y coords of the mouse to the component, which can use that
to set the tooltip position. 

At minimum, the custom tooltip component should have the following features:

<script>
  export let x;
  export let y;
</script>

<div class="tooltip" style="top: {y}px; left: {x}px;">
TOOL TIP CONTENT
</div>

<style>
  .tooltip {
    position: absolute;
  }
</style>

*/

export function tooltip(element, params = {}) {
  let tooltipRef;
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
  }

  function mouseMove(event) {
    tooltipRef.$set({
      x: event.pageX,
      y: event.pageY,
    });
  }

  function mouseLeave() {
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
