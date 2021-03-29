import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsNoLoginComponent } from './products-no-login.component';

describe('ProductsNoLoginComponent', () => {
  let component: ProductsNoLoginComponent;
  let fixture: ComponentFixture<ProductsNoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsNoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
