'use client';

import Link from 'next/link';
import { useState } from 'react';

type Language = 'curl' | 'nodejs' | 'python' | 'php';

const codeExamples: Record<Language, string> = {
  curl: `# Get all SMS pricing
curl -X GET \\
  https://api.sendcomms.com/api/v1/sms/pricing \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Get pricing for a specific country
curl -X GET \\
  "https://api.sendcomms.com/api/v1/sms/pricing?country_code=233" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Get pricing for a phone number
curl -X GET \\
  "https://api.sendcomms.com/api/v1/sms/pricing?phone=+233540800994" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Get pricing by region
curl -X GET \\
  "https://api.sendcomms.com/api/v1/sms/pricing?region=africa" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  nodejs: `import axios from 'axios';

// Get all pricing
const response = await axios.get(
  'https://api.sendcomms.com/api/v1/sms/pricing',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

console.log(response.data);

// Get pricing for specific country
const ghanaPrice = await axios.get(
  'https://api.sendcomms.com/api/v1/sms/pricing?country_code=233',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

// Using fetch
const res = await fetch(
  'https://api.sendcomms.com/api/v1/sms/pricing?region=africa',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);
const data = await res.json();`,
  python: `import requests

# Get all pricing
response = requests.get(
    'https://api.sendcomms.com/api/v1/sms/pricing',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY'
    }
)

pricing = response.json()
print(pricing)

# Get pricing for specific phone number
response = requests.get(
    'https://api.sendcomms.com/api/v1/sms/pricing',
    params={'phone': '+233540800994'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

# Get African pricing only
africa_pricing = requests.get(
    'https://api.sendcomms.com/api/v1/sms/pricing',
    params={'region': 'africa'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)`,
  php: `<?php

$curl = curl_init();

// Get all pricing
curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/sms/pricing',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer YOUR_API_KEY'
    ]
]);

$response = curl_exec($curl);
curl_close($curl);

$pricing = json_decode($response, true);
print_r($pricing);

// Get pricing by country code
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/sms/pricing?country_code=233',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer YOUR_API_KEY'
    ]
]);`
};

export default function SMSPricingDocsPage() {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  const languages: { id: Language; name: string; icon: string }[] = [
    { id: 'curl', name: 'cURL', icon: '🌐' },
    { id: 'nodejs', name: 'Node.js', icon: '📦' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'php', name: 'PHP', icon: '🐘' },
  ];

  return (
    <>
      <div className="text-sm font-medium text-purple-500 mb-2">SMS API</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">SMS Pricing</h1>
      
      <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-6">
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
        <span className="text-gray-300">/api/v1/sms/pricing</span>
      </div>

      <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-8">
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Retrieve SMS pricing for different countries and regions. Use this endpoint to check rates before 
          sending messages or to display pricing to your users.
        </p>
      </div>

      {/* Pricing Overview */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Pricing by Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Africa Pricing */}
          <div className="bg-[#16181b] border border-purple-500/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌍</span>
              <div>
                <h4 className="font-semibold text-white">Africa</h4>
                <span className="text-xs text-purple-400">Optimized Rates</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Ghana (+233)</span>
                <span className="text-white font-mono">$0.029</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nigeria (+234)</span>
                <span className="text-white font-mono">$0.029</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Kenya (+254)</span>
                <span className="text-white font-mono">$0.029</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">South Africa (+27)</span>
                <span className="text-white font-mono">$0.029</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Other African countries</span>
                <span className="font-mono">$0.029</span>
              </div>
            </div>
          </div>

          {/* Global Pricing */}
          <div className="bg-[#16181b] border border-blue-500/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌐</span>
              <div>
                <h4 className="font-semibold text-white">Global</h4>
                <span className="text-xs text-blue-400">Best Rates</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">US/Canada (+1)</span>
                <span className="text-white font-mono">$0.009</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">UK (+44)</span>
                <span className="text-white font-mono">$0.046</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Germany (+49)</span>
                <span className="text-white font-mono">$0.063</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">India (+91)</span>
                <span className="text-white font-mono">$0.029</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Other countries</span>
                <span className="font-mono">Varies</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">* All prices include 15% service margin. Prices are per SMS segment.</p>
      </div>

      {/* Language Selector */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Language</h3>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLang(lang.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                selectedLang === lang.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#16181b] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{lang.icon}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <div className="mb-10">
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
            <button 
              onClick={() => navigator.clipboard.writeText(codeExamples[selectedLang])}
              className="text-gray-500 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{codeExamples[selectedLang]}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Query Parameters</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Parameter</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Required</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">country_code</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Filter by country code (e.g., 233, 1, 44)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">phone</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Get pricing for a specific phone number</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">region</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Filter by region: africa, europe, asia, north_america</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response Codes</h3>
        <div className="flex flex-wrap items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
          <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-mono border border-green-500/20">200</span>
          <span className="text-sm text-gray-400">Success</span>
          <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs font-mono border border-red-500/20 ml-4">401</span>
          <span className="text-sm text-gray-400">Unauthorized</span>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-3">Success Response</h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Returns pricing information by country and region.
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-green-400">{`{
  "success": true,
  "data": {
    "pricing": [
      {
        "country_code": "233",
        "country_name": "Ghana",
        "price_per_message": 0.029,
        "currency": "USD",
        "region": "africa"
      },
      {
        "country_code": "234",
        "country_name": "Nigeria",
        "price_per_message": 0.029,
        "currency": "USD",
        "region": "africa"
      }
    ],
    "notes": {
      "segments": "SMS longer than 160 characters are split into multiple segments",
      "unicode": "Messages with non-ASCII characters use 70 chars per segment",
      "pricing_basis": "Price is per segment, not per message"
    }
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Full Pricing Table</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Country</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Code</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price/SMS</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Region</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇬🇭 Ghana</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+233</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.029</td>
                <td className="py-3 px-4 text-xs text-gray-500">Africa</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇳🇬 Nigeria</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+234</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.029</td>
                <td className="py-3 px-4 text-xs text-gray-500">Africa</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇰🇪 Kenya</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+254</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.029</td>
                <td className="py-3 px-4 text-xs text-gray-500">Africa</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇿🇦 South Africa</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+27</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.029</td>
                <td className="py-3 px-4 text-xs text-gray-500">Africa</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇺🇸 United States</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+1</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.009</td>
                <td className="py-3 px-4 text-xs text-gray-500">N. America</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇬🇧 United Kingdom</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+44</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.046</td>
                <td className="py-3 px-4 text-xs text-gray-500">Europe</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇩🇪 Germany</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+49</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.063</td>
                <td className="py-3 px-4 text-xs text-gray-500">Europe</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-white">🇮🇳 India</td>
                <td className="py-3 px-4 text-sm text-gray-400 font-mono">+91</td>
                <td className="py-3 px-4 text-sm text-green-400 font-mono">$0.029</td>
                <td className="py-3 px-4 text-xs text-gray-500">Asia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/api/sms" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Send SMS
        </Link>
        <Link href="/docs/quickstart" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          Quick Start
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
