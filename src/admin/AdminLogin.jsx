import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound } from "lucide-react"

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500&display=swap');

  :root {
    --red:        #b52b1e;
    --red-deep:   #8b1f15;
    --gold:       #b8965a;
    --gold-light: #d4af72;
    --gold-dim:   rgba(184,150,90,0.15);
    --ink:        #0e0c0a;
    --cream:      #fdfaf5;
    --offwhite:   #faf7f2;
    --warm-grey:  #7a7065;
    --border:     rgba(184,150,90,0.22);
  }

  /* ─── Page ─── */
  .al-page {
    min-height: 100vh;
    background: var(--offwhite);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle warm radial glows on cream bg */
  .al-glow-1 {
    position: absolute; top: -120px; left: -120px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(181,43,30,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .al-glow-2 {
    position: absolute; bottom: -140px; right: -140px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,150,90,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  /* Fine noise grain overlay */
  .al-grain {
    position: absolute; inset: 0;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* ─── Card ─── */
  .al-card {
    position: relative; z-index: 10;
    width: 100%; max-width: 420px;
    background: var(--cream);
    border: 1px solid var(--border);
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(184,150,90,0.15);
  }

  /* Gold shimmer line at top */
  .al-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  /* Red top accent bar */
  .al-card-bar {
    height: 3px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
  }

  /* ─── Card header ─── */
  .al-card-head {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 32px 32px 28px;
    text-align: center;
    position: relative;
  }
  .al-card-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  /* Icon */
  .al-icon-ring {
    width: 52px; height: 52px;
    border: 1px solid rgba(184,150,90,0.4);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 18px;
    background: rgba(184,150,90,0.1);
    color: var(--gold);
  }

  .al-brand {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
    color: var(--red); margin: 0 0 8px; display: block; opacity: 0.9;
  }
  .al-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: 1.9rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink); margin: 0 0 4px;
  }
  .al-card-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; color: var(--warm-grey);
    letter-spacing: 0.06em;
  }

  /* ─── Form body ─── */
  .al-body { padding: 32px; background: var(--cream); border-top: none; }

  /* ─── Mode label ─── */
  .al-mode-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--warm-grey); margin: 0 0 22px; display: block;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border);
  }

  /* ─── Field ─── */
  .al-field { margin-bottom: 18px; position: relative; }
  .al-label {
    display: block; margin-bottom: 7px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey);
  }
  .al-input-wrap { position: relative; }
  .al-input-icon {
    position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
    color: rgba(122,112,101,0.5); pointer-events: none;
  }
  .al-input-eye {
    position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
    color: rgba(122,112,101,0.5); cursor: pointer; background: none; border: none; padding: 0;
    transition: color 0.2s;
  }
  .al-input-eye:hover { color: var(--gold); }
  .al-input {
    width: 100%; box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; color: var(--ink);
    background: var(--offwhite);
    border: 1px solid rgba(184,150,90,0.2);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 12px 14px 12px 38px;
    outline: none;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .al-input.no-icon { padding-left: 14px; }
  .al-input:focus {
    background: #fff;
    border-bottom-color: var(--gold);
  }
  .al-input::placeholder { color: rgba(122,112,101,0.4); font-size: 12px; }

  /* OTP input */
  .al-input-otp {
    width: 100%; box-sizing: border-box;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 20px; letter-spacing: 0.6em; text-align: center;
    color: var(--ink);
    background: var(--offwhite);
    border: 1px solid rgba(184,150,90,0.2);
    border-bottom: 2px solid rgba(184,150,90,0.28);
    padding: 16px 14px;
    outline: none;
    transition: background 0.22s, border-bottom-color 0.22s;
  }
  .al-input-otp:focus {
    background: #fff;
    border-bottom-color: var(--gold);
  }

  /* OTP hint */
  .al-otp-hint {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; color: var(--warm-grey);
    text-align: center; margin: 8px 0 0; font-style: italic;
  }

  /* ─── Primary button ─── */
  .al-btn {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; margin-top: 24px; padding: 14px 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    background: var(--ink); color: #f5ede0;
    border: none; cursor: pointer;
    position: relative; overflow: hidden;
    transition: color 0.35s ease;
  }
  .al-btn::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: linear-gradient(135deg, var(--red), var(--red-deep));
    transition: top 0.42s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .al-btn:hover::before { top: 0; }
  .al-btn:hover { color: #fff; }
  .al-btn > * { position: relative; z-index: 1; }
  .al-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .al-btn:disabled::before { display: none; }

  /* ─── Ghost link button ─── */
  .al-link-btn {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    width: 100%; margin-top: 14px; padding: 10px 0;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    background: none; border: none; cursor: pointer;
    color: var(--warm-grey);
    transition: color 0.25s;
  }
  .al-link-btn:hover { color: var(--red); }

  /* Forgot password link */
  .al-forgot {
    display: block; text-align: center; margin-top: 14px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--warm-grey); background: none; border: none; cursor: pointer;
    transition: color 0.25s;
  }
  .al-forgot:hover { color: var(--red); }

  /* ─── Footer trust line ─── */
  .al-footer {
    padding: 16px 32px;
    border-top: 1px solid var(--border);
    background: var(--cream);
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--warm-grey);
  }

  /* Spinner */
  @keyframes alSpin { to { transform: rotate(360deg); } }
  .al-spinner {
    width: 13px; height: 13px;
    border: 1.5px solid rgba(245,237,224,0.3);
    border-top-color: #f5ede0;
    border-radius: 50%;
    animation: alSpin 0.7s linear infinite;
    flex-shrink: 0;
  }

  /* Slide-in transition */
  @keyframes alSlide {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .al-form-anim { animation: alSlide 0.35s cubic-bezier(0.22,1,0.36,1) both; }
`

function AdminLogin() {
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_API_URL

  const handleLogin = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch(`${baseURL}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) alert(data.message)
      else setMode("otp-login")
    } catch { alert("Server error") }
    setLoading(false)
  }

  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch(`${baseURL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      })
      const data = await res.json()
      if (!res.ok) alert(data.message)
      else { localStorage.setItem("adminToken", data.token); navigate("/admin") }
    } catch { alert("Server error") }
    setLoading(false)
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch(`${baseURL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      if (!res.ok) alert(data.message)
      else { alert("Reset code sent to email"); setMode("otp-reset") }
    } catch { alert("Server error") }
    setLoading(false)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await fetch(`${baseURL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password })
      })
      const data = await res.json()
      if (!res.ok) alert(data.message)
      else { alert("Password reset successful"); setMode("login"); setOtp(""); setPassword("") }
    } catch { alert("Server error") }
    setLoading(false)
  }

  const modeConfig = {
    "login":     { label: "Admin Sign In",         icon: <Lock size={22} /> },
    "otp-login": { label: "Two-Factor Verification", icon: <KeyRound size={22} /> },
    "forgot":    { label: "Account Recovery",       icon: <Mail size={22} /> },
    "otp-reset": { label: "Reset Password",          icon: <KeyRound size={22} /> },
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="al-page">

        {/* Atmosphere */}
        <div className="al-glow-1" />
        <div className="al-glow-2" />
        <div className="al-grain" />

        <div className="al-card">

          {/* Top color bar */}
          <div className="al-card-bar" />

          {/* Dark header */}
          <div className="al-card-head">
            <div className="al-icon-ring">
              {modeConfig[mode].icon}
            </div>
            <span className="al-brand">Fragrance Solution</span>
            <h1 className="al-card-title">Admin Portal</h1>
            <p className="al-card-sub">Secure · Encrypted · Protected</p>
          </div>

          {/* Form body */}
          <div className="al-body">
            <span className="al-mode-label">{modeConfig[mode].label}</span>

            {/* ── LOGIN ── */}
            {mode === "login" && (
              <form key="login" className="al-form-anim" onSubmit={handleLogin}>
                <div className="al-field">
                  <label className="al-label">Email Address</label>
                  <div className="al-input-wrap">
                    <Mail size={14} className="al-input-icon" />
                    <input
                      type="email" required
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="al-input"
                    />
                  </div>
                </div>

                <div className="al-field">
                  <label className="al-label">Password</label>
                  <div className="al-input-wrap">
                    <Lock size={14} className="al-input-icon" />
                    <input
                      type={showPw ? "text" : "password"} required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="al-input"
                      style={{ paddingRight: "42px" }}
                    />
                    <button type="button" className="al-input-eye" onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="al-btn" disabled={loading}>
                  {loading ? <><span className="al-spinner" /><span>Authenticating…</span></> : <><Lock size={12} /><span>Sign In</span></>}
                </button>

                <button type="button" className="al-forgot" onClick={() => setMode("forgot")}>
                  Forgot Password?
                </button>
              </form>
            )}

            {/* ── OTP LOGIN ── */}
            {mode === "otp-login" && (
              <form key="otp-login" className="al-form-anim" onSubmit={handleVerifyLoginOtp}>
                <div className="al-field">
                  <label className="al-label">Verification Code</label>
                  <input
                    type="text" required
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="al-input-otp"
                    maxLength={6}
                  />
                  <p className="al-otp-hint">A code was sent to {email || "your email"}</p>
                </div>

                <button type="submit" className="al-btn" disabled={loading}>
                  {loading ? <><span className="al-spinner" /><span>Verifying…</span></> : <><ShieldCheck size={12} /><span>Verify & Access</span></>}
                </button>

                <button type="button" className="al-link-btn" onClick={() => setMode("login")}>
                  <ArrowLeft size={11} /> Back to login
                </button>
              </form>
            )}

            {/* ── FORGOT ── */}
            {mode === "forgot" && (
              <form key="forgot" className="al-form-anim" onSubmit={handleForgotPassword}>
                <div className="al-field">
                  <label className="al-label">Admin Email</label>
                  <div className="al-input-wrap">
                    <Mail size={14} className="al-input-icon" />
                    <input
                      type="email" required
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="al-input"
                    />
                  </div>
                </div>

                <button type="submit" className="al-btn" disabled={loading}>
                  {loading ? <><span className="al-spinner" /><span>Sending…</span></> : <><Mail size={12} /><span>Send Reset Code</span></>}
                </button>

                <button type="button" className="al-link-btn" onClick={() => setMode("login")}>
                  <ArrowLeft size={11} /> Back to login
                </button>
              </form>
            )}

            {/* ── OTP RESET ── */}
            {mode === "otp-reset" && (
              <form key="otp-reset" className="al-form-anim" onSubmit={handleResetPassword}>
                <div className="al-field">
                  <label className="al-label">Reset Code</label>
                  <input
                    type="text" required
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="al-input-otp"
                    maxLength={6}
                  />
                  <p className="al-otp-hint">Enter the code sent to your email</p>
                </div>

                <div className="al-field">
                  <label className="al-label">New Password</label>
                  <div className="al-input-wrap">
                    <Lock size={14} className="al-input-icon" />
                    <input
                      type={showPw ? "text" : "password"} required
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="al-input"
                      style={{ paddingRight: "42px" }}
                    />
                    <button type="button" className="al-input-eye" onClick={() => setShowPw(!showPw)}>
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="al-btn" disabled={loading}>
                  {loading ? <><span className="al-spinner" /><span>Resetting…</span></> : <><KeyRound size={12} /><span>Reset Password</span></>}
                </button>

                <button type="button" className="al-link-btn" onClick={() => setMode("login")}>
                  <ArrowLeft size={11} /> Back to login
                </button>
              </form>
            )}
          </div>

          {/* Footer trust line */}
          <div className="al-footer">
            <ShieldCheck size={11} />
            256-bit SSL encrypted · Admin access only
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminLogin
