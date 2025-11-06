import { Component, ElementRef, ViewChild } from '@angular/core';
import { Box, Connection } from '../../../models/interface'; // Assuming you have a Box model defined in box.model.ts }

@Component({
  selector: 'app-white-board',
  standalone: false,
  templateUrl: './white-board.html',
  styleUrl: './white-board.css'
})
export class WhiteBoard {
  // Box layout values
  zoom = 1;
  contentSize = 800;

  boxWidth = 100;
  boxHeight = 80;
  leftRect = { offsetX: 0, offsetY: 40, w: 14, h: 18 };      // left rectangle
  rightCircle = { offsetX: 100, offsetY: 40, r: 8 };          // right circle

  boxes: Box[] = [
    { id: 1, x: 200, y: 300, label: 'A' },
    { id: 2, x: 600, y: 450, label: 'B' }
  ];

  connections: Connection[] = [
    {
      from: 1,
      to: 2
    }
  ];

  draggingBox: Box | null = null;
  dragOffsetX = 0;
  dragOffsetY = 0;

  // Connection drag state
  isConnecting = false;
  connectFromBox: Box | null = null;
  tempLine = { x1: 0, y1: 0, x2: 0, y2: 0 };

  @ViewChild('workspace', { static: true }) workspaceRef!: ElementRef<HTMLDivElement>;

  onMouseDown(box: Box, event: MouseEvent) {
    // Only drag the box if not starting a connection
    if (!this.isConnecting && !(event.target as HTMLElement).classList.contains('right-circle')) {
      event.preventDefault();
      this.draggingBox = box;
      this.dragOffsetX = event.clientX - box.x * this.zoom;
      this.dragOffsetY = event.clientY - box.y * this.zoom;
      box.isDragging = true;
    }
  }

  onCircleMouseDown(box: Box, event: MouseEvent) {
    // Start connection drag from this box
    event.stopPropagation();
    this.isConnecting = true;
    this.connectFromBox = box;
    // Start point: right circle center
    const x1 = (box.x + this.rightCircle.offsetX) * this.zoom;
    const y1 = (box.y + this.rightCircle.offsetY) * this.zoom;
    this.tempLine = { x1, y1, x2: x1, y2: y1 };
  }

  onMouseMove(event: MouseEvent) {
    if (this.draggingBox && this.draggingBox.isDragging) {
      this.draggingBox.x = (event.clientX - this.dragOffsetX) / this.zoom;
      this.draggingBox.y = (event.clientY - this.dragOffsetY) / this.zoom;
    }
    if (this.isConnecting && this.connectFromBox) {
      // Update line to follow mouse
      this.tempLine.x2 = event.offsetX;
      this.tempLine.y2 = event.offsetY;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (this.draggingBox) {
      this.draggingBox.isDragging = false;
      this.draggingBox = null;
    }
    if (this.isConnecting && this.connectFromBox) {
      // Get mouse position relative to workspace
      const rect = this.workspaceRef.nativeElement.getBoundingClientRect();
      const mouseX = (event.clientX - rect.left) / this.zoom;
      const mouseY = (event.clientY - rect.top) / this.zoom;

      // Check if mouse is over a rectangle (left-rect of any box except the source)
      const targetBox = this.getBoxUnderRect(mouseX, mouseY, this.connectFromBox.id);
      if (targetBox) {
        // Add the connection!
        this.connections.push({
          from: this.connectFromBox.id,
          to: targetBox.id
        });
      }
      // Reset connection drag state
      this.isConnecting = false;
      this.connectFromBox = null;
      this.tempLine = { x1: 0, y1: 0, x2: 0, y2: 0 };
    }
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    const zoomFactor = 0.1;
    if (event.deltaY < 0) {
      this.zoom = Math.min(this.zoom + zoomFactor, 3);
    } else {
      this.zoom = Math.max(this.zoom - zoomFactor, 0.3);
    }
  }

  // Utility: detect if mouse is over a left rectangle of any box except the source
  getBoxUnderRect(x: number, y: number, excludeId: number): Box | null {
    for (const box of this.boxes) {
      if (box.id === excludeId) continue;
      // Rectangle is offset from box.x, box.y
      const rectX = box.x - 8; // left-rect at left: -8px
      const rectY = box.y + 40 - 9; // center at y + 40, height 18px, so top is y + 40 - 9
      if (
        x >= rectX &&
        x <= rectX + 14 &&
        y >= rectY &&
        y <= rectY + 18
      ) {
        return box;
      }
    }
    return null;
  }

  getConnectionPoints(conn: Connection) {
    const fromBox = this.boxes.find(b => b.id === conn.from)!;
    const toBox = this.boxes.find(b => b.id === conn.to)!;
    return {
      x1: (fromBox.x + this.rightCircle.offsetX) * this.zoom,
      y1: (fromBox.y + this.rightCircle.offsetY) * this.zoom,
      x2: (toBox.x + this.leftRect.offsetX + this.leftRect.w / 2) * this.zoom,
      y2: (toBox.y + this.leftRect.offsetY + this.leftRect.h / 2) * this.zoom
    };
  }
}
