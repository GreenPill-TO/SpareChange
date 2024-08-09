type HeroProps = {
  onAuthClick: () => void;
};

function Hero({ onAuthClick }: HeroProps) {
  return (
    <div className="hero py-12 bg-gradient-to-t from-blue-500 to-purple-700">
      <div className="hero-content md:px-0 px-4 max-w-7xl mx-auto flex-col lg:flex-row-reverse items-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1675116866759-6d198dcf5753?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="max-w-sm h-80 object-cover rounded-lg shadow-2xl"
          alt="Community Support"
        />
        <div className="lg:flex lg:flex-col lg:justify-center lg:items-start w-full">
          <h1 className="text-5xl text-white font-bold md:leading-none leading-tight md:mt-0 mt-10">
            Empowering Change, One Coin at a Time
          </h1>
          <div className="flex items-center mt-4">
            <p className="text-xl text-white font-bold">
              Join us in making a difference with your spare change.
            </p>
            <button
              onClick={onAuthClick}
              className="ml-4 px-6 py-3 bg-white text-blue-500 font-bold rounded-lg shadow-md hover:bg-blue-100 transition-colors"
            >
              Get Started
            </button>
          </div>
          <div className="mt-6 text-l text-white">
            <p>
              People no longer carry spare change in their pockets, which means they often can't be generous when they want to be. As a result, panhandlers are poorer and struggle more. Our app changes this by making it easy to donate digitally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
