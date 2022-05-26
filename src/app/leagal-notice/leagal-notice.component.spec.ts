import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagalNoticeComponent } from './leagal-notice.component';

describe('LeagalNoticeComponent', () => {
  let component: LeagalNoticeComponent;
  let fixture: ComponentFixture<LeagalNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeagalNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
