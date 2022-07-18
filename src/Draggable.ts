export const DRAGGABLE_TYPE = 'data-draggable-type';
export const DROPZONE_TYPE = 'data-drop-type';

interface DragData {
  type: string;
  id: number;
}

export interface DraggableOption {
  type: string;
  id: number;
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
}

export interface DropZoneOption {
  type: string;
  onDrop?: (event: DragEvent, startId: number) => void;
}

export function draggable(node: HTMLElement, option: DraggableOption) {
  const handleDragStart = (event: DragEvent) => {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    const {type} = option;
    const id = Number(target.getAttribute(`data-${type}-id`));
    const data: DragData = {type, id};

    event.dataTransfer.setData('text/plain', JSON.stringify(data));
    target.classList.add('dragging');

    if (option?.onDragEnd) {
      option.onDragEnd(event);
    }
  };

  const handleDragEnd = (event: DragEvent) => {
    const target = event.target as HTMLElement;

    if (!target) {
      return;
    }

    target.classList.remove('dragging');

    if (option?.onDragStart) {
      option.onDragStart(event);
    }
  };

  node.draggable = true;
  node.setAttribute(DRAGGABLE_TYPE, option.type);
  node.setAttribute(`data-${option.type}-id`, option.id.toString());
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
    const {type, id} = data as DragData;
    const {type: dzType, onDrop} = option;

    if (type !== dzType) {
      return;
    }

    if (onDrop) {
      onDrop(event, id);
    }
  };

  node.setAttribute(DROPZONE_TYPE, option?.type);
  node.addEventListener('dragenter', handleDragEnter, true);
  node.addEventListener('dragleave', handleDragLeave, true);
  node.addEventListener('dragover', handleDragOver, true);
  node.addEventListener('drop', handleDrop, true);

  return {
    destroy() {
      node.removeEventListener('dragenter', handleDragEnter, true);
      node.removeEventListener('dragleave', handleDragLeave, true);
      node.removeEventListener('dragover', handleDragOver, true);
      node.removeEventListener('drop', handleDrop, true);
    },
  };
}
