export default function InputText({ value, change, placeholder }) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={change}
        placeholder={placeholder}
        className="py-2 w-full px-4 rounded-xl text-gray-700 border border-blue-600"
      />
    </>
  );
}
