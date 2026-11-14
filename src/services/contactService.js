import { supabase } from "../lib/supabase";

export async function submitContactMessage(data) {
  const { error } = await supabase.from("contact_messages").insert([
    {
      sender_name: data.name,
      sender_email: data.email,
      message: data.message,
    },
  ]);

  if (error) throw new Error(error.message);
  return true;
}