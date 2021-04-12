import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSingleProductViewComponent } from './navbar-single-product-view.component';

describe('NavbarSingleProductViewComponent', () => {
  let component: NavbarSingleProductViewComponent;
  let fixture: ComponentFixture<NavbarSingleProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSingleProductViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSingleProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
