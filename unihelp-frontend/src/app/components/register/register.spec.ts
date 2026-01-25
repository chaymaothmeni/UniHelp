import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component'; // <-- notez le nom exact

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent] // <-- utiliser 'declarations', pas 'imports' pour un composant
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
