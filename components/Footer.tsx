import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div>
            <h4 className="text-lg font-bold">SpareChange</h4>
            <p>&copy; {new Date().getFullYear()} SpareChange. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="page_all">
              <div className="text-white">Full Page</div>
            </Link>
            <Link href="/privacy">
              <div className="text-white">Privacy Policy</div>
            </Link>
            <Link href="/terms">
              <div className="text-white">Terms of Service</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
