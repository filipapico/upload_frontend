import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentformComponent } from './commentform.component';

describe('CommentformComponent', () => {
  let component: CommentformComponent;
  let fixture: ComponentFixture<CommentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
