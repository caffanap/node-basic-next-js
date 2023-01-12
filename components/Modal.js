export default function Modal({ children, show, title, close }) {
  return (
    show && (
      <div
        className="
        fixed
        flex
        inset-0
        justify-center
        items-center
        z-40
      "
      >
        <div className="relative w-1/3 border shadow-lg z-10 bg-white rounded-lg">
          <div className="w-full flex justify-between items-center p-4">
            <div className="text-secondary-font font-semibold">{title}</div>
            <div
              onClick={close}
              className="cursor-pointer hover:opacity-50 text-red-600"
            >
              Close
            </div>
          </div>
          <div className="px-4 max-h-[70vh] mb-[66px] pb-4">{children}</div>
        </div>
        <div
          onClick={close}
          className="absolute backdrop-blur-md -z-10 w-full h-full"
        />
      </div>
    )
  );
}
