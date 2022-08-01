import {getClosest} from './util';

export const DRAGGABLE_TYPE = 'data-draggable-type';
export const DROPZONE_TYPE = 'data-drop-type';

/**
 * 드래그 가능한 축
 *
 * - horizontal: 수평
 * - vertical: 수직
 * - both: 둘 다, 대각선 이동도 가능
 */
type DragAxis = 'horizontal' | 'vertical' | 'both';

/**
 * Drop Target Item 기준의 Item 삽입 위치
 *
 * - before
 * - after
 */
type DropPosition = 'before' | 'after';

interface DragData {
  type: string;
  id: string;
}

export interface DraggableOption {
  type: string;
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
}

export interface DropZoneOption {
  type: string;
  axis: DragAxis;
  onDrop?: (srcId: string, destId?: string, positon?: DropPosition) => void;
}

export function draggable(node: HTMLElement, option: DraggableOption) {
  const handleDragStart = (event: DragEvent) => {
    event.stopPropagation();
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    const {type} = option;
    const id = target.getAttribute(`data-${type}-id`);
    const data: DragData = {type, id};

    event.dataTransfer.setData('text/plain', JSON.stringify(data));
    target.classList.add('dragging');

    if (option?.onDragStart) {
      option.onDragStart(event);
    }
  };

  const handleDragEnd = (event: DragEvent) => {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    target.classList.remove('dragging');

    if (option?.onDragEnd) {
      option.onDragEnd(event);
    }
  };

  node.draggable = true;
  node.setAttribute(DRAGGABLE_TYPE, option.type);
  node.addEventListener('dragstart', handleDragStart);
  node.addEventListener('dragend', handleDragEnd);

  return {
    destroy() {
      node.removeEventListener('dragstart', handleDragStart);
      node.removeEventListener('dragend', handleDragEnd);
    },
  };
}

export function dropzone(node: HTMLElement, option: DropZoneOption) {
  const handleDragEnter = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    if (target.classList.contains('dropzone')) {
      target.classList.add('drag-over');
    }
  };

  const handleDragLeave = (event: DragEvent) => {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    if (target.classList.contains('dropzone')) {
      target.classList.remove('drag-over');
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();

    const json = event.dataTransfer.getData('text/plain');
    const data: unknown = JSON.parse(json);
    const {type, id: srcId} = data as DragData;
    const {type: dzType, axis, onDrop} = option;

    if (type !== dzType) {
      return;
    }

    event.stopPropagation();

    if (onDrop) {
      const destEl = getClosest(
        event?.target as HTMLElement,
        `[${DRAGGABLE_TYPE}="${dzType}"]`
      );
      let destId;
      let dropPosition: DropPosition = 'before';

      if (destEl) {
        destId = destEl.getAttribute(`data-${dzType}-id`);
        const destRect = destEl.getBoundingClientRect();

        if (axis === 'horizontal') {
          const {left, right} = destRect;
          const middle = (left + right) / 2;

          if (event.clientX > middle) {
            dropPosition = 'after';
          }
        } else if (axis === 'vertical') {
          const {top, bottom} = destRect;
          const middle = (top + bottom) / 2;

          if (event.clientY > middle) {
            dropPosition = 'after';
          }
        }
      }

      onDrop(srcId, destId, dropPosition);
    }
  };

  node.setAttribute(DROPZONE_TYPE, option?.type);
  node.addEventListener('dragenter', handleDragEnter, true);
  node.addEventListener('dragleave', handleDragLeave, true);
  node.addEventListener('dragover', handleDragOver, true);
  node.addEventListener('drop', handleDrop);

  return {
    destroy() {
      node.removeEventListener('dragenter', handleDragEnter, true);
      node.removeEventListener('dragleave', handleDragLeave, true);
      node.removeEventListener('dragover', handleDragOver, true);
      node.removeEventListener('drop', handleDrop, true);
    },
  };
}
