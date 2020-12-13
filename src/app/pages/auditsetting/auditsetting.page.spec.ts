import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuditsettingPage } from './auditsetting.page';

describe('AuditsettingPage', () => {
  let component: AuditsettingPage;
  let fixture: ComponentFixture<AuditsettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditsettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuditsettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
