import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelplayerComponent } from './channelplayer.component';

describe('ChannelplayerComponent', () => {
  let component: ChannelplayerComponent;
  let fixture: ComponentFixture<ChannelplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
