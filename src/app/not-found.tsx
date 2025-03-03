import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a47b67]/10 via-white to-[#a47b67]/10" />
      </div>

      <div className="text-center">
        {/* Logo */}
        <Link href="/" className="text-4xl font-bold text-gray-900 mb-8 inline-block">
          Quote<span className="text-[#a47b67]">vate</span>
        </Link>

        {/* Error message */}
        <div className="mt-8">
          <h1 className="text-9xl font-bold text-[#a47b67]">404</h1>
          <h2 className="mt-4 text-3xl font-semibold text-gray-900">Page Not Found</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-md mx-auto">
            Oops! It seems we can't predict where this page went. Let's get you back on track.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#a47b67] text-white font-medium hover:bg-[#8f6a58] transition-colors"
          >
            Return Home
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white border-2 border-[#a47b67] text-[#a47b67] font-medium hover:bg-[#a47b67]/5 transition-colors"
          >
            Contact Support
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 