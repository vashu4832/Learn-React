export function Button({label, onClick}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-gray-700 rounded-3xl w-full box-border border border-transparent hover:bg-gray-950 focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
    >
      {label}
    </button>
  );
}
