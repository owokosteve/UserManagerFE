import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteBoard } from './white-board';

describe('WhiteBoard', () => {
  let component: WhiteBoard;
  let fixture: ComponentFixture<WhiteBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhiteBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
