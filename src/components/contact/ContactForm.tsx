"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-background/50 border border-gray-300 dark:border-gray-800 rounded-2xl p-6 sm:p-10">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">Send us a message</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Have a specific question? Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full h-12 bg-background/80 border border-gray-300 dark:border-gray-800 ${errors.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-emerald-500 dark:focus:border-blue-500 focus:ring-emerald-500/20 dark:focus:ring-blue-500/20'} rounded-xl px-4 text-sm transition-all outline-none focus:ring-4`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full h-12 bg-background/80 border border-gray-300 dark:border-gray-800 ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-emerald-500 dark:focus:border-blue-500 focus:ring-emerald-500/20 dark:focus:ring-blue-500/20'} rounded-xl px-4 text-sm transition-all outline-none focus:ring-4`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            className={`w-full h-12 bg-background/80 border border-gray-300 dark:border-gray-800 ${errors.subject ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-emerald-500 dark:focus:border-blue-500 focus:ring-emerald-500/20 dark:focus:ring-blue-500/20'} rounded-xl px-4 text-sm transition-all outline-none focus:ring-4`}
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className={`w-full bg-background/80 border border-gray-300 dark:border-gray-800 ${errors.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'focus:border-emerald-500 dark:focus:border-blue-500 focus:ring-emerald-500/20 dark:focus:ring-blue-500/20'} rounded-xl p-4 text-sm transition-all outline-none focus:ring-4 resize-none`}
            placeholder="Tell us more about your inquiry..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-blue-600 dark:to-blue-600 hover:from-emerald-500 hover:to-teal-500 dark:hover:from-blue-500 dark:hover:to-blue-500 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20 dark:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
