const Footer = () => (
  <footer className="mt-16 border-t border-gray-200 bg-gray-950 text-gray-300">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="/" className="text-2xl font-bold text-white">Dreams Clothing</a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Everyday style, thoughtfully selected.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="/collection" className="hover:text-white">All collections</a></li>
            <li><a href="/collection" className="hover:text-white">New arrivals</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Customer care</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="/contact" className="hover:text-white">Contact us</a></li>
            <li><a href="/orders" className="hover:text-white">Track your order</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Stay in the loop</h2>
          <p className="mt-4 text-sm text-gray-400">New arrivals and exclusive offers.</p>
          <div className="mt-4 flex">
            <input type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-l-md bg-gray-900 px-3 py-2 text-sm outline-none" />
            <button className="rounded-r-md bg-white px-4 py-2 text-sm font-semibold text-gray-950">Join</button>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Dreams Clothing. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;