import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { LocalStorageService } from 'src/app/@core/services/local-storage.service';
import { ElementRef, Renderer2 } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // Mocks
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockAuthService = {
    getRole: () => 'mesera' 
  };
  const mockLocalStorageService = {
    clearStorage: jasmine.createSpy('clearStorage')
  };
  const mockElementRef = {
    nativeElement: {
      classList: {
        contains: jasmine.createSpy('contains')
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ElementRef, useValue: mockElementRef }, // Usar el objeto simulado
        { provide: Renderer2, useValue: {} },
        { provide: AuthService, useValue: mockAuthService },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  xit('should set imgRole based on authService.getRole()', () => {
    expect(component.imgRole).toBe('../../../../assets/img/camarera.png'); 
  });

  xit('should toggle menu visibility', () => {
    const menuElement = mockElementRef.nativeElement;
    
    // Establecer el comportamiento deseado para la función contains
    menuElement.classList.contains.and.returnValue(false);
  
        // Initial state
        expect(menuElement.classList.contains('show')).toBeFalsy();

        // Show menu
        component.showMenu();
        expect(menuElement.classList.contains('show')).toBeTruthy();
    
        // Hide menu
        component.showMenu();
        expect(menuElement.classList.contains('show')).toBeFalsy();
  });
  xit('should clear storage and navigate to "/sign-in" on signOut', () => {
    component.signOut();
    expect(mockLocalStorageService.clearStorage).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sign-in']);
  });
});
