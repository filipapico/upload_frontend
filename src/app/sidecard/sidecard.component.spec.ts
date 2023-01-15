import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidecardComponent } from './sidecard.component';

describe('SidecardComponent', () => {
  let component: SidecardComponent;
  let fixture: ComponentFixture<SidecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
