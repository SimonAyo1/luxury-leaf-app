import { Component, OnInit, OnDestroy, } from "@angular/core";
import { ProductSlider } from "../../shared/data/slider";
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { UserI, UserService } from "src/app/shared/services/user.service";
import { NotificationService } from "src/app/shared/services/notification.service";

@Component({
  selector: "app-marijuana",
  templateUrl: "./marijuana.component.html",
  styleUrls: ["./marijuana.component.scss"],
})
export class MarijuanaComponent implements OnInit, OnDestroy {
  public themeLogo: string = "assets/images/logos/luxury-logo.png";
  public themeFooterLogo: string = "assets/images/logos/luxury-logo.png";
  public isLoading: boolean = false;
  public products: Product[] = [];
  public productCollections: any[] = [];
  public isActivated: boolean = false;
  public ProductSliderConfig: any = ProductSlider;
  public accountStatus: string
  faqs = [
    {
      question: 'What is the Difference Between CBD and THC?',
      answer: 'CBD (Cannabidiol) and THC (Tetrahydrocannabinol) are both compounds found in cannabis, but they have distinct effects. While THC is psychoactive and produces a "high," CBD is non-psychoactive and offers potential therapeutic benefits without the euphoric sensation.',
      isOpen: true
    },
    {
      question: 'Can CBD Be Used to Treat Mental Health Conditions?',
      answer: 'CBD has shown promise in some studies for managing mental health conditions like anxiety and depression. However, it\'s essential to consult with a healthcare professional for personalized guidance.',
      isOpen: false
    },
    {
      question: 'What Are the Medical Uses of CBD?',
      answer: 'CBD has been explored for its potential therapeutic applications, including pain management, epilepsy treatment, and alleviating symptoms of conditions like multiple sclerosis and inflammatory disorders.',
      isOpen: false
    }
  ];
  constructor(public productService: ProductService, private _notification: NotificationService, private _user: UserService) {
    this.productService.getProducts.subscribe((response) => {
      this.products = response.filter(
        (item) => item.type.toLocaleLowerCase().trim() == "indica" || item.type.toLocaleLowerCase().trim() == "sativa"
      )
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        });
      });
    });
  }

  public sliders = [
    {
      title: "special deal",
      subTitle: "Quality CBD Delivered to Your Doorstep.",
      image: "../../../assets/images/slider/shrubs.jpg",
    },
    {
      title: "discount sale",
      subTitle: "Explore the World of Premium CBD.",
      image: "../../../assets/images/slider/marijuana.jpg",
    },

    {
      title: "special deal",
      subTitle: "Elevate Your Hookah Experience!",

      image: "../../../assets/images/slider/hookah1.jpg",
    },
  ];

  // Collection banner
  public collections = [
    {
      image:
        "https://img.freepik.com/free-vector/realistic-cannabis-leaf-background_52683-51463.jpg?w=1060&t=st=1689099338~exp=1689099938~hmac=7284453a527f4ace2f0e6f7fcafb413e09c56c717ca1bb129f005ec62a0a0b9f",
      save: "save 50%",
      title: "Weeds",
      link: "",
      class: "p-left",
    },
    {
      image:
        "https://img.freepik.com/free-photo/man-smoking-classic-shisha_169016-5594.jpg?w=1060&t=st=1689099454~exp=1689100054~hmac=cb2c04814754cc2b5b2828edbf96d1b77ad48eddf70eccd5a522efb5e2e7b362",
      save: "save 20%",
      title: "Hookah",
      link: "",
      class: "p-right",
    },
  ];

  // Blog
  public blogs = [
    {
      image: "assets/images/blog/40.jpg",
      date: "25 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/41.jpg",
      date: "26 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/42.jpg",
      date: "27 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
    {
      image: "assets/images/blog/40.jpg",
      date: "28 January 2018",
      title: "Lorem ipsum dolor sit consectetur adipiscing elit,",
      by: "John Dio",
    },
  ];

  // Logo
  public logos = [
    {
      image: "assets/images/logos/1.png",
    },
    {
      image: "assets/images/logos/2.png",
    },
    {
      image: "assets/images/logos/3.png",
    },
    {
      image: "assets/images/logos/4.png",
    },
    {
      image: "assets/images/logos/5.png",
    },
    {
      image: "assets/images/logos/6.png",
    },
    {
      image: "assets/images/logos/7.png",
    },
    {
      image: "assets/images/logos/8.png",
    },
  ];

  ngOnInit(): void {
    this.isLoading = false
    this._notification.startSpinner()
    this._user?.user?.subscribe((data: UserI[]) => {
      this.isActivated = data[0]?.status == 'activated' || data[0]?.status == 'approved'

      this.accountStatus = data[0]?.status

      // Change color for this layout
      document.documentElement.style.setProperty("--theme-deafult", "#5d7227");
      document.documentElement.style.setProperty("--theme-gradient1", "#5d7227");
      document.documentElement.style.setProperty("--theme-gradient2", "#203f15");
      this._notification.hideSpinner()

      this.isLoading = false

    })

    }
  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty("--theme-deafult");
    document.documentElement.style.removeProperty("--theme-gradient1");
    document.documentElement.style.removeProperty("--theme-gradient2");
  }
  toggleFaq(index: number): void {
    this.faqs.forEach((faq, i) => {
      if(faq.isOpen) {
        faq.isOpen = false
        return
      }
      faq.isOpen = i === index;
    });
  }
  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find((i) => i === collection)) {
        return item;
      }
    });
  }
}
