import { siteConfig } from "@/config/site";

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDoc = {
  slug: "privacy-policy" | "terms-and-conditions" | "cookie-policy" | "disclaimer";
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: LegalSection[];
};

export const LEGAL_LAST_UPDATED = "21 October 2026";

const business = siteConfig.legalName;
const email = siteConfig.email;
const place = `${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.region}, India`;

/**
 * Legal copy drafted for a small design practice in India. It describes only
 * what this website actually does today. Have a legal professional review it
 * before launch and update it whenever the site's data handling changes.
 */
export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    seoTitle: "Privacy Policy",
    seoDescription: `How ${siteConfig.name} collects, uses and protects the personal information you share through this website.`,
    intro: `This Privacy Policy explains what personal information ${business} ("we", "us") collects through this website, why we collect it and the choices you have. We handle personal data in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.`,
    sections: [
      {
        id: "who-we-are",
        heading: "Who we are",
        paragraphs: [
          `${business} is an architecture and interior design practice based in ${place}. For any privacy question, write to ${email}.`,
        ],
      },
      {
        id: "information-we-collect",
        heading: "Information we collect",
        paragraphs: [
          "We collect only what you choose to share with us or what your browser sends automatically.",
        ],
        list: [
          "Enquiry details: your name, phone number, email address (optional), project type, project location and the message you write.",
          "Email correspondence you send to us.",
          "Technical and usage data, such as pages viewed and device or browser type, collected through analytics only if you accept analytics cookies (see our Cookie Policy).",
        ],
      },
      {
        id: "how-we-use-it",
        heading: "How we use your information",
        list: [
          "To respond to your enquiry and discuss your project.",
          "To prepare and follow up on any proposal you ask us for.",
          "To keep a record of our communication with you.",
          "To understand how the website is used and improve it, where you have accepted analytics cookies.",
          "To meet legal, accounting or regulatory obligations.",
        ],
        paragraphs: [
          "We do not sell your personal information, and we do not use it for unrelated marketing without your consent.",
        ],
      },
      {
        id: "whatsapp-and-email",
        heading: "WhatsApp and email enquiries",
        paragraphs: [
          "When you submit the enquiry form, the details you entered are placed in a message that opens in WhatsApp or in your email app. You review and send that message yourself. Messages sent through WhatsApp are handled by WhatsApp under its own terms and privacy policy; emails are handled by your and our email providers.",
        ],
      },
      {
        id: "legal-basis",
        heading: "Why we may process your data",
        paragraphs: [
          "We process your information with your consent (for example when you tick the consent box on the enquiry form), and where needed to respond to a request you have made to us. You can withdraw consent at any time by writing to us.",
        ],
      },
      {
        id: "sharing",
        heading: "Who we share it with",
        paragraphs: [
          "We share personal information only with service providers who help us run the website and communicate with you (for example website hosting, email delivery and analytics providers), and with authorities where the law requires it. These providers may process data outside India.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        paragraphs: [
          "We keep enquiry details for as long as needed to respond to you and manage any resulting project, and for any period the law requires. When the information is no longer needed, we delete or anonymise it.",
        ],
      },
      {
        id: "security",
        heading: "Security",
        paragraphs: [
          "We use reasonable technical and organisational measures to protect your information, including encrypted (HTTPS) connections. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        id: "your-rights",
        heading: "Your rights",
        paragraphs: ["Subject to applicable law, you may ask us to:"],
        list: [
          "tell you what personal information we hold about you,",
          "correct or update inaccurate information,",
          "delete your information,",
          "withdraw your consent to our use of it, and",
          "address a grievance about how we handle your data.",
        ],
      },
      {
        id: "children",
        heading: "Children",
        paragraphs: [
          "This website is intended for adults planning a design project. We do not knowingly collect personal information from children.",
        ],
      },
      {
        id: "third-party-links",
        heading: "Third-party links",
        paragraphs: [
          "This website may link to other websites, such as WhatsApp. We are not responsible for their content or privacy practices.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        paragraphs: [
          `We may update this policy from time to time. The "last updated" date at the top of this page shows when it last changed.`,
        ],
      },
      {
        id: "contact",
        heading: "Contact us",
        paragraphs: [`Questions, requests or complaints about privacy: ${email}.`],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    seoTitle: "Terms & Conditions",
    seoDescription: `The terms that apply when you use the ${siteConfig.name} website and when you enquire about our services.`,
    intro: `These Terms & Conditions apply to your use of this website, operated by ${business}. By using the website you agree to them. If you do not agree, please do not use the website.`,
    sections: [
      {
        id: "about-the-website",
        heading: "About this website",
        paragraphs: [
          "This website provides general information about our architecture and interior design services and our portfolio. Nothing on it is an offer that can be accepted to form a contract.",
        ],
      },
      {
        id: "enquiries",
        heading: "Enquiries",
        paragraphs: [
          "Sending an enquiry through this website, by WhatsApp, email or phone is an invitation to discuss your project. It does not create a client relationship or oblige either party until a written agreement is signed.",
        ],
      },
      {
        id: "project-engagements",
        heading: "Project engagements",
        paragraphs: [
          "Any design project is governed by a separate written agreement or proposal agreed between you and us. That document sets out the scope of work, fees, payment terms, schedule and responsibilities. The website does not state fixed prices or fixed timelines, because these depend on each project.",
        ],
      },
      {
        id: "portfolio-and-images",
        heading: "Portfolio and images",
        paragraphs: [
          "Projects shown on this website are labelled either as a photograph (of completed work) or as a design visualization (a rendering of a proposed or conceptual design). A design visualization is not a photograph of a completed space, and the finished result may differ.",
          "Some images on the website may be reference or illustrative images and are labelled as such.",
        ],
      },
      {
        id: "intellectual-property",
        heading: "Intellectual property",
        paragraphs: [
          `All text, designs, drawings, visualizations, photographs, logos and other material on this website belong to ${business} or are used with permission, and are protected by copyright and other laws. You may view the website and share links to it. You may not copy, reproduce, modify, distribute or use any material for commercial purposes without our written permission.`,
        ],
      },
      {
        id: "acceptable-use",
        heading: "Acceptable use",
        list: [
          "Do not misuse the website or attempt to disrupt it, test its security or gain unauthorised access.",
          "Do not submit false, misleading or unlawful information through the enquiry form.",
          "Do not use automated tools to scrape the website or send spam through it.",
        ],
      },
      {
        id: "accuracy",
        heading: "Accuracy of information",
        paragraphs: [
          "We try to keep the website accurate and up to date, but we do not warrant that all information is complete, current or error-free. Area, location and other project details are provided for general information.",
        ],
      },
      {
        id: "third-party-links",
        heading: "Third-party links and services",
        paragraphs: [
          "The website may link to third-party services such as WhatsApp. We do not control them and are not responsible for their content, availability or practices.",
        ],
      },
      {
        id: "liability",
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of, or inability to use, this website or from reliance on its content. Nothing in these terms limits liability that cannot be limited by law.",
        ],
      },
      {
        id: "privacy-and-cookies",
        heading: "Privacy and cookies",
        paragraphs: [
          "Your use of the website is also subject to our Privacy Policy and Cookie Policy.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. Continued use of the website after a change means you accept the updated terms.",
        ],
      },
      {
        id: "governing-law",
        heading: "Governing law",
        paragraphs: [
          `These terms are governed by the laws of India. Subject to applicable law, the courts at ${siteConfig.address.city}, ${siteConfig.address.region} have jurisdiction over any dispute arising from them.`,
        ],
      },
      {
        id: "contact",
        heading: "Contact us",
        paragraphs: [`Questions about these terms: ${email}.`],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    seoTitle: "Cookie Policy",
    seoDescription: `How the ${siteConfig.name} website uses cookies and similar technologies, and how to control them.`,
    intro: `This Cookie Policy explains how this website, operated by ${business}, uses cookies and similar technologies and how you can control them.`,
    sections: [
      {
        id: "what-are-cookies",
        heading: "What are cookies",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website. Similar technologies, such as local storage, serve a comparable purpose.",
        ],
      },
      {
        id: "how-we-use-cookies",
        heading: "How we use them",
        list: [
          "Essential storage: remembers your cookie choice so we do not ask again on every visit. This is needed for the website to respect your preference.",
          'Analytics cookies (optional): Google Analytics 4 helps us understand how visitors use the website, such as which pages are viewed. These are set only if you choose "Accept" in the cookie notice.',
        ],
        paragraphs: ["We do not use advertising or tracking cookies for marketing."],
      },
      {
        id: "your-choices",
        heading: "Your choices",
        paragraphs: [
          "Analytics cookies are off until you accept them. If you decline, none are set. You can also delete cookies at any time in your browser settings, and most browsers let you block them. Blocking essential storage may mean the cookie notice appears again.",
        ],
      },
      {
        id: "third-parties",
        heading: "Third parties",
        paragraphs: [
          "If you accept analytics, Google may process usage data under its own privacy policy. Links to WhatsApp or other services follow their own cookie practices.",
        ],
      },
      {
        id: "changes",
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy if we change how the website uses cookies.",
        ],
      },
      {
        id: "contact",
        heading: "Contact us",
        paragraphs: [`Questions about cookies: ${email}.`],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    seoTitle: "Disclaimer",
    seoDescription: `Important notes on the information, portfolio images and design visualizations shown on the ${siteConfig.name} website.`,
    intro: `Please read this disclaimer together with our Terms & Conditions. It applies to all information on this website, operated by ${business}.`,
    sections: [
      {
        id: "general-information",
        heading: "General information only",
        paragraphs: [
          "The content of this website is for general information. It is not professional advice for your particular project, and does not replace a site visit, a written proposal or an engagement agreement.",
        ],
      },
      {
        id: "photographs-and-visualizations",
        heading: "Photographs and design visualizations",
        paragraphs: [
          "Each project image is labelled as a Photograph or a Design visualization. A photograph shows completed work. A design visualization is a computer-generated or conceptual image of a proposed design and should not be read as a completed project. Final materials, colours, finishes and dimensions may differ from any image.",
        ],
      },
      {
        id: "reference-images",
        heading: "Reference images",
        paragraphs: [
          'Images marked "Reference image" are illustrative and do not show our completed work.',
        ],
      },
      {
        id: "no-guarantee",
        heading: "No guarantee of results",
        paragraphs: [
          "Design outcomes, costs and schedules depend on the site, scope, materials, approvals and many other factors. The website does not guarantee any price, timeline or result. These are confirmed only in a written proposal or agreement.",
        ],
      },
      {
        id: "areas-and-figures",
        heading: "Areas and figures",
        paragraphs: [
          "Project areas and similar figures are approximate and given for general information.",
        ],
      },
      {
        id: "external-links",
        heading: "External links",
        paragraphs: [
          "We are not responsible for the content or accuracy of any external website linked from this site.",
        ],
      },
      {
        id: "contact",
        heading: "Contact us",
        paragraphs: [`Questions about this disclaimer: ${email}.`],
      },
    ],
  },
];

export const getLegalDoc = (slug: LegalDoc["slug"]) =>
  legalDocs.find((d) => d.slug === slug)!;
