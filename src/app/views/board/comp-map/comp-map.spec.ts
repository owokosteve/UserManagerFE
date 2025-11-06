import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMap } from './comp-map';

describe('CompMap', () => {
  let component: CompMap;
  let fixture: ComponentFixture<CompMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
