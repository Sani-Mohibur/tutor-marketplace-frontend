"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { TutorsFilterSidebar } from "@/components/tutors/TutorsFilterSidebar";
import { TutorsGrid } from "@/components/tutors/TutorsGrid";
import { Tutor } from "@/components/tutors/TutorCard";
import { TutorsHeader } from "@/components/tutors/TutorsHeader";
import { useRouter, useSearchParams } from "next/navigation";

const INITIAL_FILTERS = {
  searchName: "",
  priceRange: [0, 150] as [number, number],
  minRating: 0,
  selectedCategories: [] as string[],
};

function TutorsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = useMemo(() => {
    const search = searchParams.get("search") || "";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 150;
    const minRating = Number(searchParams.get("minRating")) || 0;
    const selectedCategories = searchParams.getAll("categories");

    return {
      searchName: search,
      priceRange: [minPrice, maxPrice] as [number, number],
      minRating,
      selectedCategories,
    };
  }, [searchParams]);

  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchTutorsData = async () => {
      try {
        setIsLoading(true);

        // 1. Map reactive filters cleanly onto URL query options
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          ...(filters.searchName && { search: filters.searchName }),
          ...(filters.minRating > 0 && {
            minRating: filters.minRating.toString(),
          }),
          ...(filters.priceRange[0] && {
            minPrice: filters.priceRange[0].toString(),
          }),
          ...(filters.priceRange[1] && {
            maxPrice: filters.priceRange[1].toString(),
          }),
        });

        // 2. Format express multi-query array strings correctly for category records
        filters.selectedCategories.forEach((categoryName) => {
          queryParams.append("categories", categoryName);
        });

        // 3. Parallel execute both network endpoints asynchronously
        const [tutorsRes, categoriesRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tutor/search?${queryParams.toString()}`,
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutor/categories`),
        ]);

        if (!tutorsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to sync dashboard data with backend server");
        }

        const tutorsData = await tutorsRes.json();
        const categoriesData = await categoriesRes.json();

        // 4. Update data and metadata objects from the clean API schema
        setTutors(tutorsData.data || []);
        setTotalPages(tutorsData.meta?.totalPage || 1);

        const categoryNames = (categoriesData.data || []).map(
          (cat: { name: string }) => cat.name,
        );
        setAvailableCategories(categoryNames);
      } catch (error) {
        console.error("Dashboard synchronization exception:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorsData();
  }, [searchParams, currentPage, filters]);

  const createQueryString = (
    page: number,
    updatedFilters: typeof INITIAL_FILTERS,
  ) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (updatedFilters.searchName)
      params.set("search", updatedFilters.searchName);
    if (updatedFilters.minRating > 0)
      params.set("minRating", updatedFilters.minRating.toString());
    if (updatedFilters.priceRange[0] > 0)
      params.set("minPrice", updatedFilters.priceRange[0].toString());
    if (updatedFilters.priceRange[1] < 150)
      params.set("maxPrice", updatedFilters.priceRange[1].toString());

    updatedFilters.selectedCategories.forEach((cat) =>
      params.append("categories", cat),
    );
    return params.toString();
  };

  const handleResetAll = () => {
    router.push("/tutors?page=1");
  };

  const handlePageChange = (page: number) => {
    const queryString = createQueryString(page, filters);
    router.push(`/tutors?${queryString}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (
    updater: React.SetStateAction<typeof INITIAL_FILTERS>,
  ) => {
    const nextFilters =
      typeof updater === "function" ? updater(filters) : updater;
    const queryString = createQueryString(1, nextFilters); // Always forces back to page 1
    router.push(`/tutors?${queryString}`, { scroll: false });
  };

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-8">
      <TutorsHeader
        searchValue={filters.searchName}
        onSearchChange={(value) => {
          handleFilterChange((prev) => ({ ...prev, searchName: value }));
        }}
      />

      <div className="flex flex-col md:flex-row gap-8 items-start pt-2 w-full">
        <TutorsFilterSidebar
          key="tutors-sidebar-filter"
          filters={filters}
          setFilters={handleFilterChange}
          availableCategories={availableCategories}
          onReset={handleResetAll}
        />

        <div className="flex-1 grow w-full min-w-0">
          <TutorsGrid
            tutors={tutors}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}

export default function TutorsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen w-full bg-background pt-24 pb-16 px-4 max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-xs font-bold tracking-wide text-muted-foreground animate-pulse">
            Loading mentoring marketplace database...
          </div>
        </main>
      }
    >
      <TutorsContent />
    </Suspense>
  );
}
