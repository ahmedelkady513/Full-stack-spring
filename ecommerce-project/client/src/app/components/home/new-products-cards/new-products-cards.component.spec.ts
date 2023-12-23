import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductsCardsComponent } from './NewProductsCardsComponent';

describe('NewProductsCardsComponent', () => {
  let component: NewProductsCardsComponent;
  let fixture: ComponentFixture<NewProductsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductsCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewProductsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
