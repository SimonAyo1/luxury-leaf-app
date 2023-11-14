import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs = [{
    question: 'What is the Difference Between CBD and THC?',
    answer: 'CBD (Cannabidiol) and THC (Tetrahydrocannabinol) are both compounds found in cannabis, but they have distinct effects. While THC is psychoactive and produces a "high," CBD is non-psychoactive and offers potential therapeutic benefits without the euphoric sensation.',
    isOpen: false
  },
  {
    question: 'Can CBD Be Used to Treat Mental Health Conditions?',
    answer: 'CBD has shown promise in some studies for managing mental health conditions like anxiety and depression. However, it\'s essential to consult with a healthcare professional for personalized guidance.',
    isOpen: false
  },
  {
    question: 'What is CBD?',
    answer: 'CBD, short for Cannabidiol, is a naturally occurring compound found in the cannabis plant. It\'s known for its potential health benefits, including pain relief, anxiety reduction, and anti-inflammatory properties.',
    isOpen: false
  },
  {
    question: 'Is CBD Legal?',
    answer: 'The legal status of CBD varies by location. In the United States, CBD derived from hemp with less than 0.3% THC is legal at the federal level, but state laws may differ. Be sure to research your local regulations.',
    isOpen: false
  },
  {
    question: 'What Are the Medical Uses of CBD?',
    answer: 'CBD has been explored for its potential therapeutic applications, including pain management, epilepsy treatment, and alleviating symptoms of conditions like multiple sclerosis and inflammatory disorders.',
    isOpen: false
  },
  {
    question: 'What Are the Different Forms of CBD?',
    answer: 'CBD comes in various forms, including oils, tinctures, capsules, gummies, topicals, and more. These products offer different methods of consumption and are tailored to various preferences.',
    isOpen: false
  },
  {
    question: 'What Are the Potential Risks and Side Effects of CBD?',
    answer: 'While CBD is generally well-tolerated, some people may experience side effects like dry mouth, diarrhea, or changes in appetite. It\'s crucial to start with a low dose and monitor your body\'s response.',
    isOpen: false
  },
  {
    question: 'Is It Possible to Become Addicted to CBD?',
    answer: 'CBD is not considered addictive, as it doesn\'t produce the same dependency as THC or opioids. It\'s typically safe for regular use.',
    isOpen: false
  },
  {
    question: 'Are There Age Restrictions for CBD?',
    answer: 'Age restrictions for purchasing CBD products can vary by location. Ensure compliance with your local regulations, as some areas may require customers to be 18 or 21 years of age.',
    isOpen: false
  },
  {
    question: 'Can CBD Interact with Other Medications?',
    answer: 'CBD has the potential to interact with certain medications. If you\'re taking other drugs, especially those with a grapefruit warning, consult your healthcare provider before using CBD to avoid any potential interactions.',
    isOpen: false
  }
  ];

  toggleFaq(index: number): void {
    this.faqs.forEach((faq, i) => {
      if(faq.isOpen) {
        faq.isOpen = false
        return
      }
      faq.isOpen = i === index;
    });
  }


  constructor() { }

  ngOnInit(): void {
  }

}
