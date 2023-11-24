import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInComponent } from './sign-in.component';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { requestHandler } from '../../utils/requestHandler.service';
import { requestResponse } from 'src/app/shared/interfaces';

describe('SignInComponent', () => {
  let fixture: ComponentFixture<SignInComponent>;
  let authService: AuthService;
  let reqHandler: requestHandler

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, requestHandler],
    });
    fixture = TestBed.createComponent(SignInComponent);
    authService = TestBed.inject(AuthService);
    reqHandler = TestBed.inject(requestHandler);
    fixture.detectChanges();
  });

  it('if the user click in button without email should appear next message "ingrese su email"', () => {
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('#cont-form');
    
    const event = new Event('submit', {
      'bubbles'    : true,
      'cancelable' : true
    });  
    
    form.dispatchEvent( event );
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#email-error');
    expect(errorElement.innerHTML).toEqual('Ingrese su email');
  });

  it('if the user click in button without password should appear next message "Ingrese su contraseña"', () => {
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('#cont-form');
    
    const event = new Event('submit', {
      'bubbles'    : true,
      'cancelable' : true
    });  
    
    form.dispatchEvent( event );
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('#empty-pwd');
    expect(errorElement.innerHTML).toEqual('Ingrese su contraseña');
  });

  it('if the user click in button if email is not valid should appear next message "ingrese su email"', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    emailInputElement.value = 'Hola';
    emailInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
    const event = new Event('submit', {
      'bubbles'    : true,
      'cancelable' : true
    });  
    
    form.dispatchEvent( event );
    await fixture.whenStable();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#email-error');
    expect(errorElement.innerHTML).toEqual('Ingrese su email');
  });

  it('if the user click in button and the request fails should appear the api message', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    emailInputElement.value = 'anita.borg@systers.xyz';
    emailInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();
    const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
    passlInputElement.value = 'qwertyuio';
    passlInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
    const event = new Event('submit', {
      'bubbles'    : true,
      'cancelable' : true
    });  
    const errorResponse = new HttpErrorResponse({ error: 'Este mensaje viene del api' });
    spyOn(authService, 'login').and.callFake(() => {
        return of({ isLoading: false, error: errorResponse, data: null})
    });

    
    form.dispatchEvent( event );
    await fixture.whenStable();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#error-message');
    expect(errorElement.innerHTML).toEqual('Este mensaje viene del api');
  });

  it('if the user click in button if the api message is "Incorrect password" should appear the next message "Credenciales Inválidas"', 
  async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    emailInputElement.value = 'anita.borg@systers.xyz';
    emailInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();
    const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
    passlInputElement.value = 'qwertyuio';
    passlInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
    const event = new Event('submit', {
      'bubbles'    : true,
      'cancelable' : true
    });  
    const errorResponse = new HttpErrorResponse({status:404, statusText:"'Incorrect password'", error: 'Incorrect password' });
    spyOn(authService, 'login').and.callFake(() => {
      return of({ isLoading: false, error: errorResponse, data: null})
    });
    
    form.dispatchEvent( event );
    await fixture.whenStable();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#error-message');
    expect(errorElement.innerHTML).toEqual('Credenciales Inválidas');
  });

  it('if the user click in button if the api message is "Cannot find user" should appear the next message "Credenciales Inválidas"', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    emailInputElement.value = 'anita.borg@systers.xyz';
    emailInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();
    const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
    passlInputElement.value = 'qwertyuio';
    passlInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
    const event = new Event('submit', {
      'bubbles'    : true,
      'cancelable' : true
    });  
    const errorResponse = new HttpErrorResponse({ error: 'Incorrect password' });
    spyOn(authService, 'login').and.callFake(() => {
        return of({ isLoading: false, error: errorResponse, data: null})
    });

    
    form.dispatchEvent( event );
    await fixture.whenStable();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#error-message');
    expect(errorElement.innerHTML).toEqual('Credenciales Inválidas');
  });

  it('if the user click in button if email and password are valid authService.systemUser$.email should be the email that user types', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
    emailInputElement.value = 'anita.borg@systers.xyz';
    emailInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();
    const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
    passlInputElement.value = 'qwertyuio';
    passlInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
    const event = new Event('submit', {
      'bubbles'    : true,
      'cancelable' : true
    });  
  
    spyOn(reqHandler, 'makeCall').and.callFake(() => 
        of({isLoading:false, error:null, data:{user: {
            id: 1,
            role: 'user',
            email: 'anita.borg@systers.xyz',
          },
          accessToken: 'mockAccessToken'
        }}) as Observable<requestResponse<any>>
    );
    
    form.dispatchEvent( event );
    await fixture.whenStable();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('#error-message');
    expect(errorElement).toBeNull();

    expect(authService.getSystemUser().email).toBe('anita.borg@systers.xyz');
  });

  it('if the user click in button show-pwd the input must show the text', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const pwdInputElement = fixture.debugElement.nativeElement.querySelector('#password');
    pwdInputElement.value = 'Hola';
    pwdInputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pwdInputElement.type).toEqual('password');
    
    const showPwdButton = fixture.debugElement.nativeElement.querySelector('#show-pwd');
    const event = new Event('click');  
    showPwdButton.dispatchEvent( event );
    fixture.detectChanges();

    expect(pwdInputElement.type).toEqual('text');

    showPwdButton.dispatchEvent( event );
    fixture.detectChanges();

    expect(pwdInputElement.type).toEqual('password');


  });
});
