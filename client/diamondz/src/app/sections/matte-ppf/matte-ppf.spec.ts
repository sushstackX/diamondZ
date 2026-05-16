import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MattePpf } from './matte-ppf';

describe('MattePpf', () => {
  let component: MattePpf;
  let fixture: ComponentFixture<MattePpf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MattePpf],
    }).compileComponents();

    fixture = TestBed.createComponent(MattePpf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
