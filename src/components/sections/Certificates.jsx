import { motion } from "motion/react";
import SectionTitle from "../ui/SectionTitle";
import CertificateCard from "../ui/CertificateCard";
import { certificates } from "../../data/certificates";

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle badge="Achievements" title="Certificates & Awards" subtitle="Proof of the extra miles — online courses, competitions, and professional milestones." />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <CertificateCard certificate={cert} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}