import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpfInfoVisual } from './ppf-info-visual';

describe('PpfInfoVisual', () => {
  let component: PpfInfoVisual;
  let fixture: ComponentFixture<PpfInfoVisual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpfInfoVisual],
    }).compileComponents();

    fixture = TestBed.createComponent(PpfInfoVisual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
