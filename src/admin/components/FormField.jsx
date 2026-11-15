export default function FormField({ label, error, children, required }) {
  return (
    <div className="flex flex-col gap-1.5 mb-5">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="text-slate-900 text-sm">
        {/* We apply standard styles to inputs globally via a class wrapper, 
            or you can pass standard tailwind classes to the inputs inside the children */}
        {children}
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
}