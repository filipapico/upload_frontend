import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicsComponent } from './thematics.component';

describe('ThematicsComponent', () => {
  let component: ThematicsComponent;
  let fixture: ComponentFixture<ThematicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThematicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
