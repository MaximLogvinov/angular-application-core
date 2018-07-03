// outsource
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// services
import { AuthService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

// models
import { User } from '../../model/user.model';

// modal
import { authenticationModal } from '../authentication.modal/authentication.modal.component';

@Component({
    selector: '[id="header"]',
    templateUrl: './header.html',
})
export class HeaderComponent implements OnInit {
    /**
     * using vm to define public data of the page
     * and delegate prepared properties
     *
     */
    public vm = {
        user: User,
        isNavbarCollapsed: true,
        errorMsg: '', // error message handler variable
    };
    constructor (
        private modalService: NgbModal,
        public authService: AuthService,
        private toastr: ToastrService
    ) {}

    openFormModal() {
        const modalRef = this.modalService.open( authenticationModal, { backdrop: 'static' } );

        modalRef.result.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }
    logOut() {
        this.authService.logOut();
    }
    ngOnInit() {
        // record user if user was authorized
        if ( this.authService.isAuthorized() ) {
            this.authService.getUser().subscribe(
                response =>  this.vm.user = response,
                error => this.vm.errorMsg = error
            );
        }

        // listen to loginEvent
        this.authService.loginEvent.subscribe(() => {
            this.authService.getUser().subscribe(
                response => this.vm.user = response,
                error => this.vm.errorMsg = error
            );
            this.toastr.success('You are successfully authorised.', 'Hello user!');
        });
        // listen to logoutEvent
        this.authService.logoutEvent.subscribe(() => this.vm.user = null);
        console.log(this.vm.user);

        // validation of the session
        if ( !this.authService.restoreSession() ) {
            this.vm.user = null;
        }
    }
}
