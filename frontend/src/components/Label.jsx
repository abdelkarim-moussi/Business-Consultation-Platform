export default function Label({ label,forInput }) {
  return (
    <label className="text-sm lowercase" htmlFor={forInput}>
      {label}
    </label>
  );
}
