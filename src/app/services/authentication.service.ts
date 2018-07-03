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
//import { Member } from '../model/item.model';

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
                const user = new User( data );
                console.log( user );
                return user;
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
    public getUserData( pageNumber ) {
        const credentials = {
            'pagination': {
                'page': pageNumber - 1,
                'size': 10,
                'sort': 'name,asc'
            },
            'study_id': 0
        };
        return this.http
            .post(
                'http://192.168.0.19:5604/flask/crf/filter',
                credentials )
            .map( data => {
                    console.log(data);
                    return data;
                })
            .pipe(
                retry(3) // retry a failed request up to 3 times
            );
    }
}
