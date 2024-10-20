
import React from 'react';
import Header from '../components/header';
import ImageConverter from './main';

export default function Home(){
 
  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-300 font-sans">
      <div className="relative">
        <Header />

        <main className="container mx-auto px-4 py-20">
          <ImageConverter/>
        </main>

        <footer className="bg-gray-900 py-8 mt-20">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; 2024 ImageConvert. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};





