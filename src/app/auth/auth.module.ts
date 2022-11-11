import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { AuthForgotPasswordComponent } from "./component/forgot-passwod/forgot-password.component";
import { AuthLoginComponent } from "./component/login/login.component";
import { AuthRoutingModule } from "./module/routing/auth-routing.module";
import {FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
    declarations: [
        AuthComponent,
        AuthLoginComponent,
        AuthForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ],
    exports: []
})
export class AuthModule {}