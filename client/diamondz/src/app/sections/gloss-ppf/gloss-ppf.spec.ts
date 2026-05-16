import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossPpf } from './gloss-ppf';

describe('GlossPpf', () => {
  let component: GlossPpf;
  let fixture: ComponentFixture<GlossPpf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlossPpf],
    }).compileComponents();

    fixture = TestBed.createComponent(GlossPpf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
