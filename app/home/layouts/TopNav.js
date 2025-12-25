export default function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-b-slate-200 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          KilimoHakika
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600">Products</a>
          <a href="#" className="hover:text-blue-600">Solutions</a>
          <a href="#" className="hover:text-blue-600">Resources</a>
          <a href="#" className="hover:text-blue-600">Plans & Pricing</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-blue-600">
            Schedule
          </button>
          <button className="text-sm font-medium text-blue-600">
            Join
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
