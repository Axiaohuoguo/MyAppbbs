import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FriendlistPage } from './friendlist.page';

describe('FriendlistPage', () => {
  let component: FriendlistPage;
  let fixture: ComponentFixture<FriendlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
