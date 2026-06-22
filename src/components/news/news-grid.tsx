"use client";

import { NewsCard } from "./news-card";
import type { NewsArticle } from "@/lib/news";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsGrid({ articles, loading }: { articles: NewsArticle[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {articles.map((a, i) => (
        <NewsCard key={a.id} article={a} index={i} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 shimmer">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10 rounded-full" />
      </div>
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-5 w-3/4 mb-4" />
      <Skeleton className="h-3 w-full mb-1.5" />
      <Skeleton className="h-3 w-2/3 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
