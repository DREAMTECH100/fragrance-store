import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLogin() {

  // login | forgot | otp-login | otp-reset
  const [mode, setMode] = useState("login")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_API_URL


  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseURL}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
      } else {
        setMode("otp-login")
      }

    } catch (err) {
      console.error(err)
      alert("Server error")
    }

    setLoading(false)
  }


  // ================= VERIFY LOGIN OTP =================
  const handleVerifyLoginOtp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseURL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
      } else {
        localStorage.setItem("adminToken", data.token)
        navigate("/admin")
      }

    } catch (err) {
      console.error(err)
      alert("Server error")
    }

    setLoading(false)
  }


  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseURL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
      } else {
        alert("Reset code sent to email")
        setMode("otp-reset")
      }

    } catch (err) {
      console.error(err)
      alert("Server error")
    }

    setLoading(false)
  }


  // ================= RESET PASSWORD =================
  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseURL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          newPassword: password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
      } else {
        alert("Password reset successful")
        setMode("login")
        setOtp("")
        setPassword("")
      }

    } catch (err) {
      console.error(err)
      alert("Server error")
    }

    setLoading(false)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Secure access to dashboard
          </p>
        </div>


        {/* ================= LOGIN ================= */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <button className="w-full bg-red-600 text-white py-3 rounded-lg">
              {loading ? "Processing..." : "Login"}
            </button>

            <p
              onClick={() => setMode("forgot")}
              className="text-sm text-red-600 text-center cursor-pointer mt-2"
            >
              Forgot Password?
            </p>

          </form>
        )}


        {/* ================= LOGIN OTP ================= */}
        {mode === "otp-login" && (
          <form onSubmit={handleVerifyLoginOtp} className="space-y-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-4 py-3 text-center tracking-widest rounded-lg"
              required
            />

            <button className="w-full bg-black text-white py-3 rounded-lg">
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

          </form>
        )}


        {/* ================= FORGOT PASSWORD ================= */}
        {mode === "forgot" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <button className="w-full bg-red-600 text-white py-3 rounded-lg">
              {loading ? "Sending..." : "Send Reset Code"}
            </button>

            <p
              onClick={() => setMode("login")}
              className="text-center text-sm text-gray-500 cursor-pointer"
            >
              Back to login
            </p>

          </form>
        )}


        {/* ================= RESET PASSWORD ================= */}
        {mode === "otp-reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border px-4 py-3 text-center tracking-widest rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
              required
            />

            <button className="w-full bg-black text-white py-3 rounded-lg">
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>
        )}

      </div>
    </div>
  )
}

export default AdminLogin