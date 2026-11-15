import { supabase } from '../lib/supabase';
import { hardSkills, softSkills } from '../data/skills'; // Import your static fallback

export async function getPublicSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('is_visible', true)
    .order('display_order', { ascending: true });

  if (error || !data || data.length === 0) {
    // Fallback to static data if DB is empty
    return [...hardSkills, ...softSkills];
  }

  // Just return the data! No mapping needed.
  return data; 
}