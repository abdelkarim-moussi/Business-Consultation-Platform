import React from "react";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AuthProvider } from "../../context/AuthContext";

export default function ArticleDetails() {
  return (
    <>
      <AuthProvider>
        <NavBar />
      </AuthProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="bg-[#e4eff0] py-10 px-4 text-center mt-20">
          <h2 className="text-4xl font-bold text-[#1e4c5a]">
            The Secrets of Business Growth
          </h2>
          <p className="text-gray-600 mt-2">
            By <span className="font-medium">Jane Tony</span> | March 20, 2025
          </p>
        </div>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-10 p-6 max-w-6xl mx-auto mt-6">
          <div className="md:col-span-2 space-y-6">
            <img
              src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1"
              alt="Article Cover"
              className="rounded-2xl shadow-md"
            />
            <article className="prose max-w-none prose-lg prose-blue">
              <p>
                In today’s competitive market, growing a business isn’t just
                about having a good product. It's about understanding your
                audience, streamlining operations, and leveraging expert advice
                when necessary.
              </p>
              <p>
                At BusConsult, we connect you with seasoned consultants who help
                startups like yours scale with smart strategies and actionable
                insights. Whether it’s marketing, finance, or team management —
                expert support can be a game-changer.
              </p>
              <h3>Why You Need Expert Help</h3>
              <ul>
                <li>Gain clarity in your strategy</li>
                <li>Access tried and tested methodologies</li>
                <li>Avoid common startup pitfalls</li>
              </ul>
              <p>
                Join the growing number of entrepreneurs who are transforming
                their businesses with BusConsult.
              </p>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="bg-[#f4f8f9] p-4 rounded-2xl shadow-md">
              <h4 className="font-semibold text-lg mb-2 text-[#1e4c5a]">
                About the Author
              </h4>
              <div className="flex items-center space-x-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="w-14 h-14 rounded-full"
                  alt="Jane Tony"
                />
                <div>
                  <p className="font-bold text-[#1e4c5a]">Jane Tony</p>
                  <p className="text-sm text-gray-600">
                    Self Development Coach
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f4f8f9] p-4 rounded-2xl shadow-md">
              <h4 className="font-semibold text-lg mb-2 text-[#1e4c5a]">
                Related Articles
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline text-[#1e4c5a]">
                    How to Build a Business Plan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-[#1e4c5a]">
                    Top 5 Marketing Tools for Startups
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-[#1e4c5a]">
                    Funding Tips from Experts
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </main>
      </div>
      <Footer />
    </>
  );
}
