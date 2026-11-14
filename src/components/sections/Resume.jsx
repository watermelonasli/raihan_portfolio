import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, X, Download } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { profile } from "../../data/profile";

export default function Resume() {
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Path to your PDF file in the public folder
  const cvFile = "/documents/cv.pdf"; 

  useEffect(() => {
    if (isZoomed) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isZoomed]);

  return (
    <section id="resume" className="relative py-24 sm:py-32 bg-surface/30">
      <div className="section-shell">
        <SectionTitle 
          badge="Resume" 
          title="Digital CV" 
          subtitle="Review my qualifications below. Click the preview to view the document in full screen." 
        />

        <div className="mx-auto max-w-4xl">
          {/* Main PDF Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-xl"
          >
            {/* The PDF Iframe */}
            <div 
              className="relative h-125 sm:h-150 w-full cursor-pointer"
              onClick={() => setIsZoomed(true)}
            >
              <iframe
                src={`${cvFile}#toolbar=0&navpanes=0&scrollbar=0`}
                className="h-full w-full border-none pointer-events-none" // pointer-events-none lets the parent div capture the click
                title="CV Preview"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-base/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
                <div className="rounded-full bg-accent p-4 text-accent-contrast shadow-lg transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  <ZoomIn size={24} />
                </div>
              </div>
            </div>

            {/* Download Button overlay */}
            <div className="absolute top-4 right-4 z-10">
              <a 
                href={cvFile} 
                download="Raihan_CV.pdf"
                onClick={(e) => e.stopPropagation()} // Prevents opening the zoom modal when clicking download
                className="inline-flex items-center gap-2 rounded-lg bg-base/80 backdrop-blur-md px-4 py-2 text-sm font-semibold text-heading shadow-sm transition-colors hover:bg-accent hover:text-accent-contrast"
              >
                <Download size={16} /> Download PDF
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="absolute inset-0 bg-base/90 backdrop-blur-md cursor-zoom-out"
            />
            
            {/* Zoomed PDF */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] overflow-hidden rounded-xl bg-surface shadow-2xl border border-line"
            >
              <iframe
                src={cvFile}
                className="h-full w-full border-none"
                title="CV Full Screen"
              />
              
              {/* Close Button */}
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 rounded-full bg-base/80 p-2 text-heading backdrop-blur-md transition-colors hover:bg-accent hover:text-accent-contrast z-10"
                aria-label="Close CV"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}