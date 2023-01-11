import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentcardComponent } from './contentcard.component';

describe('ContentcardComponent', () => {
  let component: ContentcardComponent;
  let fixture: ComponentFixture<ContentcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
