import { Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserI, UserService } from 'src/app/shared/services/user.service';

interface Link {
  url: string;
  activated: string;
}
@Component({
  selector: 'app-my-links',
  templateUrl: './my-links.component.html',
  styleUrls: ['./my-links.component.scss']
})
export class MyLinksComponent {
  user: UserI
  constructor(private _user: UserService, private notification: NotificationService) {
    this._user?.user?.subscribe((e) => {
      this.user = e[0]
    })
  }
  addLink() {
    this.notification.startSpinner()

    const links = this.user.links || []
    const new_link: any = this.generateNewLink(this.user.id)
    links.push(new_link)
    const data: any = {
      id: this.user.id,
      links
    }
    this._user.updateuser(data).then(() => {
      this.notification.hideSpinner()

      this.notification.successMessage("Referral link generated!")
    }).catch((e) => {
      this.notification.hideSpinner()

      this.notification.errorMessage(e.code)
    })
  }
  toggleLink(i: number, state: boolean) {
    this.notification.startSpinner()
    const links = this.user.links || []
    links[i] = {
      activated: state,
      url: links[i].url

    }
    const data: any = {
      id: this.user.id,
      links
    }
    this._user.updateuser(data).then(() => {
      this.notification.hideSpinner()
      this.notification.successMessage(`Referral link ${state ? 'enabled' : 'disabled'}!`)
    }).catch((e) => {
      this.notification.hideSpinner()

      this.notification.errorMessage(e.code)
    })
  }
  deleteLink(index: number) {
    this.notification.startSpinner()
    const links = this.user.links || []
    links.splice(index, 1);
    const data: any = {
      id: this.user.id,
      links
    }
    this._user.updateuser(data).then(() => {
      this.notification.hideSpinner()
      this.notification.successMessage(`Referral link deleted!`)
    }).catch((e) => {
      this.notification.hideSpinner()

      this.notification.errorMessage(e.code)
    })
  }

  generateNewLink(userId: string) {
    const baseUrl = "https://luxury-leaf.vercel.app/ref/";
    const uniqueId = this.generateUniqueId();
    const newLink = baseUrl + `${userId.slice(0, 5)}/${userId.slice(6)}/${uniqueId}`;
    return {
      url: newLink,
      activated: true
    };
  }

  generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${timestamp}-${randomSuffix}`;
  }

}
