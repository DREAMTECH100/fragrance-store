function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-12 rounded-xl shadow-xl text-center max-w-xl">
        <h1 className="text-5xl font-bold text-green-600 mb-4">
          ✅ Payment Successful!
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Your payment is being verified securely.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 bg-black text-white px-8 py-3 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;