"use client";

import { useState, useEffect } from "react";
import { Loader2, DollarSign, Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@/components/shared/Pagination";

interface PaymentData {
  id: string; // Booking ID
  amount: number | null;
  currency: string | null;
  paymentStatus: string;
  stripeCheckoutSessionId: string | null;
  createdAt: string;
  studentProfile: {
    user: {
      name: string;
      email: string;
    };
  };
  tutorProfile: {
    user: {
      name: string;
      email: string;
    };
  };
}

interface MetaData {
  page: number;
  limit: number;
  totalPayments: number;
  totalPages: number;
  totalRevenue: number;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const apiBase = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: "10",
          search: searchQuery,
        });

        const res = await fetch(`${apiBase}/admin/payments?${queryParams}`, {
          credentials: "include",
        });
        const json = await res.json();
        
        if (json.success) {
          setPayments(json.data || []);
          setMeta(json.meta || null);
        }
      } catch (err) {
        console.error("Failed fetching payment logs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [currentPage, searchQuery, apiBase]);

  return (
    <div className="space-y-8 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Financial Transactions
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review all platform payments, booking revenue, and transfer records.
        </p>
      </div>



      {/* Filter and Search Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card border border-black/5 dark:border-white/5 p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground">Payment Records</span>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transaction or name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", "1");
              router.push(`${pathname}?${params.toString()}`);
            }}
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-black/5 dark:border-white/5 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-hidden focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      {/* Payments Ledger Table */}
      <div className="bg-card border border-black/5 dark:border-white/5 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Participants</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-20">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-xs text-muted-foreground font-medium">
                        Loading transaction ledger...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                      <DollarSign className="w-8 h-8 opacity-40" />
                      <p className="font-bold text-sm text-foreground">
                        No Payments Found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((payment) => {
                  const method = payment.stripeCheckoutSessionId ? "Stripe" : (payment.paymentStatus === "cash" ? "Cash" : "Credit");
                  return (
                    <tr
                      key={payment.id}
                      className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-black text-foreground font-mono text-[10px]">
                            TX: {payment.stripeCheckoutSessionId ? payment.stripeCheckoutSessionId.substring(0, 16) + '...' : 'N/A'}
                          </div>
                          <div className="text-[9px] text-muted-foreground font-mono uppercase">
                            BK: {payment.id.split('-')[0]}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-xs">
                            <span className="text-muted-foreground">S: </span>
                            <span className="font-bold">{payment.studentProfile?.user?.name || "Unknown"}</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-muted-foreground">T: </span>
                            <span className="font-bold">{payment.tutorProfile?.user?.name || "Unknown"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-black text-foreground">
                          ${(payment.amount || 0).toFixed(2)} <span className="text-[9px] text-muted-foreground font-normal uppercase ml-0.5">{payment.currency || 'USD'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span
                            className={`inline-flex items-center text-[9px] font-black tracking-wide px-2 py-0.5 rounded border uppercase ${
                              payment.paymentStatus === "paid"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : payment.paymentStatus === "cash"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                            }`}
                          >
                            {payment.paymentStatus}
                          </span>
                          <span className="text-[9px] text-muted-foreground font-bold border border-black/5 dark:border-white/5 rounded px-1.5 bg-slate-50 dark:bg-slate-900">
                            {method}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="space-y-0.5">
                          <div className="font-bold text-foreground">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            {new Date(payment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

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
