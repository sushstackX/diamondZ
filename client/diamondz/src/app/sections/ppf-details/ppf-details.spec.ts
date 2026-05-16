import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpfDetails } from './ppf-details';

describe('PpfDetails', () => {
  let component: PpfDetails;
  let fixture: ComponentFixture<PpfDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpfDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(PpfDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
