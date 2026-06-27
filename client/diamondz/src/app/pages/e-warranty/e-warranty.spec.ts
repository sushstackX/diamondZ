import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EWarranty } from './e-warranty';

describe('EWarranty', () => {
  let component: EWarranty;
  let fixture: ComponentFixture<EWarranty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EWarranty],
    }).compileComponents();

    fixture = TestBed.createComponent(EWarranty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
