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

const POS_UNIT = 65535; // 2^16 - 1

export function getPos(leftPos = 0, rightPos?: number): number {
  if (!rightPos) {
    return leftPos + POS_UNIT;
  }

  return (leftPos + rightPos) / 2;
}
