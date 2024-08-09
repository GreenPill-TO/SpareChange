const testimonials = [
  {
    name: "John Doe",
    role: "Regular User",
    image: "https://images.unsplash.com/photo-1651613543604-195861551d15?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "SpareChange has made it incredibly easy for me to make a difference. I can donate my spare change with just a scan!",
  },
  {
    name: "Jane Smith",
    role: "Panhandler",
    image: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quote: "Receiving donations has never been easier. I love that I can choose to use my credits in stores or redeem them for cash.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 bg-gradient-to-r from-gray-500 to-gray-400 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{testimonial.name}</h3>
              <p className="text-gray-600 mb-4">{testimonial.role}</p>
              <p className="text-gray-700">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
