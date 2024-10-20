import React from "react";
import { ArrowRight, Upload, Zap, Shield } from "lucide-react";
import Header from "./components/header";
import FeatureCard from "./components/featureCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-300 font-sans">
      <div className="relative">
        <Header />

        <main className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100 leading-tight">
              Transform Your Images <br className="hidden md:inline" />
              with <span className="text-blue-400">Ease</span>
            </h2>
            <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
              Experience quick and secure image format conversion and resize
              without compromising quality. Simplify your digital workflow
              today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/format"
                className="bg-blue-600 text-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 group"
              >
                Start Converting
                <ArrowRight
                  className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  size={20}
                />
              </Link>
              <Link
                href="/size"
                className="bg-blue-600 text-gray-100 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 group"
              >
                Start resize
                <ArrowRight
                  className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  size={20}
                />
              </Link>
            </div>
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Upload size={32} />}
              title="Easy Upload"
              description="Drag & drop or select files for instant conversion. Support for all major formats."
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Fast Processing"
              description="Our optimized engine ensures quick file transformation without quality loss."
            />
            <FeatureCard
              icon={<Shield size={32} />}
              title="Secure & Private"
              description="Your files are encrypted and automatically deleted after conversion."
            />
          </div>

          <div className="mt-24 text-center">
            <h3 className="text-2xl font-bold mb-6 text-blue-400">
              Trusted by Professionals
            </h3>
            <div className="flex flex-wrap justify-center gap-8 text-gray-500">
              {["Adobe", "Microsoft", "Google", "Amazon", "Apple"].map(
                (company) => (
                  <div
                    key={company}
                    className="text-lg font-medium hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                  >
                    {company}
                  </div>
                )
              )}
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 py-8 mt-20">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; 2024 ImageConvert. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
