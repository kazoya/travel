"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Flow<T, U> = (input: T) => Promise<U>;

export function useFlow<T, U>(flow: Flow<T, U>) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<U | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const run = async (input: T) => {
    setLoading(true);
    setData(null);
    setError(null);
    try {
      const result = await flow(input);
      setData(result);
      return result;
    } catch (e: any) {
      const errorMessage = e.message || "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, run };
}
