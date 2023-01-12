import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestioncardComponent } from './suggestioncard.component';

describe('SuggestioncardComponent', () => {
  let component: SuggestioncardComponent;
  let fixture: ComponentFixture<SuggestioncardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestioncardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestioncardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
