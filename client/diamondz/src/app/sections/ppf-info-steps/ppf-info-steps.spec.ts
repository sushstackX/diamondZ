import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpfInfoSteps } from './ppf-info-steps';

describe('PpfInfoSteps', () => {
  let component: PpfInfoSteps;
  let fixture: ComponentFixture<PpfInfoSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpfInfoSteps],
    }).compileComponents();

    fixture = TestBed.createComponent(PpfInfoSteps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
