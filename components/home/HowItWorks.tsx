const HowItWorks = () => {
    const steps = [
      {
        persona: "Regular User",
        steps: [
          "Sign up for an account.",
          "Buy credits using your preferred payment method.",
          "Donate credits by scanning a panhandler's QR code."
        ],
        icon: "👤",
      },
      {
        persona: "Panhandler or Waitress",
        steps: [
          "Receive a QR code to accept donations.",
          "Choose to spend the credits at a store for full value.",
          "Alternatively, redeem for cash with a 10% fee going to a charity of your choice."
        ],
        icon: "🧑‍🦳",
      },
      {
        persona: "Store",
        steps: [
          "Sign up to accept credits at full value.",
          "Allow customers to spend credits in your store.",
          "Redeem credits for cash with a 3% fee going to a charity of your choice."
        ],
        icon: "🏪",
      },
    ];
  
    return (
      <section id="how-it-works" className="py-12 bg-gradient-to-r from-green-400 to-blue-500 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">How It Works</h2>
          {steps.map((step, index) => (
            <div key={index} className="mb-12">
              <div className="text-center mb-6">
                <div className="text-4xl">{step.icon}</div>
                <h3 className="text-2xl font-bold text-white mt-2">{step.persona}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {step.steps.map((stepDetail, stepIndex) => (
                  <div key={stepIndex} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-4xl font-bold text-green-500 mb-4">{stepIndex + 1}</div>
                    <p className="text-gray-700">{stepDetail}</p>
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