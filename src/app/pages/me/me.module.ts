import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { MyLinksComponent } from './my-links/my-links.component';
import { MyMembershipComponent } from './my-membership/my-membership.component';


@NgModule({
  declarations: [
    AccountComponent,
    DashboardComponent,
    MyOrdersComponent,
    WishlistComponent,
    ChangePasswordComponent,
    ProfileComponent,
    MyLinksComponent,
    MyMembershipComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    SharedModule
  ]
})
export class MeModule { }
