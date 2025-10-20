// NavigasiMenu.tsx
"use client";

import Link from "next/link";

interface NavigasiMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigasiMenu({ isOpen, onClose }: NavigasiMenuProps) {
  // Menu items sederhana
  const menuItems = [
    { href: "/home", label: "Home", icon: "🏠" },
    { href: "/profile", label: "Profile", icon: "👤" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}