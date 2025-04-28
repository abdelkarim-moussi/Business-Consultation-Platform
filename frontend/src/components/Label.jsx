export default function Label({ label,forInput }) {
  return (
    <label className="text-sm capitalize" htmlFor={forInput}>
      {label}
    </label>
  );
}
