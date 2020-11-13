import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublishlistmdalComponent } from './publishlistmdal.component';

describe('PublishlistmdalComponent', () => {
  let component: PublishlistmdalComponent;
  let fixture: ComponentFixture<PublishlistmdalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishlistmdalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishlistmdalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
