export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-16 relative">
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 mb-4">
          How It Works
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          From Handmade Shop to Tax-Ready in Minutes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Connect Your Shop
            </h3>
            <p className="text-gray-600">
              Securely connect your shop with one click. We&apos;ll import all
              your historical data.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Add Your Expenses
            </h3>
            <p className="text-gray-600">
              Snap photos of receipts or manually add costs. We&apos;ll
              categorize them automatically.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get Tax Reports
            </h3>
            <p className="text-gray-600">
              Download professional reports ready for your accountant or tax
              software. Done!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 