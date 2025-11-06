import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingBoard } from './drawing-board';

describe('DrawingBoard', () => {
  let component: DrawingBoard;
  let fixture: ComponentFixture<DrawingBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawingBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
