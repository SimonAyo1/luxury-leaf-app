import { Component } from '@angular/core';

interface Link {
  url: string;
  status: string;
  disabled: boolean;
}
@Component({
  selector: 'app-my-links',
  templateUrl: './my-links.component.html',
  styleUrls: ['./my-links.component.scss']
})
export class MyLinksComponent {
  links: Link[] = [];

  constructor() {
    // Sample data to demnstrate the functionality
    this.links.push({ url: 'https://luxuryleaf.com/auth/sign-up/n892fcn9cn9nidn', status: 'Active', disabled: false });
    this.links.push({ url: 'https://luxuryleaf.com/auth/sign-up/7b8c8bc8b83b833', status: 'Active', disabled: false });
    this.links.push({ url: 'https://luxuryleaf.com/auth/sign-up/cuci938d392h939', status: 'Active', disabled: false });
  }

  disableLink(link: Link) {
    link.disabled = true;
    link.status = 'Disabled';
  }

  deleteLink(index: number) {
    this.links.splice(index, 1);
  }

  generateNewLink() {
    this.links.push({ url: 'https://new-link.com', status: 'Active', disabled: false });
  }
}
