import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AuthIllustration from "../components/AuthIllustration";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      login(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-purple-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob-reverse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-orange-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] bg-pink-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob-reverse" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-[1000px] h-auto min-h-[600px] rounded-[40px] bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden m-4 flex flex-col md:flex-row">
        
        {/* Left Column: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-blue-500 mb-10 tracking-wider">AVINYA</h1>
            <h2 className="text-[32px] font-semibold text-slate-900 leading-tight mb-2">Welcome Back!</h2>
            <p className="text-sm text-slate-500">Please log in to your account.</p>
          </div>
          
          {error && (
            <div className="rounded-xl bg-red-50 p-4 mb-6 text-sm text-red-600">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-white/60 py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:text-sm"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-white/60 py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:text-sm text-lg tracking-widest"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-slate-500">
                  Remember me
                </label>
              </div>

              <div className="text-xs">
                <a href="#" className="font-medium text-blue-500 hover:text-blue-600">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-500 py-3.5 px-4 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none disabled:opacity-70 transition-colors shadow-sm"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <Link
                to="/register"
                className="flex-1 rounded-xl bg-transparent border border-blue-500 py-3.5 px-4 text-sm font-semibold text-blue-500 text-center hover:bg-blue-50 transition-colors shadow-sm"
              >
                Register
              </Link>
            </div>
          </form>
          
          <p className="mt-8 text-[10px] leading-relaxed text-slate-400 max-w-xs">
            By logging in you agree to our terms and that you have read our data policy.
          </p>
        </div>

        {/* Right Column: Illustration */}
        <div className="hidden md:flex w-full md:w-1/2 p-8 items-center justify-center relative">
           <AuthIllustration />
        </div>
      </div>
    </div>
  );
}

export default Login;
