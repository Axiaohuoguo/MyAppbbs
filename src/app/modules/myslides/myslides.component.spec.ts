import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyslidesComponent } from './myslides.component';

describe('MyslidesComponent', () => {
  let component: MyslidesComponent;
  let fixture: ComponentFixture<MyslidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyslidesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyslidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
