import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoresettingPage } from './moresetting.page';

describe('MoresettingPage', () => {
  let component: MoresettingPage;
  let fixture: ComponentFixture<MoresettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoresettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoresettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
