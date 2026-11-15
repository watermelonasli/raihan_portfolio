import { motion } from "motion/react";
import SectionTitle from "../ui/SectionTitle";
import CertificateCard from "../ui/CertificateCard";

// 1. Import the hook and rename static certificates
import { useSupabaseData } from "../../hooks/useSupabaseData";
import { certificates as staticCertificates } from "../../data/certificates";

export default function Certificates() {
  // 2. Fetch from DB (passing empty array as fallback since we merge manually)
  const { data: dbCertificates } = useSupabaseData('certificates', [], { is_visible: true });

  // 3. Merge static and database certificates
  const allCertsMap = new Map();
  
  // Add static ones first
  staticCertificates.forEach(cert => allCertsMap.set(cert.id, cert));
  
  // Add DB ones (overwrites static if ID matches)
  dbCertificates.forEach(cert => allCertsMap.set(cert.id, cert));

  // Convert back to array
  const combinedCertificates = Array.from(allCertsMap.values());

  return (
    <section id="certificates" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle badge="Achievements" title="Certificates & Awards" subtitle="Proof of the extra miles — online courses, competitions, and professional milestones." />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 4. Map over the combined array */}
          {combinedCertificates.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <CertificateCard certificate={cert} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}