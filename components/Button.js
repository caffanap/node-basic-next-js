export default function Button({ click, text }) {
  return (
    <button
      onClick={click}
      className=" px-4 py-2 bg-purple-600 shadow-md hover:opacity-80 text-white rounded-full focus:outline-none focus:ring-0"
    >
      {text}
    </button>
  );
}
