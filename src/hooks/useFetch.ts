import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";

export function useFetch<T>(
  fetcher: () => Promise<AxiosResponse<T>>,
  initialValue: T,
) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await fetcher();
      setData(res.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, setData, loading, error, refetch };
}
