import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminLogin() {

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const baseURL = import.meta.env.VITE_API_URL // <-- use .env.production

  // STEP 1 → LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseURL}/api/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
      } else {
        setStep(2)
      }

    } catch (err) {
      console.error(err)
      alert("Server error")
    }

    setLoading(false)
  }

  // STEP 2 → VERIFY OTP
  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseURL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        {/* LOGO / TITLE */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-wide">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Secure access to dashboard
          </p>
        </div>

        {/* STEP 1 → LOGIN */}
        {step === 1 && (
          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              {loading ? "Processing..." : "Login"}
            </button>

          </form>
        )}

        {/* STEP 2 → OTP */}
        {step === 2 && (
          <form onSubmit={handleVerify} className="space-y-4">

            <p className="text-center text-sm text-gray-500">
              Enter the verification code sent to your email
            </p>

            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border px-4 py-3 rounded-lg text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

          </form>
        )}

      </div>

    </div>
  )
}

export default AdminLogin