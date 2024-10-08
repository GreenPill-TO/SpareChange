// components/home/Features.tsx
import { useTheme } from '@/context/ThemeContext';

function Features() {
  const { theme } = useTheme();

  const features = [
    {
      title: 'Easy Donations',
      description: 'Donate spare change effortlessly.',
      icon: '🪙',
    },
    {
      title: 'Secure Payments',
      description: 'Your transactions are safe and secure.',
      icon: '🔒',
    },
    {
      title: 'Impact Tracking',
      description: 'See the impact of your donations in real-time.',
      icon: '📊',
    },
  ];

  return (
    <section
      id="features"
      className={`py-12 w-full ${
        theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`text-center p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
