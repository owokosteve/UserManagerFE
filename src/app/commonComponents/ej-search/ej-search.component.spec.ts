import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjSearchComponent } from './ej-search.component';

describe('EjSearchComponent', () => {
  let component: EjSearchComponent;
  let fixture: ComponentFixture<EjSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EjSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
