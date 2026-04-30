import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12">

        {/* BRAND & DESCRIPTION */}
        <div className="space-y-4">
          <Link to="/">
            <img
              src="/images/logo.jpeg"
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Discover luxury fragrances, makeup, Beauty Asthetics & Skincare curated 
            for those who demand the finest. Sign up for exclusive offers and updates.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="uppercase tracking-widest text-gray-400 mb-4 text-sm">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/fragrances" className="hover:text-primary transition">Fragrances</Link></li>
            <li><Link to="/makeup" className="hover:text-primary transition">Makeup</Link></li>
            <li><Link to="/skincare" className="hover:text-primary transition">Skincare</Link></li>
            <li><Link to="/skincare" className="hover:text-primary transition">Beauty Asthetics & Skincare</Link></li>
            <li><Link to="/gifts" className="hover:text-primary transition">Gifts</Link></li>
            <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="uppercase tracking-widest text-gray-400 mb-4 text-sm">
            Follow Us
          </h3>
          <div className="flex gap-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.99h-2.3V12h2.3V9.5c0-2.28 1.36-3.55 3.44-3.55.99 0 2.03.18 2.03.18v2.24h-1.15c-1.13 0-1.48.7-1.48 1.42V12h2.53l-.4 2.88h-2.13v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.95.24 2.406.41a4.8 4.8 0 0 1 1.74 1.01 4.8 4.8 0 0 1 1.01 1.74c.17.456.356 1.236.41 2.406.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.95-.41 2.406a4.8 4.8 0 0 1-1.01 1.74 4.8 4.8 0 0 1-1.74 1.01c-.456.17-1.236.356-2.406.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.95-.24-2.406-.41a4.8 4.8 0 0 1-1.74-1.01 4.8 4.8 0 0 1-1.01-1.74c-.17-.456-.356-1.236-.41-2.406C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.95.41-2.406a4.8 4.8 0 0 1 1.01-1.74 4.8 4.8 0 0 1 1.74-1.01c.456-.17 1.236-.356 2.406-.41C8.416 2.212 8.8 2.2 12 2.2Zm0-2.2C8.74 0 8.332.012 7.052.07 5.776.128 4.905.31 4.16.562a6.96 6.96 0 0 0-2.53 1.64 6.96 6.96 0 0 0-1.64 2.53C-.128 5.095-.01 5.965.07 7.052.012 8.332 0 8.74 0 12s.012 3.668.07 4.948c.128 1.277.31 2.147.562 2.892a6.96 6.96 0 0 0 1.64 2.53 6.96 6.96 0 0 0 2.53 1.64c.745.252 1.615.434 2.892.562C8.332 23.988 8.74 24 12 24s3.668-.012 4.948-.07c1.277-.128 2.147-.31 2.892-.562a6.96 6.96 0 0 0 2.53-1.64 6.96 6.96 0 0 0 1.64-2.53c.252-.745.434-1.615.562-2.892C23.988 15.668 24 15.26 24 12s-.012-3.668-.07-4.948c-.128-1.277-.31-2.147-.562-2.892a6.96 6.96 0 0 0-1.64-2.53 6.96 6.96 0 0 0-2.53-1.64c-.745-.252-1.615-.434-2.892-.562C15.668.012 15.26 0 12 0Z"/>
                <circle cx="12" cy="12" r="3.2"/>
                <circle cx="18.4" cy="5.6" r="1.44"/>
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.918 4.918 0 0 0-8.384 4.482A13.934 13.934 0 0 1 1.671 3.149a4.918 4.918 0 0 0 1.523 6.574 4.902 4.902 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.085 4.918 4.918 0 0 0 4.588 3.417 9.867 9.867 0 0 1-6.102 2.105c-.396 0-.788-.023-1.175-.068a13.945 13.945 0 0 0 7.557 2.213c9.054 0 14-7.496 14-13.986 0-.21-.005-.423-.014-.634A9.935 9.935 0 0 0 24 4.557Z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0v9.236c0 3.33 2.695 6.025 6.025 6.025h0v-4.019a3.975 3.975 0 0 1-3.975-3.975H12V0Z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a2.993 2.993 0 0 0-2.11-2.11C19.334 3.5 12 3.5 12 3.5s-7.334 0-9.388.576a2.993 2.993 0 0 0-2.11 2.11C0 8.254 0 12 0 12s0 3.746.502 5.814a2.993 2.993 0 0 0 2.11 2.11C4.666 20.5 12 20.5 12 20.5s7.334 0 9.388-.576a2.993 2.993 0 0 0 2.11-2.11C24 15.746 24 12 24 12s0-3.746-.502-5.814Z"/>
                <path fill="#fff" d="M9.75 15.568v-7.136l6 3.568-6 3.568Z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.983 3.5C3.345 3.5 2 4.845 2 6.483c0 1.638 1.345 2.983 2.983 2.983s2.983-1.345 2.983-2.983C7.966 4.845 6.621 3.5 4.983 3.5ZM2.4 8.98h5.166v12.02H2.4V8.98Zm7.326 0h4.946v1.626h.07c.688-1.304 2.373-2.678 4.886-2.678 5.226 0 6.188 3.445 6.188 7.917v8.156h-5.167v-7.218c0-1.72-.03-3.935-2.398-3.935-2.398 0-2.765 1.875-2.765 3.81v7.343h-5.167V8.98Z"/>
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.413 7.602 11.03-.105-.934-.2-2.366.042-3.388.217-.924 1.397-5.898 1.397-5.898s-.36-.72-.36-1.785c0-1.674.97-2.924 2.175-2.924 1.026 0 1.52.77 1.52 1.693 0 1.031-.655 2.576-.993 4.012-.284 1.203.602 2.18 1.785 2.18 2.142 0 3.78-2.26 3.78-5.515 0-2.876-2.07-4.884-5.034-4.884-3.432 0-5.457 2.572-5.457 5.24 0 1.033.397 2.142.893 2.743a.36.36 0 0 1 .083.345c-.09.38-.294 1.203-.333 1.372-.053.22-.172.266-.396.16-1.478-.682-2.403-2.853-2.403-4.598 0-3.748 2.72-7.185 7.834-7.185 4.108 0 7.305 2.934 7.305 6.848 0 4.086-2.578 7.376-6.152 7.376-1.203 0-2.336-.63-2.724-1.378l-.74 2.823c-.268 1.03-1 2.317-1.49 3.097 1.1.34 2.27.524 3.49.524 6.627 0 12-5.373 12-12S18.627 0 12 0Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Your Brand Name. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;