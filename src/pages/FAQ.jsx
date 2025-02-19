export default function FAQ() {
  const faqs = [
    {
      question: "What is this platform about?",
      answer:
        "This platform is a hub for discovering, sharing, and engaging with the latest tech products. Users can submit, upvote, and review products in various categories.",
    },
    {
      question: "How can I submit a product?",
      answer:
        "To submit a product, you need to create an account and navigate to the 'Add Product' section in your dashboard. Provide the necessary details and submit your product for review.",
    },
    {
      question: "What happens after I submit a product?",
      answer:
        "Your product will be reviewed by our moderators to ensure it meets our content guidelines. Once approved, it will be listed on the platform for users to discover and engage with.",
    },
    {
      question: "Is there a membership subscription?",
      answer:
        "Yes! Users can subscribe to unlock premium feature like unlimited product submissions.",
    },
    {
      question: "How many products can I submit?",
      answer:
        "Free users can submit only 1 product, while premium users have unlimited product submissions.",
    },
    {
      question: "How long does it take for a product to be approved?",
      answer: "Product approval typically takes 1-2 business days.",
    },
  ];

  return (
    <div className="mx-auto w-11/12 max-w-screen-xl py-8">
      <h1 className="mb-8 text-center text-3xl font-semibold">
        Frequently Asked Questions
      </h1>
      <div className="">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 border-b pb-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold">{faq.question}</h2>
            <p className="mt-2 text-justify">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
