// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { SignInComponent } from './sign-in.component';
// import { AuthService, Credentials } from 'src/app/@core/authentication/services/auth.service';
// import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

// describe('SignInComponent', () => {
//   let fixture: ComponentFixture<SignInComponent>;
//   let authService: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [SignInComponent],
//       imports: [ReactiveFormsModule, RouterTestingModule, HttpClientModule],
//       providers: [AuthService],
//     });
//     fixture = TestBed.createComponent(SignInComponent);
//     authService = TestBed.inject(AuthService);
//     fixture.detectChanges();
//   });

//   it('if the user click in button without email should appear next message "ingrese su email"', () => {
//     fixture.detectChanges();
//     const form = fixture.nativeElement.querySelector('#cont-form');
    
//     const event = new Event('submit', {
//       'bubbles'    : true,
//       'cancelable' : true
//     });  
//     // Dispatch thine event unto thine form
//     form.dispatchEvent( event );
//     fixture.detectChanges();

//     const errorElement = fixture.nativeElement.querySelector('#email-error');
//     expect(errorElement.innerHTML).toEqual('Ingrese su email');
//   });

//   it('if the user click in button without password should appear next message "Ingrese su contraseña"', () => {
//     fixture.detectChanges();
//     const form = fixture.nativeElement.querySelector('#cont-form');
    
//     const event = new Event('submit', {
//       'bubbles'    : true,
//       'cancelable' : true
//     });  
//     // Dispatch thine event unto thine form
//     form.dispatchEvent( event );
//     fixture.detectChanges();
//     const errorElement = fixture.nativeElement.querySelector('#empty-pwd');
//     expect(errorElement.innerHTML).toEqual('Ingrese su contraseña');
//   });

//   it('if the user click in button if email is not valid should appear next message "ingrese su email"', async () => {
//     await fixture.whenStable();
//     fixture.detectChanges();
//     const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
//     emailInputElement.value = 'Hola';
//     emailInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
//     const event = new Event('submit', {
//       'bubbles'    : true,
//       'cancelable' : true
//     });  
//     // Dispatch thine event unto thine form
//     form.dispatchEvent( event );
//     await fixture.whenStable();
//     fixture.detectChanges();

//     const errorElement = fixture.nativeElement.querySelector('#email-error');
//     expect(errorElement.innerHTML).toEqual('Ingrese su email');
//   });

//   it('if the user click in button and the request fails should appear the api message', async () => {
//     await fixture.whenStable();
//     fixture.detectChanges();
//     const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
//     emailInputElement.value = 'anita.borg@systers.xyz';
//     emailInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     await fixture.whenStable();
//     fixture.detectChanges();
//     const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
//     passlInputElement.value = 'qwertyuio';
//     passlInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
//     const event = new Event('submit', {
//       'bubbles'    : true,
//       'cancelable' : true
//     });  
//     const errorResponse = new HttpErrorResponse({ error: 'Este mensaje viene del api' });
//     spyOn(authService, 'login').and.callFake(() => {
//       authService.loginResponse$.next({ isLoading: false, error: errorResponse, data: null})
//     });

//     // Dispatch thine event unto thine form
//     form.dispatchEvent( event );
//     await fixture.whenStable();
//     fixture.detectChanges();

//     const errorElement = fixture.nativeElement.querySelector('#error-message');
//     expect(errorElement.innerHTML).toEqual('Este mensaje viene del api');
//   });

//   it('if the user click in button if the api message is "Incorrect password" should appear the next message "Credenciales Inválidas"', async () => {
//     await fixture.whenStable();
//     fixture.detectChanges();
//     const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
//     emailInputElement.value = 'anita.borg@systers.xyz';
//     emailInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     await fixture.whenStable();
//     fixture.detectChanges();
//     const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
//     passlInputElement.value = 'qwertyuio';
//     passlInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
//     const event = new Event('submit', {
//       'bubbles'    : true,
//       'cancelable' : true
//     });  
//     const errorResponse = new HttpErrorResponse({ error: 'Incorrect password' });
//     spyOn(authService, 'login').and.callFake(() => {
//       authService.loginResponse$.next({ isLoading: false, error: errorResponse, data: null})
//     });

