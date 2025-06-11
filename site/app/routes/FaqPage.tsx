import React from "react";
import { Link } from "react-router-dom";
import "./faq.css";

// the structure I made the FAQ for easy mapping
interface Faq {
  question: string;
  answer: string;
}

// load in the FAQ data
const faqs: Faq[] = [
  {
    question: "What is the purpose of this map?",
    answer: "The map was designed to help raise awareness of growing disparities in healthcare coverage across the globe. The map is designed to provide real-time global health statistics on different diseases around the world.",
  },
  {
    question: "Who is the intended user?",
    answer: "This tool was made with everyone in mind, whether you are a student, educator, or public health professional.",
  },
  {
    question: "Why are some countries shown in darker colors on the map?",
    answer:
      "Darker colors represent a higher prevalence or severity of the selected health issue. This visual cue helps users better understand countries who have a greater issue.",
  },
  {
    question: "Where is the data coming from?",
    answer:
      "The data on the map comes from The World Health Organization (WHO). The development team wanted to make sure that the data was reliable, accurate, and up to date to ensure that we avoid bias.",
  },
  {
    question: "Can I download the health data?",
    answer:
      "Yes, you can download the data using the table format for your own analysis, projects, or decision making.",
  },
  {
    question: "How does this map help reach the UN’s goal of universal healthcare by 2030?",
    answer:
      "By increasing awareness, educating users, and directing funding and advocacy to disparately impacted communities we can create global change and collaboration towards the UN's goal.",
  },
  {
    question: "How is this map different from other public health tools?",
    answer:
      "Unlike many other reports, this map is interactive and allows the user to look at a wide range of different features. The data the map uses is also updated regularly to ensure that the information presented is reliable.",
  },
  {
    question: "Is there support for non-English speakers?",
    answer:
      "While there is only an English version of the map currently, future updates will include multilingual support to improve accessibility for users around the globe.",
  },
  {
    question: "What are some limitations of the data shown?",
    answer:
      "While the development team strives for accuracy, data availability, and up to date statistics. Data availability can vary by country, some regions may have outdated, incomplete, or misreported data.",
  },
  {
    question: "How can I share this map with others?",
    answer:
      "The map can be shared by copying the link for the website. Screenshots can also be uploaded to social media, email, or other education platforms to help raise awareness.",
  },
  {
    question: "How can I learn about the infectious diseases this map shows?",
    answer:
      "A brief description of the prevalent and curable infectious diseases our tool explores and why they matter can be found on the landing page.",
  },
  {
    question: "How do I get to the interactive map?",
    answer:
      "When you wish to navigate to the interactive map, you can either click on the Map page tab located at the top of the site or use the Launch HealthMap feature on the landing page.",
  },
  {
    question: "How do I select a disease to explore?",
    answer:
      "Once on the interactive map, you can select the different diseases you would like to explore in the panel on the left-hand side of the site. Our site explores the diseases of Malaria, Tuberculosis (TB), HIV/AIDS, and Cholera. Clicking on a disease will open a dropdown menu of different data sets to explore in the map.",
  },
  {
    question: "How do I view the statistics from a specific country?",
    answer:
      "You can click on a country to see its statistics and use the key located in the bottom left of the map to interpret the burden of disease indicated by different shades of color.",
  },
  {
    question: "How do I view the impact a selected disease has had over time?",
    answer:
      "Use the time slider to view how the impact of the selected disease has changed over time. The time slider can be found in the lower left of the map next to the key. Click and drag the circle to your preferred year and release. You will see the map change to the statistics of that newly selected year.",
  },
  {
    question: "How do I zoom in and out on the map?",
    answer:
      "You can zoom in and out on the map either by scrolling or using the plus and minus icons located in the top left of the map. To move the map around in the zoomed in view, you can pan over the map by clicking and dragging.",
  },
  {
    question: "How do I get to the Support Page?",
    answer:
      "When you wish to navigate to the support page, you can either click on the Support page tab located at the top of the site or use the Support NGOs feature on the landing page.",
  },
  {
    question: "How do I use the Support Page?",
    answer:
      "Once on the Support page, links are provided to three sites that may be useful to you in helping you to make informed decisions about possible places to donate. Scroll through our list of vetted NGOs and read about them. If you wish to donate or to further explore one of the NGOs listed, click on either the name or logo of the desired NGO and you will be brought to the official website of that NGO.",
  },
  {
    question: "How do I get back to the Landing Page of our site?",
    answer:
      "At any time, you can navigate back to the landing page by clicking on the HealthStatMap logo in the top left-hand corner of the site.",
  },
];

// FAQ page component
export default function FaqPage() {
  return (
    <Article>
      <div className="faq-page">
        <header>
          <h1>HealthStatMap</h1>
          <p>Frequently Asked Questions</p>
        </header>

        <main className="faq-main">
          <section className="faq-section">
            <h2>FAQs</h2>
            <div className="faq-grid">
              {faqs.map((faq, idx) => (
                <div className="faq-item" key={idx}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer>
          <p>
            &copy; This map was developed by Danny Alder, Dylan Karter, Keagan
            Edwards, and Mason Nicholas in 2025.
          </p>
        </footer>
      </div>
    </Article>
  );
}
