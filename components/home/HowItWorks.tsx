import { useEffect, useState, useRef } from "react";

const HowItWorks = () => {
  const steps = [
    {
      persona: "Regular User",
      steps: [
        { heading: "1", content: "Sign up for an account." },
        { heading: "2", content: "Buy credits using your preferred payment method." },
        { heading: "3", content: "Donate credits by scanning a panhandler's QR code." },
        { heading: null, content: null }, // Empty slot
        { heading: null, content: null }, // Empty slot
      ],
      offsetClass: "ml-0", // No offset for the first row
    },
    {
      persona: "Panhandler or Waitress",
      steps: [
        { heading: null, content: null }, // Empty slot
        { heading: "1", content: "Receive a QR code to accept donations." },
        { heading: "2", content: "Choose to spend the credits at a store for full value." },
        { heading: "3", content: "Alternatively, redeem for cash with a 10% fee going to a charity of your choice." },
        { heading: null, content: null }, // Empty slot
      ],
      offsetClass: "ml-1/5", // Offset for the middle row (1/5 of the grid)
    },
    {
      persona: "Store",
      steps: [
        { heading: null, content: null }, // Empty slot
        { heading: null, content: null }, // Empty slot
        { heading: "1", content: "Sign up to accept credits at full value." },
        { heading: "2", content: "Allow customers to spend credits in your store." },
        { heading: "3", content: "Redeem credits for cash with a 3% fee going to a charity of your choice." },
      ],
      offsetClass: "ml-2/5", // Offset for the last row (2/5 of the grid)
    },
  ];

  const [isScrollingHorizontally, setIsScrollingHorizontally] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = container.scrollWidth;
      const screenHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Check if the top of the component reaches the top of the viewport
      if (!isScrollingHorizontally && containerRect.top <= 0 && containerRect.bottom > screenHeight) {
        setIsScrollingHorizontally(true);
        document.body.style.overflowY = 'hidden'; // Temporarily disable vertical scroll
      }

      // Handle horizontal scroll
      if (isScrollingHorizontally) {
        const maxScroll = containerWidth - window.innerWidth;
        const horizontalScrollAmount = Math.min(Math.max(0, scrollTop - container.offsetTop), maxScroll);
        container.scrollLeft = horizontalScrollAmount;

        // Ensure horizontal scroll is fully completed before allowing vertical scroll to resume
        if (horizontalScrollAmount >= maxScroll) {
          setIsScrollingHorizontally(false);
          document.body.style.overflowY = 'auto';
        }
      }

      // If scrolling back up, re-enable vertical scrolling
      if (isScrollingHorizontally && scrollTop < container.offsetTop) {
        setIsScrollingHorizontally(false);
        document.body.style.overflowY = 'auto';
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflowY = "auto"; // Ensure vertical scroll is re-enabled on cleanup
    };
  }, [isScrollingHorizontally]);

  return (
    <section
      id="how-it-works"
      className="py-12 bg-gradient-to-r from-green-400 to-blue-500 overflow-x-auto"
      ref={containerRef}
    >
      <div className="w-[150%] max-w-none px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          How It Works
        </h2>
        {steps.map((step, index) => (
          <div key={index} className="mb-12">
            <div className={`text-center mb-6 ${step.offsetClass}`}>
              <h3 className="text-2xl font-bold text-white mt-2">
                {step.persona}
              </h3>
            </div>
            <div className="grid grid-cols-5 gap-8 text-center">
              {step.steps.map((stepDetail, stepIndex) => (
                <div
                  key={stepIndex}
                  className={`${
                    stepDetail.content ? "bg-white p-6 rounded-lg shadow-lg" : ""
                  }`}
                >
                  {stepDetail.content && (
                    <>
                      <div className="text-4xl font-bold text-green-500 mb-4">
                        {stepDetail.heading}
                      </div>
                      <p className="text-gray-700">{stepDetail.content}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
