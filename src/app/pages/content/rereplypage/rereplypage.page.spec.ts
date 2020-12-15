import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RereplypagePage } from './rereplypage.page';

describe('RereplypagePage', () => {
  let component: RereplypagePage;
  let fixture: ComponentFixture<RereplypagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RereplypagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RereplypagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
