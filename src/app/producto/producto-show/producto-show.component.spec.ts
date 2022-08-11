import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoShowComponent } from './producto-show.component';

describe('ProductoShowComponent', () => {
  let component: ProductoShowComponent;
  let fixture: ComponentFixture<ProductoShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
