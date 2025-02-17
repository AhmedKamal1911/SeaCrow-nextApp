"use client";

import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Error statusCode={404} />
        </div>
      </body>
    </html>
  );
}
