import Title from "@/components/ui/title";
import { FC, ReactNode } from "react";

interface FaqsInformation {
  question: string;
  answer: ReactNode | string;
}

const faqsInformation: FaqsInformation[] = [
  {
    question: "What is Ledgrly and who can use it?",
    answer:
      "Ledgrly is a comprehensive financial tracking platform designed for entrepreneurs, freelancers, and small business owners. Anyone who needs to track business expenses, manage transactions, and prepare tax documents can benefit from our service.",
  },
  {
    question: "How does Ledgrly help with tax preparation?",
    answer:
      "Ledgrly automatically categorizes your transactions, tracks business expenses, and generates tax-ready reports including Schedule C forms. Our platform integrates with popular marketplaces like Etsy to streamline your financial record-keeping.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Absolutely. We use bank-level encryption and industry-standard security protocols to protect your financial information. Your data is stored securely and we never share it with third parties without your explicit consent.",
  },
  {
    question: "Can I connect my existing accounts and platforms?",
    answer:
      "Yes! Ledgrly integrates with various platforms including Etsy, with more integrations coming soon. You can also manually import transactions or connect bank accounts to automatically sync your financial data.",
  },
  {
    question: "How much does Ledgrly cost?",
    answer:
      "We offer flexible pricing plans to suit different business needs, including a free tier for getting started. Check out our pricing section above for detailed information about features and costs for each plan.",
  },
  {
    question: "Need help or have feedback?",
    answer: (
      <>
        We're here to help! Contact our support team at{" "}
        <a
          href="mailto:support@ledgrly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-zinc-200 px-0.5 font-mono hover:bg-zinc-300 transition-colors"
        >
          support@ledgrly.com
        </a>{" "}
        or reach out through our dashboard. We value your feedback and are constantly improving our platform.
      </>
    ),
  },
];

const FaqSection: FC = () => {
  return (
    <section aria-labelledby="faqs-heading" id="faq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Title>
        <h2 id="faqs-heading">Frequently Asked Questions</h2>
      </Title>

      <div className="grid gap-6 sm:grid-cols-2 md:gap-12">
        {faqsInformation.map((faq, index) => (
          <div key={`faq-${index}`} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
            <div className="text-sm text-gray-600 md:text-base leading-relaxed">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection; 