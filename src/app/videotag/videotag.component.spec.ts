import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideotagComponent } from './videotag.component';

describe('VideotagComponent', () => {
  let component: VideotagComponent;
  let fixture: ComponentFixture<VideotagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideotagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideotagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
