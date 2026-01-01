'use client';

import Link from 'next/link';
import { useState } from 'react';

type Language = 'curl' | 'nodejs' | 'python' | 'php';

const codeExamples: Record<Language, string> = {
  curl: `# Send SMS using default "Sendcomms" sender
curl -X POST \\
  https://api.sendcomms.com/api/v1/sms/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+233540800994",
    "message": "Your verification code is 123456"
  }'

# Send SMS with custom sender (requires verified number)
curl -X POST \\
  https://api.sendcomms.com/api/v1/sms/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+233540800994",
    "message": "Your order is ready!",
    "from": "+1234567890"
  }'`,
  nodejs: `import axios from 'axios';

// Send SMS using default "Sendcomms" sender
const response = await axios.post(
  'https://api.sendcomms.com/api/v1/sms/send',
  {
    to: '+233540800994',
    message: 'Your verification code is 123456'
    // from is optional - omit to use "Sendcomms" as sender
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);

// Using fetch with custom sender (must be verified in dashboard)
const res = await fetch('https://api.sendcomms.com/api/v1/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+233540800994',
    message: 'Your verification code is 123456',
    from: '+1234567890' // Optional: verified number from your dashboard
  })
});`,
  python: `import requests

# Send SMS using default "Sendcomms" sender
response = requests.post(
    'https://api.sendcomms.com/api/v1/sms/send',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'to': '+233540800994',
        'message': 'Your verification code is 123456'
        # 'from' is optional - omit to use "Sendcomms" as sender
    }
)

print(response.json())

# Send with custom verified sender
import httpx

async with httpx.AsyncClient() as client:
    response = await client.post(
        'https://api.sendcomms.com/api/v1/sms/send',
        headers={'Authorization': 'Bearer YOUR_API_KEY'},
        json={
            'to': '+233540800994',
            'message': 'Your verification code is 123456',
            'from': '+1234567890'  # Must be verified in dashboard
        }
    )`,
  php: `<?php

// Send SMS using default "Sendcomms" sender
$curl = curl_init();

$data = [
    'to' => '+233540800994',
    'message' => 'Your verification code is 123456'
    // 'from' is optional - omit to use "Sendcomms" as sender
];

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/sms/send',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer YOUR_API_KEY',
        'Content-Type: application/json'
    ]
]);

$response = curl_exec($curl);
curl_close($curl);

$result = json_decode($response, true);
print_r($result);

// With custom verified sender
$data['from'] = '+1234567890'; // Must be verified in dashboard`
};

export default function SendSMSDocsPage() {
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
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Send SMS</h1>
      
      <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-6">
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
        <span className="text-gray-300">/api/v1/sms/send</span>
      </div>

      <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-8">
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Send SMS messages globally with intelligent routing. We automatically optimize delivery routes 
          to ensure the best rates and reliability for every destination.
        </p>
      </div>

      {/* Global Coverage Info */}
      <div className="bg-[#1a1015] border border-purple-500/20 rounded-lg py-3 px-4 mb-6 flex items-center gap-2 text-sm text-purple-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span><strong>Global Coverage:</strong> 180+ countries with optimized delivery routes</span>
      </div>

      {/* Default Sender Info */}
      <div className="bg-[#101520] border border-blue-500/20 rounded-lg py-3 px-4 mb-6 flex items-start gap-3 text-sm">
        <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <span className="text-blue-400 font-semibold">Default Sender:</span>
          <span className="text-gray-400 ml-1">
            Messages sent without a <code className="text-blue-400 bg-blue-500/10 px-1 py-0.5 rounded text-xs">from</code> parameter 
            will be delivered from <strong className="text-white">&quot;Sendcomms&quot;</strong>. To use a custom sender ID, 
            add and verify numbers in your <a href="https://console.sendcomms.com/dashboard" className="text-blue-400 hover:underline">dashboard</a>.
          </span>
        </div>
      </div>

      {/* Supported Regions */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Coverage</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#16181b] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🌍</div>
            <div className="text-white font-semibold text-sm">Africa</div>
            <div className="text-xs text-purple-400 font-mono">Optimized</div>
            <div className="text-xs text-gray-500 mt-1">54 countries</div>
          </div>
          <div className="bg-[#16181b] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🇺🇸</div>
            <div className="text-white font-semibold text-sm">Americas</div>
            <div className="text-xs text-blue-400 font-mono">Full Coverage</div>
            <div className="text-xs text-gray-500 mt-1">US, Canada, LATAM</div>
          </div>
          <div className="bg-[#16181b] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🇪🇺</div>
            <div className="text-white font-semibold text-sm">Europe</div>
            <div className="text-xs text-blue-400 font-mono">Full Coverage</div>
            <div className="text-xs text-gray-500 mt-1">45+ countries</div>
          </div>
          <div className="bg-[#16181b] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🌏</div>
            <div className="text-white font-semibold text-sm">Asia Pacific</div>
            <div className="text-xs text-blue-400 font-mono">Full Coverage</div>
            <div className="text-xs text-gray-500 mt-1">35+ countries</div>
          </div>
        </div>
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
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Request Body</h3>
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
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">to</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Phone number in E.164 format (+233...)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">message</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">SMS content (max 1600 chars)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">from</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Sender ID or phone number. If omitted, messages are sent from <strong>&quot;Sendcomms&quot;</strong></td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">reference</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Your reference for tracking</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">region</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Force routing: africa, europe, asia, north_america</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">idempotency_key</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Unique key to prevent duplicates</td>
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
          <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs font-mono border border-red-500/20 ml-4">400</span>
          <span className="text-sm text-gray-400">Bad request</span>
          <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs font-mono border border-red-500/20 ml-4">401</span>
          <span className="text-sm text-gray-400">Unauthorized</span>
          <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs font-mono border border-red-500/20 ml-4">402</span>
          <span className="text-sm text-gray-400">Insufficient balance</span>
          <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs font-mono border border-yellow-500/20 ml-4">429</span>
          <span className="text-sm text-gray-400">Rate limit exceeded</span>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-3">Success Response</h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            When an SMS is successfully sent, you&apos;ll receive details including the provider used, pricing, and destination info.
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-green-400">{`{
  "success": true,
  "data": {
    "transaction_id": "sms_abc123xyz",
    "message_id": "SM1234567890",
    "status": "sent",
    "to": "+233540800994",
    "message_length": 32,
    "segments": 1,
    "country": {
      "code": "233",
      "name": "Ghana"
    },
    "region": "africa",
    "created_at": "2025-12-23T10:00:00.000Z"
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* SMS Segments Info */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">SMS Segments</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <p className="text-sm text-gray-400 mb-4">
            Long messages are split into multiple segments. Each segment is billed separately.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#0b0c0e] rounded-lg p-4">
              <h5 className="font-semibold text-white mb-2">Standard (GSM-7)</h5>
              <div className="text-2xl font-bold text-purple-400">160</div>
              <div className="text-xs text-gray-500">characters per segment</div>
              <div className="text-xs text-gray-400 mt-2">A-Z, 0-9, basic punctuation</div>
            </div>
            <div className="bg-[#0b0c0e] rounded-lg p-4">
              <h5 className="font-semibold text-white mb-2">Unicode (UCS-2)</h5>
              <div className="text-2xl font-bold text-purple-400">70</div>
              <div className="text-xs text-gray-500">characters per segment</div>
              <div className="text-xs text-gray-400 mt-2">Emojis, non-Latin scripts</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/api/data/status" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Data Status
        </Link>
        <Link href="/docs/api/sms/pricing" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          SMS Pricing
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
