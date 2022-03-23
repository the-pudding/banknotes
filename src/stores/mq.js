import { readable } from "svelte/store";

const breakpoints = {
  // screen size considered <key> if up to <value>
  sm: 600,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const queries = {
  sm: `(max-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.sm + 1}px) and (max-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.md + 1}px) and (max-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.lg + 1}px)`,
};

function calculateMedia(mqls) {
  const media = { classNames: "" };
  const mediaClasses = [];
  for (let name in mqls) {
    media[name] = mqls[name].matches;
    if (media[name]) mediaClasses.push(`mq-${name}`);
  }
  media.classNames = mediaClasses.join(" ");
  return media;
}

export default readable({}, set => {
  const mqls = {};
  const onChange = () => set(calculateMedia(mqls));

  for (let q in queries) {
    mqls[q] = window.matchMedia(queries[q]);
    mqls[q].addListener(onChange);
  }

  onChange();

  return () => {
    for (let q in mqls) {
      mqls[q].removeListener(onChange);
    }
  };
});
