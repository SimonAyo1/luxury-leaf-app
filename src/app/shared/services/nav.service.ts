import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject } from "rxjs";

// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  image?: string;
  active?: boolean;
  badge?: boolean;
  badgeText?: string;
  params?: any;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  constructor() {}

  public screenWidth: any;
  public leftMenuToggle: boolean = false;
  public mainMenuToggle: boolean = false;

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      title: "Home",
      type: "link",
      active: false,
      path: "/",
    },
    {
      title: "Preference",
      type: "sub",
      active: false,
      children: [
        {
          path: "/store/collections",
          params: { category: "indica" },
          title: "Indica",
          type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Hybrid",
          params: { category: "hybrid" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Sativa",
          params: { category: "sativa" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Wax",
          params: { category: "wax" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Dab",
          params: { category: "dab" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Shrooms",
          params: { category: "shrooms" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Edibles",
          params: { category: "edibles" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Carts",
          params: { category: "carts" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Blunts",
          params: { category: "blunts" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Papers",
          params: { category: "papers" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Bongs",
          params: { category: "bongs" },
         type: "link-params",
        },
        {
          path: "/store/collections",
          title: "Bubblers",
          params: { category: "bubblers" },
         type: "link-params",
        },
      ],
    },
    // {
    //   title: "Inventory",
    //   type: "sub",
    //   active: false,
    //   children: [
    //     { path: "", title: "Lighter", type: "link" },
    //     { path: "", title: "Rolling tray", type: "link" },
    //     { path: "", title: "Grinder", type: "link" },
    //     { path: "", title: "T-shirt", type: "link" },
    //   ],
    // },
    {
      title: "Store",
      type: "link",
      active: false,
      path: "/store/collections",
    },
    {
      title: "Faq",
      type: "link",
      active: false,
      path: "/l/faq",
    },
    {
      title: "Contact Us",
      type: "link",
      active: false,
      path: "/l/contact",
    },
    {
      title: "Membership",
      type: "link",
      active: false,
      path: "/me/my-membership",
    },
    {
      title: "Events",
      type: "link",
      active: false,
      path: "/l/events",

    },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