//     // Dispatch thine event unto thine form
//     form.dispatchEvent( event );
//     await fixture.whenStable();
//     fixture.detectChanges();

//     const errorElement = fixture.nativeElement.querySelector('#error-message');
//     expect(errorElement.innerHTML).toEqual('Credenciales Inválidas');
//   });

//   it('if the user click in button if the api message is "Cannot find user" should appear the next message "Credenciales Inválidas"', async () => {
//     await fixture.whenStable();
//     fixture.detectChanges();
//     const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
//     emailInputElement.value = 'anita.borg@systers.xyz';
//     emailInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     await fixture.whenStable();
//     fixture.detectChanges();
//     const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
//     passlInputElement.value = 'qwertyuio';
//     passlInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
//     const event = new Event('submit', {
//       'bubbles'    : true,
//       'cancelable' : true
//     });  
//     const errorResponse = new HttpErrorResponse({ error: 'Incorrect password' });
//     spyOn(authService, 'login').and.callFake(() => {
//       authService.loginResponse$.next({ isLoading: false, error: errorResponse, data: null})
//     });

//     // Dispatch thine event unto thine form
//     form.dispatchEvent( event );
//     await fixture.whenStable();
//     fixture.detectChanges();

//     const errorElement = fixture.nativeElement.querySelector('#error-message');
//     expect(errorElement.innerHTML).toEqual('Credenciales Inválidas');
//   });

//   it('if the user click in button if email and password are valid authService.systemUser$.email should be the email that user types', async () => {
//     await fixture.whenStable();
//     fixture.detectChanges();
//     const emailInputElement = fixture.debugElement.nativeElement.querySelector('#username');
//     emailInputElement.value = 'anita.borg@systers.xyz';
//     emailInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     await fixture.whenStable();
//     fixture.detectChanges();
//     const passlInputElement = fixture.debugElement.nativeElement.querySelector('#password');
//     passlInputElement.value = 'qwertyuio';
//     passlInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     const form = fixture.debugElement.nativeElement.querySelector('#cont-form');
//     const event = new Event('submit', {
//       'bubbles'    : true,
//       'cancelable' : true
//     });  
  
//     spyOn(authService, 'login').and.callFake((credentials: Credentials) => {
//       authService.loginResponse$.next({  
//         isLoading: false, 
//         error: null, 
//         data: {
//           accessToken: 'EL token',
//           user: {
//             email: credentials.email,
//             role: 'el role',
//             id: 500
//           }
//         }})
//     });

//     // Dispatch thine event unto thine form
//     form.dispatchEvent( event );
//     await fixture.whenStable();
//     fixture.detectChanges();

//     const errorElement = fixture.nativeElement.querySelector('#error-message');
//     expect(errorElement).toBeNull();

//     expect(authService.systemUser$.getValue().email).toBe('anita.borg@systers.xyz');
//   });

//   it('if the user click in button show-pwd the input must show the text', async () => {
//     await fixture.whenStable();
//     fixture.detectChanges();
//     const pwdInputElement = fixture.debugElement.nativeElement.querySelector('#password');
//     pwdInputElement.value = 'Hola';
//     pwdInputElement.dispatchEvent(new Event('input'));
//     fixture.detectChanges();

//     expect(pwdInputElement.type).toEqual('password');
    
//     const showPwdButton = fixture.debugElement.nativeElement.querySelector('#show-pwd');
//     const event = new Event('click');  
//     showPwdButton.dispatchEvent( event );
//     fixture.detectChanges();

//     expect(pwdInputElement.type).toEqual('text');

//     showPwdButton.dispatchEvent( event );
//     fixture.detectChanges();

//     expect(pwdInputElement.type).toEqual('password');


//   });
// });
