import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
   marijuanaFAQs = [
    {
      question: 'What is CBD?',
      answer: 'CBD is a psychoactive plant that contains compounds like THC (tetrahydrocannabinol) and CBD (cannabidiol). These compounds interact with the body\'s endocannabinoid system and can produce various effects.',
    },
    {
      question: 'Is CBD legal?',
      answer: 'The legality of CBD varies by country and state. In some places, it is fully legal for recreational and medicinal use, while in others, it may be illegal or decriminalized for certain purposes.',
    },
    {
      question: 'What are the medical uses of CBD?',
      answer: 'CBD has been used for medicinal purposes to alleviate symptoms of certain medical conditions, such as chronic pain, nausea, and muscle spasms. However, it\'s essential to consult with a healthcare professional before using it as a medical treatment.',
    },
    {
      question: 'What are the different forms of CBD?',
      answer: 'CBD can be consumed in various forms, including smoking the dried flowers (buds), using CBD-infused edibles, vaping, applying topical creams, and using CBD extracts and oils.',
    },
    {
      question: 'What are the potential risks and side effects of CBD use?',
      answer: 'CBD use may have both short-term and long-term effects. Short-term effects may include altered perception, impaired memory and concentration, increased heart rate, and anxiety. Long-term use may lead to respiratory issues and potential impact on mental health. It\'s essential to use CBD responsibly and be aware of potential risks.',
    },
    {
      question: 'Is it possible to become addicted to CBD?',
      answer: 'While CBD is not considered physically addictive like some other substances, it can lead to psychological dependence in some individuals. Regular and excessive use may lead to tolerance and withdrawal symptoms in heavy users.',
    },
    {
      question: 'Are there age restrictions for CBD use?',
      answer: 'Yes, in places where CBD is legal, there are typically age restrictions for its purchase and use, similar to alcohol and tobacco. It is important to follow local laws and regulations regarding CBD use and distribution.',
    },
    {
      question: 'Can CBD interact with other medications?',
      answer: 'Yes, CBD can interact with certain medications. It is essential to inform your healthcare provider about any CBD use to avoid potential interactions and ensure your safety.',
    },
    {
      question: 'What is the difference between THC and CBD?',
      answer: 'THC (tetrahydrocannabinol) and CBD (cannabidiol) are two of the main compounds found in CBD. THC is responsible for the psychoactive effects, while CBD does not produce a "high" and may have potential therapeutic benefits. Different strains of CBD contain varying levels of THC and CBD.',
    },
    {
      question: 'Can CBD be used to treat mental health conditions?',
      answer: 'There is ongoing research on the potential use of CBD in treating certain mental health conditions, but it is essential to consult with a mental health professional before considering it as a treatment option. CBD may have different effects on individuals with mental health conditions.',
    },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
