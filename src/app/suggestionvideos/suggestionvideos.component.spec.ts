import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionvideosComponent } from './suggestionvideos.component';

describe('SuggestionvideosComponent', () => {
  let component: SuggestionvideosComponent;
  let fixture: ComponentFixture<SuggestionvideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionvideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
