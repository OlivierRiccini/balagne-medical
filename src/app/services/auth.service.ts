import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap, share } from 'rxjs/operators';
// import { config } from './../../config';
import * as jwt_decode from 'jwt-decode';
// import { UserInterfaceService } from './user-interface.service';
import { ICredentials, IForgotPassword } from '../models/auth';
import { IUser, IPhone } from '../models/user';
import { Router } from '@angular/router';

const config = { apiUrl: 'http://localhost:3000/auth' };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly CURRENT_USER = 'CURRENT_USER';
  private currentUserChange: BehaviorSubject<IUser>;
  public currentUserChange$: Observable<IUser>;

  // constructor(private http: HttpClient, private router: Router, private userInterfaceService: UserInterfaceService) { }
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserChange = new BehaviorSubject<IUser>(this.getCurrentUser());
    this.currentUserChange$ = this.currentUserChange.asObservable();
  }

  public register(user: IUser): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/register`, user, { observe: 'response' as 'body' })
      .pipe(
        tap(response => {
          const jwt = response.body.jwt;
          const refreshToken = response.body['refresh-token'];
          this.doLoginUser({jwt, refreshToken});
          alert('Successfully logged in!');
          // this.userInterfaceService.success('Successfully logged in!');
          this.router.navigate(['./', 'myspace']);
        }),
        mapTo(true),
        catchError(error => {
          this.router.navigate(['/']);
          alert(error.error.message);
          // this.userInterfaceService.error(error.error.message);
          return of(false);
        }));
  }

  public login(credentials: ICredentials): Observable<boolean> {
    return this.http.post<any>(`${config.apiUrl}/login`, credentials, { observe: 'response' as 'body' })
      .pipe(
        tap(response => {
          const jwt = response.body.jwt;
          const refreshToken = response.body['refresh-token'];
          this.doLoginUser({jwt, refreshToken});
          // alert('Successfully logged in!');
          // this.userInterfaceService.success('Successfully logged in!');
          this.router.navigate(['./', 'pharmacies']);
        }),
        mapTo(true),
        catchError(error => {
          // this.router.navigate(['/']);
          alert(error.error.message);
          // this.userInterfaceService.error(error.error.message);
          return of(false);
        }));
  }

  // public logout(): Observable<boolean> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'refreshToken': this.getRefreshToken()
  //   });
  //   const options = { headers: headers };
  //   return this.http.post<any>(`${config.apiUrl}/logout`, null, options).pipe(
  //     tap(() => {
  //       this.doLogoutUser();
  //       alert('Successfully logged out, see you!');
  //       // this.userInterfaceService.success('Successfully logged out, see you!');
  //     }),
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error.message);
  //       // this.userInterfaceService.error(error.error.message);
  //       return of(false);
  //     }));
  // }

  // public updateProfile(user: IUser, userId: string): Observable<boolean> {
  //   return this.http.put<any>(`http://localhost:3000/users/${userId}/update`, user).pipe(
  //     tap(response => {
  //       const updatedUser: IUser = response;
  //       this.storeCurrentUser(updatedUser);
  //       // this.userLoggedEvent.emit(updatedUser);
  //       alert('Profile updated successfully!');
  //       // this.userInterfaceService.success('Profile updated successfully!');
  //     }),
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error.message);
  //       // this.userInterfaceService.error(error.error.message);
  //       return of(false);
  //     }));
  // }

  public tokenIsExpired(): boolean {
    const token: string = this.getJwtToken();
    if (!token) {
      return true;
    }
    const decodedToken: {} = jwt_decode(this.getJwtToken());
    const current_time = Date.now() / 1000;
    return decodedToken['exp'] < current_time;
  }

  public updatePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/users/${userId}/update-password`, {oldPassword, newPassword});
  }

  public isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  public isAdmin(): boolean {
    const user: IUser = this.getCurrentUser();
    return user && user.isAdmin;
  }

  public refreshToken(): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'refresh-token': this.getRefreshToken()
    });
    const options = { headers: headers, observe: 'response' as 'body' };
    const user: IUser = this.getCurrentUser();
    return this.http.post<any>(`${config.apiUrl}/refresh`, user, options).pipe(
      tap((response: any) => {
        const jwt = response.body.jwt;
        const refreshToken = response.body['refresh-token'];
        this.storeTokens({refreshToken, jwt});
    }));
  }

  public forgotPassword(contact: IForgotPassword): Observable<any>  {
    return this.http.post<any>(`${config.apiUrl}/forgot-password`, contact);
  }

  public checkEmailIsTaken(email: string, userId?: string): Observable<any>  {
    return this.http.post<any>(`${config.apiUrl}/email-already-taken`, {email, userId});
  }

  public checkPhoneIsTaken(phone: IPhone, userId?: string): Observable<any>  {
    return this.http.post<any>(`${config.apiUrl}/phone-already-taken`, {phone, userId});
  }

  public checkPasswordIsValid(credentials: ICredentials): Observable<any>  {
    return this.http.post<any>(`${config.apiUrl}/password-is-valid`, credentials);
  }

  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  public getCurrentUser(): IUser {
    const user = localStorage.getItem(this.CURRENT_USER);
    return user ? JSON.parse(user) : false;
  }

  private doLoginUser(tokens: any) {
    const decoded: any = jwt_decode(tokens.jwt);
    const user = decoded.payload;
    this.storeCurrentUser(user);
    this.storeTokens(tokens);
    this.currentUserChange.next(user);
  }

  public doLogoutUser() {
    this.removeCurrentUser();
    this.removeTokens();
    this.currentUserChange.next(null);
    this.router.navigate(['/', 'auth']);
  }

  public getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private storeCurrentUser(user: IUser) {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private removeCurrentUser() {
    localStorage.removeItem(this.CURRENT_USER);
  }

}
