import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseData(tableName, fallbackData, filters = {}) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If you want to force static data for testing, set this in your .env
    if (import.meta.env.VITE_ENABLE_STATIC_FALLBACK === 'true') {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        let query = supabase.from(tableName).select('*').order('display_order', { ascending: true });
        
        // Apply filters (e.g., only show visible items)
        if (filters.is_visible !== undefined) query = query.eq('is_visible', true);
        if (filters.is_published !== undefined) query = query.eq('is_published', true);

        const { data: dbData, error } = await query;

        // If DB has data, use it. Otherwise, keep fallback data.
        if (!error && dbData && dbData.length > 0) {
          setData(dbData);
        }
      } catch (err) {
        console.warn(`Error fetching ${tableName}, using fallback data.`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tableName, JSON.stringify(filters)]);

  return { data, loading };
}