'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEmailSection = pathname.startsWith('/docs/api/email');
  const isDataSection = pathname.startsWith('/docs/api/data');
  const isSMSSection = pathname.startsWith('/docs/api/sms');
  const isSandboxSection = pathname.startsWith('/docs/sandbox');
  const [emailDropdownOpen, setEmailDropdownOpen] = useState(isEmailSection);
  const [dataDropdownOpen, setDataDropdownOpen] = useState(isDataSection);
  const [smsDropdownOpen, setSmsDropdownOpen] = useState(isSMSSection);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-open dropdown when navigating to email section
  useEffect(() => {
    if (isEmailSection) {
      setEmailDropdownOpen(true);
    }
  }, [isEmailSection]);

  // Auto-open dropdown when navigating to data section
  useEffect(() => {
    if (isDataSection) {
      setDataDropdownOpen(true);
    }
  }, [isDataSection]);

  // Auto-open dropdown when navigating to sms section
  useEffect(() => {
    if (isSMSSection) {
      setSmsDropdownOpen(true);
    }
  }, [isSMSSection]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const isActive = (path: string) => pathname === path;

  // Sidebar content component
  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      <nav className={`flex-1 overflow-y-auto p-4 space-y-1 ${collapsed ? 'px-2' : ''}`}>
        <div className="pb-4">
          {!collapsed && <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 px-2">Overview</h3>}
          <Link 
            href="/docs" 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
              isActive('/docs') 
                ? 'text-blue-400 bg-blue-500/10 font-medium' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Introduction' : undefined}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {!collapsed && <span>Introduction</span>}
          </Link>
          <Link 
            href="/docs/quickstart" 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
              isActive('/docs/quickstart') 
                ? 'text-blue-400 bg-blue-500/10 font-medium' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Quick Start' : undefined}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {!collapsed && <span>Quick Start</span>}
          </Link>
          <Link 
            href="/docs/authentication" 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
              isActive('/docs/authentication') 
                ? 'text-blue-400 bg-blue-500/10 font-medium' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Authentication' : undefined}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            {!collapsed && <span>Authentication</span>}
          </Link>
          <Link 
            href="/docs/rate-limits" 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
              isActive('/docs/rate-limits') 
                ? 'text-blue-400 bg-blue-500/10 font-medium' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Rate Limits' : undefined}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {!collapsed && <span>Rate Limits</span>}
          </Link>
          <Link 
            href="/docs/errors" 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
              isActive('/docs/errors') 
                ? 'text-blue-400 bg-blue-500/10 font-medium' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Error Handling' : undefined}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {!collapsed && <span>Error Handling</span>}
          </Link>
          <Link 
            href="/docs/sandbox" 
            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded transition-colors ${
              isActive('/docs/sandbox') || isSandboxSection
                ? 'text-amber-400 bg-amber-500/10 font-medium' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Sandbox Mode' : undefined}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            {!collapsed && <span>Sandbox Mode</span>}
          </Link>
        </div>

        {/* Email API */}
        <div>
          <button 
            onClick={() => !collapsed && setEmailDropdownOpen(!emailDropdownOpen)}
            className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium rounded transition-colors ${isEmailSection || emailDropdownOpen ? 'text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${collapsed ? 'justify-center' : 'justify-between'}`}
            title={collapsed ? 'Email API' : undefined}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {!collapsed && <span>Email API</span>}
            </div>
            {!collapsed && (
              <svg className={`w-4 h-4 transition-transform duration-200 ${emailDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          
          {!collapsed && (
            <div className={`overflow-hidden transition-all duration-200 ${emailDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="relative ml-2 pl-4 mt-1 space-y-0.5">
                <div className="absolute left-2 top-0 bottom-2 w-px bg-white/10"></div>
                <Link 
                  href="/docs/api/email" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/email') 
                      ? 'text-blue-400 bg-blue-500/5 font-medium border-blue-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Send Email
                </Link>
                <Link 
                  href="/docs/api/email/batch" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/email/batch') 
                      ? 'text-blue-400 bg-blue-500/5 font-medium border-blue-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Batch Send
                </Link>
                <Link 
                  href="/docs/api/email/domains" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/email/domains') 
                      ? 'text-blue-400 bg-blue-500/5 font-medium border-blue-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Domains
                </Link>
                <Link 
                  href="/docs/api/email/webhooks" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/email/webhooks') 
                      ? 'text-blue-400 bg-blue-500/5 font-medium border-blue-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Webhooks
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Data Bundles API */}
        <div className="pt-2">
          <button 
            onClick={() => !collapsed && setDataDropdownOpen(!dataDropdownOpen)}
            className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium rounded transition-colors ${isDataSection || dataDropdownOpen ? 'text-green-400' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${collapsed ? 'justify-center' : 'justify-between'}`}
            title={collapsed ? 'Data Bundles API' : undefined}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              {!collapsed && <span>Data Bundles API</span>}
            </div>
            {!collapsed && (
              <svg className={`w-4 h-4 transition-transform duration-200 ${dataDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          
          {!collapsed && (
            <div className={`overflow-hidden transition-all duration-200 ${dataDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="relative ml-2 pl-4 mt-1 space-y-0.5">
                <div className="absolute left-2 top-0 bottom-2 w-px bg-white/10"></div>
                <Link 
                  href="/docs/api/data" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/data') 
                      ? 'text-green-400 bg-green-500/5 font-medium border-green-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  List Packages
                </Link>
                <Link 
                  href="/docs/api/data/purchase" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/data/purchase') 
                      ? 'text-green-400 bg-green-500/5 font-medium border-green-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Purchase Data
                </Link>
                <Link 
                  href="/docs/api/data/status" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/data/status') 
                      ? 'text-green-400 bg-green-500/5 font-medium border-green-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Check Status
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* SMS API */}
        <div className="pt-2">
          <button 
            onClick={() => !collapsed && setSmsDropdownOpen(!smsDropdownOpen)}
            className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm font-medium rounded transition-colors ${isSMSSection || smsDropdownOpen ? 'text-purple-400' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${collapsed ? 'justify-center' : 'justify-between'}`}
            title={collapsed ? 'SMS API' : undefined}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {!collapsed && <span>SMS API</span>}
            </div>
            {!collapsed && (
              <svg className={`w-4 h-4 transition-transform duration-200 ${smsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          
          {!collapsed && (
            <div className={`overflow-hidden transition-all duration-200 ${smsDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="relative ml-2 pl-4 mt-1 space-y-0.5">
                <div className="absolute left-2 top-0 bottom-2 w-px bg-white/10"></div>
                <Link 
                  href="/docs/api/sms" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/sms') 
                      ? 'text-purple-400 bg-purple-500/5 font-medium border-purple-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Send SMS
                </Link>
                <Link 
                  href="/docs/api/sms/pricing" 
                  className={`block px-3 py-1.5 text-sm transition-colors border-l ${
                    isActive('/docs/api/sms/pricing') 
                      ? 'text-purple-400 bg-purple-500/5 font-medium border-purple-500' 
                      : 'text-gray-400 hover:text-white border-transparent hover:border-gray-600'
                  }`}
                >
                  Pricing
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Coming Soon */}
        <div className="pt-4">
          <button 
            className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition-colors ${collapsed ? 'justify-center' : 'justify-between'}`}
            title={collapsed ? 'Airtime API (Coming Soon)' : undefined}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {!collapsed && <span>Airtime API</span>}
            </div>
            {!collapsed && <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">Soon</span>}
          </button>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        {collapsed ? (
          <div className="flex justify-center">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" title="All systems operational"></span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            All systems operational
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e5e5e5] antialiased">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Sheet */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-[#0b0c0e] border-r border-white/5 z-50 flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Mobile Sidebar Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="SendComms" className="w-12 h-12 object-contain" />
            <span className="text-lg font-bold tracking-tight text-white">SendComms</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarContent collapsed={false} />
      </aside>

      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-white/5 bg-[#0b0c0e] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors lg:hidden"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <Link href="/docs" className="flex items-center gap-2">
              <img src="/logo.png" alt="SendComms" className="w-12 h-12 object-contain" />
              <span className="text-lg font-bold tracking-tight text-white hidden sm:inline">SendComms</span>
            </Link>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1c1e21] text-gray-400 border border-white/5 hidden sm:inline">v1.0.0</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-3 lg:px-4 rounded-lg transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Toggle Button - Outside sidebar */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center w-6 h-12 bg-[#1c1e21] border border-white/10 border-l-0 rounded-r-lg hover:bg-[#252729] transition-all shadow-lg"
          style={{ left: sidebarCollapsed ? '60px' : '280px' }}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Desktop Sidebar */}
        <aside className={`relative bg-[#0b0c0e] border-r border-white/5 h-[calc(100vh-64px)] sticky top-16 hidden lg:flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'w-[60px]' : 'w-[280px]'}`}>
          <SidebarContent collapsed={sidebarCollapsed} />
        </aside>

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-64px)]">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6 lg:py-10 pb-24">
            {children}
            
            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-white/5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="SendComms" className="w-12 h-12 object-contain" />
                  <span>SendComms Documentation</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Developed by</span>
                  <a 
                    href="https://angeloasante.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Travis Moore (Angelo Asante)
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
