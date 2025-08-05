"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);

    // Simulate API request
    setTimeout(() => {
      const dummyResults = [
        { id: 1, title: "First Result", description: "Description of the first result." },
        { id: 2, title: "Second Result", description: "Another example result here." },
      ];
      setResults(dummyResults);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 mt-12 space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
          </>
        ) : results.length > 0 ? (
          results.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Post ID: {item.id}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
