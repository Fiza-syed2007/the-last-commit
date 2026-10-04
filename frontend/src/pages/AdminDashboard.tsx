
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  college: string;
  teamName: string;
  teamSize: number;
  teamMembers: string | null;
  projectName: string;
  track: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);

  async function fetchRegistrations() {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch registrations."
        );
      }

      setRegistrations(data.registrations);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load registrations."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRegistrations();
  }, []);

  async function updateStatus(
    id: string,
    status: "APPROVED" | "REJECTED"
  ) {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/registrations/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status."
        );
      }

      setRegistrations((current) =>
        current.map((registration) =>
          registration.id === id
            ? { ...registration, status }
            : registration
        )
      );

      setSelectedRegistration((current) =>
        current && current.id === id
          ? { ...current, status }
          : current
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update status."
      );
    }
  }

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  const pendingCount = registrations.filter(
    (registration) => registration.status === "PENDING"
  ).length;

  const approvedCount = registrations.filter(
    (registration) => registration.status === "APPROVED"
  ).length;

  const rejectedCount = registrations.filter(
    (registration) => registration.status === "REJECTED"
  ).length;

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] text-green-400">
              <ShieldCheck size={14} />
              REPOSITORY CONTROL // ADMIN
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Registration Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Monitor incoming teams and control registration status.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchRegistrations}
              className="flex items-center gap-2 border border-white/10 px-4 py-2 font-mono text-xs text-gray-400 transition hover:border-white/30 hover:text-white"
            >
              <RefreshCw size={14} />
              REFRESH
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 border border-red-400/20 px-4 py-2 font-mono text-xs text-red-400 transition hover:bg-red-400/10"
            >
              <LogOut size={14} />
              LOGOUT
            </button>
          </div>
        </header>

        {/* STAT CARDS */}
        <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="TOTAL REGISTRATIONS"
            value={registrations.length}
            icon={<Users size={17} />}
          />

          <StatCard
            label="PENDING"
            value={pendingCount}
            icon={<Clock3 size={17} />}
          />

          <StatCard
            label="APPROVED"
            value={approvedCount}
            icon={<CheckCircle2 size={17} />}
          />

          <StatCard
            label="REJECTED"
            value={rejectedCount}
            icon={<XCircle size={17} />}
          />
        </section>

        {/* ERROR */}
        {error && (
          <div className="mb-6 border border-red-400/20 bg-red-400/5 px-4 py-3 font-mono text-xs text-red-400">
            ERROR: {error}
          </div>
        )}

        {/* REGISTRATIONS */}
        <section className="border border-white/10 bg-[#090909]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <h2 className="font-mono text-sm font-bold">
                INCOMING COMMITS
              </h2>

              <p className="mt-1 font-mono text-[9px] text-gray-600">
                REGISTRATION QUEUE
              </p>
            </div>

            <span className="font-mono text-[10px] text-gray-600">
              {registrations.length} RECORDS
            </span>
          </div>

          {loading ? (
            <div className="px-5 py-16 text-center font-mono text-xs text-gray-600">
              LOADING REGISTRATIONS...
            </div>
          ) : registrations.length === 0 ? (
            <div className="px-5 py-16 text-center font-mono text-xs text-gray-600">
              NO REGISTRATIONS FOUND.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-white/10 font-mono text-[9px] text-gray-600">
                    <th className="px-5 py-4">TEAM</th>
                    <th className="px-5 py-4">PROJECT</th>
                    <th className="px-5 py-4">TRACK</th>
                    <th className="px-5 py-4">LEAD</th>
                    <th className="px-5 py-4">STATUS</th>
                    <th className="px-5 py-4">ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {registrations.map((registration, index) => (
                    <motion.tr
                      key={registration.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() =>
                        setSelectedRegistration(registration)
                      }
                      className="cursor-pointer border-b border-white/5 transition hover:bg-white/[0.02] last:border-0"
                    >
                      <td className="px-5 py-5">
                        <div className="font-medium">
                          {registration.teamName}
                        </div>

                        <div className="mt-1 font-mono text-[9px] text-gray-600">
                          {registration.teamSize} MEMBERS
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="text-sm">
                          {registration.projectName}
                        </div>

                        <div className="mt-1 max-w-[220px] truncate text-xs text-gray-600">
                          {registration.description}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <span className="border border-white/10 px-2 py-1 font-mono text-[9px] text-gray-400">
                          {registration.track}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="text-sm">
                          {registration.fullName}
                        </div>

                        <div className="mt-1 text-xs text-gray-600">
                          {registration.email}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <StatusBadge status={registration.status} />
                      </td>

                      <td className="px-5 py-5">
                        {registration.status === "PENDING" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                updateStatus(
                                  registration.id,
                                  "APPROVED"
                                );
                              }}
                              className="border border-green-400/20 px-3 py-2 font-mono text-[9px] text-green-400 transition hover:bg-green-400/10"
                            >
                              APPROVE
                            </button>

                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                updateStatus(
                                  registration.id,
                                  "REJECTED"
                                );
                              }}
                              className="border border-red-400/20 px-3 py-2 font-mono text-[9px] text-red-400 transition hover:bg-red-400/10"
                            >
                              REJECT
                            </button>
                          </div>
                        ) : (
                          <span className="font-mono text-[9px] text-gray-700">
                            PROCESSED
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* REGISTRATION DETAILS MODAL */}
      {selectedRegistration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 py-8 backdrop-blur-sm"
          onClick={() => setSelectedRegistration(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-white/10 bg-[#090909]"
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <div className="mb-2 font-mono text-[9px] text-green-400">
                  REGISTRATION_RECORD
                </div>

                <h2 className="text-2xl font-bold">
                  {selectedRegistration.teamName}
                </h2>

                <p className="mt-1 font-mono text-[10px] text-gray-600">
                  ID: {selectedRegistration.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedRegistration(null)}
                className="border border-white/10 p-2 text-gray-500 transition hover:border-white/30 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="grid gap-px bg-white/5 md:grid-cols-2">
              <DetailItem
                label="TEAM LEAD"
                value={selectedRegistration.fullName}
              />

              <DetailItem
                label="EMAIL"
                value={selectedRegistration.email}
              />

              <DetailItem
                label="COLLEGE"
                value={selectedRegistration.college}
              />

              <DetailItem
                label="TEAM SIZE"
                value={`${selectedRegistration.teamSize} members`}
              />

              <DetailItem
                label="TEAM MEMBERS"
                value={
                  selectedRegistration.teamMembers || "Not provided"
                }
              />

              <DetailItem
                label="PROJECT"
                value={selectedRegistration.projectName}
              />

              <DetailItem
                label="TRACK"
                value={selectedRegistration.track}
              />

              <DetailItem
                label="REGISTERED"
                value={new Date(
                  selectedRegistration.createdAt
                ).toLocaleString()}
              />

              <div className="bg-[#090909] p-5 md:col-span-2">
                <div className="mb-2 font-mono text-[9px] text-gray-600">
                  PROJECT DESCRIPTION
                </div>

                <p className="text-sm leading-7 text-gray-300">
                  {selectedRegistration.description}
                </p>
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-5">
              <div>
                <div className="mb-2 font-mono text-[9px] text-gray-600">
                  CURRENT STATUS
                </div>

                <StatusBadge
                  status={selectedRegistration.status}
                />
              </div>

              {selectedRegistration.status === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      updateStatus(
                        selectedRegistration.id,
                        "APPROVED"
                      )
                    }
                    className="border border-green-400/20 px-4 py-2 font-mono text-[10px] text-green-400 transition hover:bg-green-400/10"
                  >
                    APPROVE
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        selectedRegistration.id,
                        "REJECTED"
                      )
                    }
                    className="border border-red-400/20 px-4 py-2 font-mono text-[10px] text-red-400 transition hover:bg-red-400/10"
                  >
                    REJECT
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#090909] p-5">
      <div className="mb-2 font-mono text-[9px] text-gray-600">
        {label}
      </div>

      <div className="break-words text-sm text-gray-200">
        {value}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-white/10 bg-[#090909] p-5">
      <div className="mb-5 flex items-center justify-between text-gray-600">
        <span className="font-mono text-[9px]">{label}</span>
        {icon}
      </div>

      <div className="text-3xl font-bold tracking-tight">
        {value}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Registration["status"];
}) {
  const styles = {
    PENDING: "border-yellow-400/20 text-yellow-400",
    APPROVED: "border-green-400/20 text-green-400",
    REJECTED: "border-red-400/20 text-red-400",
  };

  return (
    <span
      className={`border px-2 py-1 font-mono text-[9px] ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default AdminDashboard;