import FeaturedCategories from "@/components/home/FeaturedCategories";
import { FeaturedTutors } from "@/components/home/FeaturedTutors";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import InfiniteMarquee from "@/components/home/InfiniteMarquee";
import CallToAction from "@/components/home/CallToAction";
import FeaturedReviews from "@/components/home/FeaturedReviews";
import { Tutor } from "@/components/tutors/TutorCard";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";
import FAQ from "@/components/home/faq";
import InfoSection from "@/components/home/InfoSection";

// Server-side fetching logic
async function getFeaturedTutors(): Promise<Tutor[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    // Request a higher limit to capture available featured options across records
    const response = await fetch(`${backendUrl}/api/tutor/featured`, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tutor data");
    }

    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      return [];
    }

    // Exact structural mapping from your postman payload layout to front-end props
    return json.data.map((item: any) => ({
      id: item.id,
      name: item.name || item.user?.name || "Anonymous",
      user: {
        image: item.user?.image,
      },
      isVerified: item.isVerified ?? false,
      isFeatured: item.isFeatured ?? false,

      rating: item.rating ?? 0,
      reviewCount: item.reviewCount ?? 0,
      categories: Array.isArray(item.categories) ? item.categories : [],
      bio: item.bio ?? "No biography details available.",
      pricePerHour: item.pricePerHour ?? 0,
      experienceYears: item.experienceYears ?? 0,
    }));
  } catch (error) {
    console.error("Error loading featured tutors sequence:", error);
    return [];
  }
}

export default async function HomePage() {
  const tutors = await getFeaturedTutors();
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  const isLoggedIn = !!session?.data;

  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
      <main className="flex-grow w-full">
        <Hero />
        <InfoSection />
        <HowItWorks />
        <FeaturedCategories />

        <FeaturedTutors initialFeaturedTutors={tutors} />
        <FeaturedReviews />
        <FAQ />
        <InfiniteMarquee />
        {!isLoggedIn && <CallToAction />}
      </main>
    </div>
  );
}
