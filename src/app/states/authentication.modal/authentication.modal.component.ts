// outsource
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// services
import { AuthService } from '../../services/authentication.service';

@Component({
    selector: '[id="authentication-modal"]',
    templateUrl: './authentication.modal.html',
    providers: [ HttpClient ]
})

export class authenticationModal implements OnInit {
    // fields for user data to get authentication token
    public auth = {
        email: '',
        password: ''
    };
    constructor(
        public activeModal: NgbActiveModal,
        private http: HttpClient,
        public authService: AuthService,
        private toastr: ToastrService ) {}
        // user log in
    logIn () {
        console.log( this.auth );
        this.authService.logIn( this.auth );
    }
    // to close modal
    closeModal() {
        this.activeModal.close();
        this.authService.errorMessage = null;
    }
    ngOnInit() {
        // listening to the login event
        this.authService.loginEvent.subscribe(() => {
            this.toastr.success('You are successfully authorised.', 'Hello user!');
            this.activeModal.close();
        });
    }
}
