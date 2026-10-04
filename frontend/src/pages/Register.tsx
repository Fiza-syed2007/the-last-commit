import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GitCommit,
  Terminal,
} from "lucide-react";
import { useState } from "react";

const steps = ["AUTHOR", "TEAM", "PROJECT", "REVIEW"];

interface FormData {
  fullName: string;
  email: string;
  college: string;
  teamName: string;
  teamSize: string;
  teamMembers: string;
  projectName: string;
  track: string;
  description: string;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  college: "",
  teamName: "",
  teamSize: "",
  teamMembers: "",
  projectName: "",
  track: "",
  description: "",
};

function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const validateStep = () => {
    setError("");

    if (currentStep === 0) {
      if (
        !formData.fullName.trim() ||
        !formData.email.trim() ||
        !formData.college.trim()
      ) {
        setError("Complete all author fields before continuing.");
        return false;
      }

      if (!formData.email.includes("@")) {
        setError("Enter a valid email address.");
        return false;
      }
    }

    if (currentStep === 1) {
      if (
        !formData.teamName.trim() ||
        !formData.teamSize.trim() ||
        !formData.teamMembers.trim()
      ) {
        setError("Complete all team fields before continuing.");
        return false;
      }

      const size = Number(formData.teamSize);

      if (!Number.isInteger(size) || size < 1) {
        setError("Team size must be a valid number.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (
        !formData.projectName.trim() ||
        !formData.track.trim() ||
        !formData.description.trim()
      ) {
        setError("Complete all project fields before continuing.");
        return false;
      }
    }

    return true;
  };

  const handleContinue = () => {
    if (!validateStep()) {
      return;
    }

    setCurrentStep((step) => Math.min(steps.length - 1, step + 1));
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          teamSize: Number(formData.teamSize),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      console.log("Registration created:", data.registration);

      setSubmitted(true);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit registration."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-5 text-white md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl border border-green-400/30 bg-[#080808] p-8 md:p-12"
        >
          <div className="font-mono text-xs text-green-400">
            COMMIT SUCCESSFUL
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] md:text-7xl">
            YOU'RE
            <br />
            <span className="text-green-400">IN.</span>
          </h1>

          <div className="mt-8 border border-white/10 bg-black p-5 font-mono text-xs leading-7">
            <p className="text-gray-600">$ git status</p>
            <p className="text-green-400">
              ✓ REGISTRATION CREATED
            </p>
            <p className="text-gray-500">
              ✓ TEAM REGISTERED
            </p>
            <p className="text-gray-500">
              ✓ PROJECT RECORDED
            </p>
            <p className="mt-4 text-white">
              STATUS: PENDING REVIEW
            </p>
          </div>

          <p className="mt-8 text-sm leading-7 text-gray-500">
            Your registration has been submitted successfully. Keep an eye on
            your email for further instructions.
          </p>

          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 bg-green-400 px-5 py-3 font-mono text-xs font-bold text-black transition hover:bg-green-300"
          >
            RETURN TO REPOSITORY
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <a
            href="/"
            className="flex items-center gap-2 font-mono text-xs text-gray-500 transition hover:text-white"
          >
            <ArrowLeft size={14} />
            RETURN TO REPOSITORY
          </a>

          <div className="flex items-center gap-2 font-mono text-[10px] text-green-400">
            <GitCommit size={13} />
            FINAL_COMMIT
          </div>
        </div>

        {/* Heading */}
        <div className="grid gap-12 py-20 lg:grid-cols-[0.4fr_1fr] lg:py-28">
          <div>
            <p className="font-mono text-xs text-green-400">
              REGISTRATION_PROTOCOL
            </p>

            <div className="mt-5 font-mono text-[10px] leading-5 text-gray-600">
              CREATE YOUR ENTRY
              <br />
              BEFORE THE DEADLINE.
            </div>
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-black leading-[0.85] tracking-[-0.07em] md:text-9xl"
            >
              CREATE
              <br />
              YOUR
              <br />
              <span className="text-green-400">COMMIT.</span>
            </motion.h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-gray-500">
              Register your team and prepare the information required to enter
              the repository.
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="border-y border-white/10 py-5">
          <div className="flex flex-wrap gap-6 font-mono text-[10px]">
            {steps.map((step, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-2 ${
                    active
                      ? "text-green-400"
                      : completed
                        ? "text-white"
                        : "text-gray-700"
                  }`}
                >
                  <span>
                    {completed ? <Check size={12} /> : `0${index + 1}`}
                  </span>

                  {step}
                </div>
              );
            })}
          </div>
        </div>

        {/* Registration workspace */}
        <div className="grid gap-8 py-12 lg:grid-cols-[1fr_0.35fr]">
          {/* Form */}
          <div className="border border-white/10 bg-[#080808]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-green-400" />

                <span className="font-mono text-[10px] text-gray-500">
                  registration.config
                </span>
              </div>

              <span className="font-mono text-[9px] text-gray-700">
                STEP {currentStep + 1}/4
              </span>
            </div>

            <div className="p-6 md:p-10">
              {currentStep === 0 && (
                <AuthorStep
                  formData={formData}
                  updateField={updateField}
                />
              )}

              {currentStep === 1 && (
                <TeamStep
                  formData={formData}
                  updateField={updateField}
                />
              )}

              {currentStep === 2 && (
                <ProjectStep
                  formData={formData}
                  updateField={updateField}
                />
              )}

              {currentStep === 3 && <ReviewStep formData={formData} />}

              {/* Error */}
              {error && (
                <div className="mt-8 border border-red-400/30 bg-red-400/[0.04] px-4 py-3 font-mono text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 flex justify-between border-t border-white/10 pt-6">
                <button
                  type="button"
                  disabled={currentStep === 0 || isSubmitting}
                  onClick={() =>
                    setCurrentStep((step) => Math.max(0, step - 1))
                  }
                  className="flex items-center gap-2 font-mono text-[10px] text-gray-600 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft size={13} />
                  PREVIOUS
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-green-400 px-5 py-3 font-mono text-[10px] font-bold text-black transition hover:bg-green-300 disabled:cursor-wait disabled:opacity-50"
                  >
                    {isSubmitting ? "CREATING..." : "CREATE COMMIT"}
                    <GitCommit size={13} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="flex items-center gap-2 bg-green-400 px-5 py-3 font-mono text-[10px] font-bold text-black transition hover:bg-green-300"
                  >
                    CONTINUE
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Side status */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 border border-white/10 p-6 font-mono text-[10px]">
              <div className="text-gray-600">REPOSITORY</div>

              <div className="mt-2 text-white">THE_LAST_COMMIT</div>

              <div className="my-6 h-px bg-white/10" />

              <div className="space-y-4">
                <StatusLine
                  label="AUTH"
                  value={
                    formData.fullName &&
                    formData.email &&
                    formData.college
                      ? "READY"
                      : "PENDING"
                  }
                />

                <StatusLine
                  label="TEAM"
                  value={
                    formData.teamName &&
                    formData.teamSize &&
                    formData.teamMembers
                      ? "READY"
                      : "PENDING"
                  }
                />

                <StatusLine
                  label="PROJECT"
                  value={
                    formData.projectName &&
                    formData.track &&
                    formData.description
                      ? "READY"
                      : "PENDING"
                  }
                />

                <StatusLine
                  label="COMMIT"
                  value={submitted ? "CREATED" : "WAITING"}
                />
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-gray-700">
                Your information will be submitted securely to the
                registration system.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function StatusLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span
        className={
          value === "READY" || value === "CREATED"
            ? "text-green-400"
            : "text-gray-500"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block font-mono text-[10px] text-gray-500">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-white/10 bg-black px-4 py-4 font-mono text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-green-400/50"
      />
    </label>
  );
}

function AuthorStep({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div>
      <div className="mb-10">
        <p className="font-mono text-[10px] text-green-400">STEP 01</p>

        <h2 className="mt-3 text-3xl font-bold">AUTHOR</h2>

        <p className="mt-3 text-sm text-gray-600">
          Tell us who is making the commit.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="FULL NAME"
          placeholder="Enter your name"
          value={formData.fullName}
          onChange={(value) => updateField("fullName", value)}
        />

        <Input
          label="EMAIL"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={(value) => updateField("email", value)}
        />

        <Input
          label="COLLEGE / UNIVERSITY"
          placeholder="Enter your institution"
          value={formData.college}
          onChange={(value) => updateField("college", value)}
        />
      </div>
    </div>
  );
}

function TeamStep({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div>
      <div className="mb-10">
        <p className="font-mono text-[10px] text-green-400">STEP 02</p>

        <h2 className="mt-3 text-3xl font-bold">TEAM</h2>

        <p className="mt-3 text-sm text-gray-600">
          Configure the team behind the repository.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="TEAM NAME"
          placeholder="Enter team name"
          value={formData.teamName}
          onChange={(value) => updateField("teamName", value)}
        />

        <Input
          label="TEAM SIZE"
          placeholder="e.g. 3"
          type="number"
          value={formData.teamSize}
          onChange={(value) => updateField("teamSize", value)}
        />

        <Input
          label="TEAM MEMBERS"
          placeholder="Names separated by commas"
          value={formData.teamMembers}
          onChange={(value) => updateField("teamMembers", value)}
        />
      </div>
    </div>
  );
}

function ProjectStep({
  formData,
  updateField,
}: {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div>
      <div className="mb-10">
        <p className="font-mono text-[10px] text-green-400">STEP 03</p>

        <h2 className="mt-3 text-3xl font-bold">PROJECT</h2>

        <p className="mt-3 text-sm text-gray-600">
          Give the judges a first look at what you're building.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          label="PROJECT NAME"
          placeholder="Enter project name"
          value={formData.projectName}
          onChange={(value) => updateField("projectName", value)}
        />

        <Input
          label="TRACK"
          placeholder="e.g. AI / Web / Cloud"
          value={formData.track}
          onChange={(value) => updateField("track", value)}
        />

        <label className="block">
          <span className="mb-3 block font-mono text-[10px] text-gray-500">
            PROJECT DESCRIPTION
          </span>

          <textarea
            rows={6}
            value={formData.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            placeholder="Describe what you're building..."
            className="w-full resize-none border border-white/10 bg-black px-4 py-4 font-mono text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-green-400/50"
          />
        </label>
      </div>
    </div>
  );
}

function ReviewStep({ formData }: { formData: FormData }) {
  return (
    <div>
      <div className="mb-10">
        <p className="font-mono text-[10px] text-green-400">STEP 04</p>

        <h2 className="mt-3 text-3xl font-bold">REVIEW</h2>

        <p className="mt-3 text-sm text-gray-600">
          Check your configuration before creating the commit.
        </p>
      </div>

      <div className="border border-white/10 bg-black p-6 font-mono text-xs leading-7">
        <p className="text-gray-600">$ git diff --registration</p>

        <div className="mt-6 space-y-1">
          <p>
            <span className="text-gray-600">author:</span>{" "}
            <span className="text-white">{formData.fullName}</span>
          </p>

          <p>
            <span className="text-gray-600">email:</span>{" "}
            <span className="text-white">{formData.email}</span>
          </p>

          <p>
            <span className="text-gray-600">college:</span>{" "}
            <span className="text-white">{formData.college}</span>
          </p>

          <p>
            <span className="text-gray-600">team:</span>{" "}
            <span className="text-white">{formData.teamName}</span>
          </p>

          <p>
            <span className="text-gray-600">team_size:</span>{" "}
            <span className="text-white">{formData.teamSize}</span>
          </p>

          <p>
            <span className="text-gray-600">members:</span>{" "}
            <span className="text-white">{formData.teamMembers}</span>
          </p>

          <p>
            <span className="text-gray-600">project:</span>{" "}
            <span className="text-white">{formData.projectName}</span>
          </p>

          <p>
            <span className="text-gray-600">track:</span>{" "}
            <span className="text-white">{formData.track}</span>
          </p>

          <p>
            <span className="text-gray-600">description:</span>{" "}
            <span className="text-white">{formData.description}</span>
          </p>
        </div>

        <div className="my-6 h-px bg-white/10" />

        <p className="text-green-400">+ registration configured</p>

        <p className="mt-3 text-gray-600">
          Everything looks ready.
        </p>

        <p className="mt-3 text-white">
          CREATE COMMIT will submit this registration.
        </p>
      </div>
    </div>
  );
}

export default Register;