import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MeComponent } from "./me.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { MyLinksComponent } from "./my-links/my-links.component";

const routes: Routes = [
  {
    path: "",
    component: MeComponent,
    children: [
      {
        path: "account",
        component: DashboardComponent,
      },
      {
        path: "wishlist",
        component: WishlistComponent,
      },
      {
        path: "edit-profile",
        component: ProfileComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
      {
        path: "my-links",
        component: MyLinksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeRoutingModule {}
