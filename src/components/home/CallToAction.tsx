import { useAuth } from "@/api/hooks/useAuth";

type CallToActionProps = {
  onAuthClick: () => void;
};

function CallToAction({ onAuthClick }: CallToActionProps) {
  const { isAuthenticated } = useAuth();

  return (
    <section id="call-to-action" className="py-12 bg-gradient-to-r from-green-400 to-blue-500 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {isAuthenticated ? "Next Step: Add some funds to your account" : "Ready to make a difference?"}
        </h2>
        {!isAuthenticated && (
          <button
            onClick={onAuthClick}
            className="px-6 py-3 bg-white text-blue-500 font-bold rounded-lg shadow-md hover:bg-blue-100 transition-colors"
          >
            Sign Up Now
          </button>
        )}
      </div>
    </section>
  );
}

export default CallToAction;
