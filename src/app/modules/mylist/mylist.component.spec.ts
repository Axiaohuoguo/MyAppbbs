import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MylistComponent } from './mylist.component';

describe('MylistComponent', () => {
  let component: MylistComponent;
  let fixture: ComponentFixture<MylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MylistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
