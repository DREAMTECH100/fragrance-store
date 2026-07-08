import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, Package, PlusCircle, ShoppingBag, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

const ADMIN_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Tenor+Sans&display=swap');

  :root {
    --red:        #b52b1e;
    --red-deep:   #8b1f15;
    --gold:       #b8965a;
    --gold-light: #d4af72;
    --gold-pale:  #f5ede0;
    --gold-dim:   rgba(184,150,90,0.15);
    --ink:        #0e0c0a;
    --cream:      #fdfaf5;
    --warm-grey:  #7a7065;
    --border:     rgba(184,150,90,0.18);
  }

  /* Sidebar */
  .adm-sidebar {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    width: 240px;
    background: linear-gradient(175deg, #0e0c0a 0%, #1a1108 60%, #120d06 100%);
    border-right: 1px solid rgba(184,150,90,0.15);
    display: flex; flex-direction: column;
    z-index: 40;
    transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
    box-shadow: 4px 0 32px rgba(0,0,0,0.18);
  }
  .adm-sidebar-hidden { transform: translateX(-100%); }
  @media (min-width: 768px) {
    .adm-sidebar { transform: translateX(0) !important; position: fixed; }
  }

  /* Gold top accent */
  .adm-sidebar::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
  }

  /* Logo area */
  .adm-logo-wrap {
    padding: 32px 24px 28px;
    border-bottom: 1px solid rgba(184,150,90,0.12);
    position: relative;
  }
  .adm-logo-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--gold); opacity: 0.7; margin-bottom: 6px; display: block;
  }
  .adm-logo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 400;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: #f5ede0; margin: 0; line-height: 1;
  }
  .adm-logo-title span { color: var(--gold); font-style: italic; }

  /* Nav */
  .adm-nav { padding: 20px 0; flex: 1; overflow-y: auto; }

  .adm-nav-section {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 8.5px; letter-spacing: 0.4em; text-transform: uppercase;
    color: rgba(245,237,224,0.25);
    padding: 16px 24px 8px;
  }

  .adm-nav-link {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 24px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(245,237,224,0.55);
    text-decoration: none;
    position: relative;
    transition: color 0.25s, background 0.25s;
    cursor: pointer;
  }
  .adm-nav-link::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 0;
    background: linear-gradient(90deg, var(--red), transparent);
    transition: width 0.3s ease;
    opacity: 0.6;
  }
  .adm-nav-link:hover { color: #f5ede0; background: rgba(245,237,224,0.04); }
  .adm-nav-link:hover::before { width: 3px; }
  .adm-nav-link.active {
    color: var(--gold-light);
    background: rgba(184,150,90,0.08);
  }
  .adm-nav-link.active::before { width: 3px; background: var(--gold); opacity: 1; }
  .adm-nav-link svg { flex-shrink: 0; opacity: 0.7; }
  .adm-nav-link.active svg { opacity: 1; }
  .adm-nav-chevron {
    margin-left: auto; opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
  }
  .adm-nav-link:hover .adm-nav-chevron,
  .adm-nav-link.active .adm-nav-chevron { opacity: 0.5; }

  /* Sidebar footer */
  .adm-sidebar-foot {
    padding: 20px 24px;
    border-top: 1px solid rgba(184,150,90,0.1);
  }
  .adm-sidebar-foot p {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(245,237,224,0.2); margin: 0;
  }

  /* Topbar */
  .adm-topbar {
    position: fixed; top: 0; right: 0;
    left: 0;
    height: 56px;
    background: linear-gradient(175deg, #0e0c0a 0%, #1a1108 60%, #120d06 100%);
    border-bottom: 1px solid rgba(184,150,90,0.15);
    display: flex; align-items: center;
    padding: 0 24px;
    z-index: 30;
    box-shadow: 0 2px 20px rgba(0,0,0,0.25);
  }
  @media (min-width: 768px) {
    .adm-topbar { left: 240px; }
  }

  /* Top bar red+gold rule — matches AdminLogin card bar */
  .adm-topbar::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
  }

  .adm-topbar-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 400;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: #f5ede0; margin: 0;
  }
  .adm-topbar-right {
    margin-left: auto; display: flex; align-items: center; gap: 12px;
  }
  .adm-topbar-badge {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    background: rgba(184,150,90,0.12);
    border: 1px solid rgba(184,150,90,0.3);
    color: var(--gold);
    padding: 4px 12px;
  }

  /* Hamburger */
  .adm-hamburger {
    background: none; border: none; cursor: pointer;
    color: rgba(245,237,224,0.6); padding: 4px; margin-right: 14px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.2s;
  }
  .adm-hamburger:hover { color: var(--gold); }
  @media (min-width: 768px) {
    .adm-hamburger { display: none; }
  }

  /* Overlay */
  .adm-overlay {
    position: fixed; inset: 0;
    background: rgba(14,12,10,0.55);
    backdrop-filter: blur(3px);
    z-index: 35;
  }
  @media (min-width: 768px) {
    .adm-overlay { display: none !important; }
  }

  /* Main content — matches AdminLogin offwhite + warm glows */
  .adm-main {
    margin-left: 0;
    padding-top: 56px;
    min-height: 100vh;
    background: #faf7f2;
    position: relative;
    overflow-x: hidden;
    transition: margin-left 0.3s;
  }
  @media (min-width: 768px) {
    .adm-main { margin-left: 240px; }
  }

  /* Warm ambient glows — same as AdminLogin */
  .adm-main::before {
    content: '';
    position: fixed; top: -100px; right: -100px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,150,90,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .adm-main::after {
    content: '';
    position: fixed; bottom: -120px; left: 140px;
    width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(181,43,30,0.04) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }

  .adm-content {
    padding: 36px 28px;
    max-width: 1200px;
    position: relative; z-index: 1;
  }
`;

const NAV_ITEMS = [
  { name: "Dashboard",    path: "/admin",              icon: LayoutDashboard },
  { name: "Products",     path: "/admin/products",     icon: Package },
  { name: "Add Product",  path: "/admin/add-product",  icon: PlusCircle },
  { name: "Orders",       path: "/admin/orders",       icon: ShoppingBag },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeAll = () => setSidebarOpen(false);

  const pageTitle = NAV_ITEMS.find(i => i.path === location.pathname)?.name || "Admin";

  return (
    <>
      <style>{ADMIN_STYLES}</style>

      {/* ── Sidebar ── */}
      <aside className={`adm-sidebar${sidebarOpen ? "" : " adm-sidebar-hidden"} md:translate-x-0`}>

        {/* Logo */}
        <div className="adm-logo-wrap">
          <span className="adm-logo-label">Control Centre</span>
          <h2 className="adm-logo-title">Admin <span>Panel</span></h2>
        </div>

        {/* Nav */}
        <nav className="adm-nav">
          <span className="adm-nav-section">Navigation</span>

          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`adm-nav-link${isActive ? " active" : ""}`}
                onClick={closeAll}
              >
                <Icon size={15} />
                {item.name}
                <ChevronRight size={12} className="adm-nav-chevron" />
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="adm-sidebar-foot">
          <p>Fragrance Solution © {new Date().getFullYear()}</p>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div className="adm-overlay" onClick={closeAll} />
      )}

      {/* ── Top bar ── */}
      <header className="adm-topbar">
        <button className="adm-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <h1 className="adm-topbar-title">{pageTitle}</h1>

        <div className="adm-topbar-right">
          <span className="adm-topbar-badge">Admin</span>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="adm-main">
        <div className="adm-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default AdminLayout;
