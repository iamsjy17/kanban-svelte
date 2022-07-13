export function getClosest(
  el: HTMLElement,
  selector: string
): HTMLElement | null {
  let current = el;

  while (current.nodeType === 1) {
    if (current.matches(selector)) {
      return current;
    }

    current = current.parentElement || (current.parentNode as HTMLElement);
  }

  return null;
}
