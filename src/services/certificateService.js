import { supabase } from "../lib/supabase";

export async function getCertificates() {
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("issue_date", { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((cert) => ({
    id: cert.id,
    title: cert.title,
    issuer: cert.issuer,
    date: cert.issue_date,
    image: cert.certificate_image,
    credentialUrl: cert.certificate_url,
    category: "Certificate",
  }));
}