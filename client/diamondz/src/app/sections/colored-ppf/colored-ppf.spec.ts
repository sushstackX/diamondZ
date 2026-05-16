import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredPpf } from './colored-ppf';

describe('ColoredPpf', () => {
  let component: ColoredPpf;
  let fixture: ComponentFixture<ColoredPpf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoredPpf],
    }).compileComponents();

    fixture = TestBed.createComponent(ColoredPpf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
