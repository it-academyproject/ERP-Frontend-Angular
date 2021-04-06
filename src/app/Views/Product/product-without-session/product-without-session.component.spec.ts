import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWithoutSessionComponent } from './product-without-session.component';

describe('ProductWithoutSessionComponent', () => {
  let component: ProductWithoutSessionComponent;
  let fixture: ComponentFixture<ProductWithoutSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWithoutSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWithoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
