import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyartlistPage } from './myartlist.page';

describe('MyartlistPage', () => {
  let component: MyartlistPage;
  let fixture: ComponentFixture<MyartlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyartlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyartlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
