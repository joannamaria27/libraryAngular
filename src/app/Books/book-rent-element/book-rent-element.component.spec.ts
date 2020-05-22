import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRentElementComponent } from './book-rent-element.component';

describe('BookRentElementComponent', () => {
  let component: BookRentElementComponent;
  let fixture: ComponentFixture<BookRentElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRentElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRentElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
