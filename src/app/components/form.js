"use client";

import React from 'react';
import Link from 'next/link';

export default function Form() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">Farmer Registration Form</h2>
        </div>
        <div className="p-6">
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src="https://forms.gle/2G2CXULW4VC6EhjC8"
              className="w-full h-full"
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4 flex justify-center">
          <Link href="/" passHref>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}