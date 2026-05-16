function WhatsAppButton() {
  const phoneNumber = "2348062392555"; // replace with your WhatsApp number

  const message = encodeURIComponent(
    "Hello Fragrance Solution, I would like to make an enquiry."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-current"
        >
          <path d="M19.11 17.2c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.06 2.86 1.21 3.06.15.19 2.08 3.18 5.04 4.46.7.3 1.25.48 1.67.61.7.22 1.34.19 1.85.12.56-.08 1.7-.69 1.94-1.35.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.55-.34z" />
          <path d="M16.01 3C8.83 3 3 8.74 3 15.82c0 2.5.73 4.93 2.11 7L3 29l6.36-2.04c1.98 1.08 4.2 1.65 6.65 1.65h.01c7.18 0 13.01-5.74 13.01-12.82C29.03 8.74 23.2 3 16.01 3zm0 23.49c-2.12 0-4.2-.57-6.02-1.65l-.43-.25-3.78 1.21 1.23-3.68-.28-.45a10.69 10.69 0 01-1.64-5.75c0-5.92 4.88-10.74 10.89-10.74 6 0 10.88 4.82 10.88 10.74 0 5.92-4.88 10.57-10.85 10.57z" />
        </svg>
      </div>
    </a>
  );
}

export default WhatsAppButton;