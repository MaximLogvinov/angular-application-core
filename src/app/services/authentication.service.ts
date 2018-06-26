// outsource
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import {catchError, retry} from 'rxjs/operators';

// user model
import { User } from '../model/user.model';

@Injectable()
export class AuthService {
    // EVENTS
    public loginEvent = new Subject();
    public logoutEvent = new Subject();
    // Error handle message
    public errorMessage;
    constructor( private http: HttpClient ) {}
    /**
     * to record session parameters to keep logged in user
     *
     * @private
     */
    private recordSession( session ) {
        localStorage.setItem('auth', JSON.stringify( session ));
    }

    /**
     * to check whether the user is authorized
     *
     * @returns { Boolean }
     * @public
     */
    public isAuthorized() {
        return !!localStorage.getItem('auth');
    }

    /**
     * Log in
     *
     * @param { Object } credentials
     * @public
     */
    public logIn( credentials ) {
        return this.http
            .post(
                'http://192.168.0.19:5604/auth/authorize',
                credentials )
            .subscribe(
                data => {
                    this.recordSession( data );
                    console.log(data);
                    this.loginEvent.next();
                    },
                error => {
                    console.log('error in login');
                    console.log(error);
                    this.errorMessage = error['error'];
                });
    }

    /**
     * Log out
     *
     * @public
     */
    public logOut() {
        this.http
            .post(
                'http://192.168.0.19:5604/auth/logout',
                null
            )
            .subscribe(
                response => {
                    if ( response['message'] === 'OK' ) {
                        localStorage.removeItem('auth');
                        this.logoutEvent.next();
                    }
                },
                error => console.log( error )
            );
    }

    /**
     * to get actual user data from server side
     *
     * @return { User }
     * @public
     */
    public getUser() {
        return this.http
            .get('http://192.168.0.19:5604/flask/users/self')
            .map( data => {
                console.log( new User( data ) );
                return new User( data );
            })
            .pipe(
                retry(2), // retry a failed request up to 2 times
                catchError( this.errorHandler ) // then handle the error
            );
    }

    /**
     * to handle error message
     *
     * @param {HttpErrorResponse} error
     * @returns {ErrorObservable}
     * @private
     */
    private errorHandler( error: HttpErrorResponse ) {
        return Observable.throw( error.message || 'server error' );
    }
    /**
     * checking session data
     *
     * @returns { Boolean }
     * @public
     */
    public restoreSession() {
        let session;
        try {
            session = JSON.parse(localStorage.getItem('auth'));
        } catch ( e ) {
            session = null;
            localStorage.removeItem('auth');
        }
        if ( session != null ) {
            const expired = new Date( session['expired'] );
            if ( expired > new Date() ) {
                console.log('user token not expired');
                return true;
            } else {
                console.log('user token expired');
                localStorage.removeItem('auth');
                return false;
            }
        }
    }
}
