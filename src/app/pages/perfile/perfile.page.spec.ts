import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilePage } from './perfile.page';

describe('PerfilePage', () => {
  let component: PerfilePage;
  let fixture: ComponentFixture<PerfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
