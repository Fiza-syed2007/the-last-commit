import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("adminToken", data.token);

      navigate("/admin");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border border-white/10 bg-[#090909]"
        >
          <div className="border-b border-white/10 px-6 py-5">
            <div className="mb-5 flex items-center justify-between">
              <ShieldCheck
                size={20}
                className="text-green-400"
              />

              <span className="font-mono text-[10px] text-gray-600">
                ADMIN_ACCESS
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              Repository Control
            </h1>

            <p className="mt-2 font-mono text-xs text-gray-500">
              Authenticate to access The Last Commit admin panel.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6"
          >
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-gray-500">
                Admin Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full border border-white/10 bg-black px-4 py-3 text-sm outline-none transition placeholder:text-gray-700 focus:border-green-400/50"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-gray-500">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="••••••••••••"
                  required
                  className="w-full border border-white/10 bg-black py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-700 focus:border-green-400/50"
                />
              </div>
            </div>

            {error && (
              <div className="border border-red-400/20 bg-red-400/5 px-4 py-3 font-mono text-xs text-red-400">
                ERROR: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 bg-green-400 px-5 py-3 font-mono text-xs font-bold text-black transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}

              {!loading && (
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="border-t border-white/10 px-6 py-4 font-mono text-[9px] text-gray-700">
            THE_LAST_COMMIT // RESTRICTED ACCESS
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default AdminLogin;
