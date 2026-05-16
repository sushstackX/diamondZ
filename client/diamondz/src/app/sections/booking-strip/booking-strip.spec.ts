import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStrip } from './booking-strip';

describe('BookingStrip', () => {
  let component: BookingStrip;
  let fixture: ComponentFixture<BookingStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStrip],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingStrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
