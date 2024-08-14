import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 text-gray-800">
        <h1 className="text-2xl font-bold  mb-6">404 - Page Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link className="text-blue-500" href="/">Go back to the home page</Link>
      </div>
    </div>
  );
}
