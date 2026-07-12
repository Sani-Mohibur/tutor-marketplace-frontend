"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Ban, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/shared/Pagination";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminContactsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10"
      });

      const res = await fetch(`${apiBase}/contact?${queryParams}`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setMessages(json.data || []);
        setMeta(json.meta || null);
      } else {
        toast.error(json.message || "Failed to load contact messages.");
      }
    } catch (err) {
      console.error("Failed fetching contact messages:", err);
      toast.error("Network communication failure.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage]);

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Contact Messages
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review inquiries submitted by users through the public contact form.
        </p>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-4 sm:px-6 py-4 whitespace-nowrap">Sender Info</th>
                <th className="px-4 sm:px-6 py-4 whitespace-nowrap">Subject & Message</th>
                <th className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">Date Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Fetching contact messages...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <Ban className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Messages Found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-muted/10 transition-colors group"
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-black text-foreground capitalize text-sm">
                            {msg.name}
                          </p>
                          <p className="text-[10.5px] text-muted-foreground mt-0.5">
                            {msg.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="space-y-1 max-w-lg">
                        <p className="font-bold text-foreground text-xs">{msg.subject}</p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {msg.message}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right align-top">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold text-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integrated Shared Pagination Footer Layout */}
      {meta && meta.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", page.toString());
            router.push(`${pathname}?${params.toString()}`);
          }}
        />
      )}
    </div>
  );
}
