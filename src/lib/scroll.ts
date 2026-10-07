export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Click handler for in-page anchors: smooth-scrolls instead of jumping. */
export function onAnchorClick(id: string, after?: () => void) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    after?.();
    scrollToId(id);
  };
}
