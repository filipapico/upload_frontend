import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionlistComponent } from './suggestionlist.component';

describe('SuggestionlistComponent', () => {
  let component: SuggestionlistComponent;
  let fixture: ComponentFixture<SuggestionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
