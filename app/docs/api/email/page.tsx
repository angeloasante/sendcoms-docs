'use client';

import Link from 'next/link';
import { useState } from 'react';

type Language = 'curl' | 'nodejs' | 'python' | 'php';

const codeExamples: Record<Language, string> = {
  curl: `curl -X POST \\
  https://api.sendcomms.com/api/v1/email/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "cc": ["manager@example.com"],
    "subject": "Welcome to our platform!",
    "html": "<h1>Welcome!</h1><p>Thanks for signing up.</p>",
    "from": "Your App <hello@yourdomain.com>",
    "replyTo": "support@yourdomain.com",
    "headers": {
      "List-Unsubscribe": "<https://yourdomain.com/unsubscribe?u=12345>"
    },
    "tags": [{ "name": "campaign", "value": "welcome" }],
    "idempotency_key": "welcome-user-12345"
  }'`,
  nodejs: `import axios from 'axios';

const response = await axios.post(
  'https://api.sendcomms.com/api/v1/email/send',
  {
    to: 'user@example.com',
    cc: ['manager@example.com'],
    subject: 'Welcome to our platform!',
    html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
    from: 'Your App <hello@yourdomain.com>',
    replyTo: 'support@yourdomain.com',
    headers: {
      'List-Unsubscribe': '<https://yourdomain.com/unsubscribe?u=12345>'
    },
    tags: [{ name: 'campaign', value: 'welcome' }],
    // Safe to retry: the same key returns the original result
    idempotency_key: 'welcome-user-12345'
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);

// Using fetch
const res = await fetch('https://api.sendcomms.com/api/v1/email/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: 'Welcome to our platform!',
    html: '<h1>Welcome!</h1><p>Thanks for signing up.</p>'
  })
});`,
  python: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/email/send',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'to': 'user@example.com',
        'cc': ['manager@example.com'],
        'subject': 'Welcome to our platform!',
        'html': '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
        'from': 'Your App <hello@yourdomain.com>',
        'replyTo': 'support@yourdomain.com',
        'headers': {
            'List-Unsubscribe': '<https://yourdomain.com/unsubscribe?u=12345>'
        },
        'tags': [{'name': 'campaign', 'value': 'welcome'}],
        # Safe to retry: the same key returns the original result
        'idempotency_key': 'welcome-user-12345'
    }
)

print(response.json())

# Using httpx (async)
import httpx

async with httpx.AsyncClient() as client:
    response = await client.post(
        'https://api.sendcomms.com/api/v1/email/send',
        headers={'Authorization': 'Bearer YOUR_API_KEY'},
        json={
            'to': 'user@example.com',
            'subject': 'Welcome!',
            'html': '<h1>Welcome!</h1>'
        }
    )`,
  php: `<?php

$curl = curl_init();

$data = [
    'to' => 'user@example.com',
    'cc' => ['manager@example.com'],
    'subject' => 'Welcome to our platform!',
    'html' => '<h1>Welcome!</h1><p>Thanks for signing up.</p>',
    'from' => 'Your App <hello@yourdomain.com>',
    'replyTo' => 'support@yourdomain.com',
    'headers' => [
        'List-Unsubscribe' => '<https://yourdomain.com/unsubscribe?u=12345>'
    ],
    'tags' => [['name' => 'campaign', 'value' => 'welcome']],
    // Safe to retry: the same key returns the original result
    'idempotency_key' => 'welcome-user-12345'
];

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/email/send',
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
print_r($result);`
};

export default function SendEmailDocsPage() {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  const languages: { id: Language; name: string; icon: string }[] = [
    { id: 'curl', name: 'cURL', icon: '🌐' },
    { id: 'nodejs', name: 'Node.js', icon: '📦' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'php', name: 'PHP', icon: '🐘' },
  ];

  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">Email API</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Send Email</h1>
      
      <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-6">
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
        <span className="text-gray-300">/api/v1/email/send</span>
      </div>

      <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-8">
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Send transactional emails to one or more recipients. Supports HTML and plain text content, CC and BCC,
          attachments, tags, custom headers and idempotency keys. Perfect for welcome emails, password resets,
          notifications, and more.
        </p>
      </div>

      <div className="bg-[#1a1410] border border-orange-500/20 rounded-lg py-3 px-4 mb-6 flex items-center gap-2 text-sm text-orange-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Requires API key authentication. Include your key in the Authorization header.
      </div>

      <div className="bg-[#1a1410] border border-orange-500/20 rounded-lg py-3 px-4 mb-6 flex items-start gap-2 text-sm text-orange-400">
        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>
          Maximum <strong>50 recipients per message</strong>, counted across <code className="bg-orange-500/10 px-1 rounded">to</code> +{' '}
          <code className="bg-orange-500/10 px-1 rounded">cc</code> + <code className="bg-orange-500/10 px-1 rounded">bcc</code> combined.
          Going over returns <code className="bg-orange-500/10 px-1 rounded">400 TOO_MANY_RECIPIENTS</code> — use the{' '}
          <Link href="/docs/api/email/batch" className="underline hover:text-orange-300">batch endpoint</Link> for larger sends.
        </span>
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
                  ? 'bg-blue-600 text-white' 
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
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">to</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | string[]</td>
                <td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Recipient email address(es). Counts towards the 50-recipient cap shared with cc and bcc</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">subject</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Email subject line</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">html</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs border border-yellow-500/20">Conditional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">HTML content (required if no text)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">text</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs border border-yellow-500/20">Conditional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Plain text (required if no html)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">from</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Sender address. Must be on a domain verified for your account, otherwise the request fails with 400 UNVERIFIED_SENDER_DOMAIN. Display names are supported: &quot;Acme &lt;hello@acme.com&gt;&quot;. If omitted, your primary verified domain is used</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">replyTo</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Reply-To address. Not restricted to your verified domains</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">cc</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | string[]</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">CC recipients. Counts towards the 50-recipient cap</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">bcc</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | string[]</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">BCC recipients — delivered on the envelope only, never shown in the message headers. Counts towards the 50-recipient cap</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">attachments</td>
                <td className="py-3 px-4 text-xs text-gray-400">object[]</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Files to attach, each <code className="text-blue-400 bg-blue-500/10 px-1 rounded">{'{ filename, content }'}</code> with base64-encoded content. Up to 20MB total per message</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">tags</td>
                <td className="py-3 px-4 text-xs text-gray-400">object[]</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Labels for your own reporting, each <code className="text-blue-400 bg-blue-500/10 px-1 rounded">{'{ name, value }'}</code>. Returned on the message record and searchable in your dashboard</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">headers</td>
                <td className="py-3 px-4 text-xs text-gray-400">object</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Custom message headers as string key/value pairs. Commonly used for <code className="text-blue-400 bg-blue-500/10 px-1 rounded">List-Unsubscribe</code> on bulk sends</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">idempotency_key</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Your own unique key for safe retries. Retrying with the same key returns the original result instead of sending again</td>
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
          <span className="text-sm text-gray-400">No balance</span>
          <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs font-mono border border-yellow-500/20 ml-4">409</span>
          <span className="text-sm text-gray-400">Idempotency key still in flight</span>
          <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs font-mono border border-yellow-500/20 ml-4">429</span>
          <span className="text-sm text-gray-400">Rate limit exceeded</span>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Common Errors</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Code</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">When it happens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">TOO_MANY_RECIPIENTS</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">More than 50 recipients across to + cc + bcc</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">UNVERIFIED_SENDER_DOMAIN</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">The <code className="text-blue-400 bg-blue-500/10 px-1 rounded">from</code> address is not on a domain verified for your account</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">MISSING_CONTENT</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">Neither <code className="text-blue-400 bg-blue-500/10 px-1 rounded">html</code> nor <code className="text-blue-400 bg-blue-500/10 px-1 rounded">text</code> was supplied</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">INVALID_EMAIL</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">A to, cc or bcc address is not a valid email address</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">REQUEST_IN_PROGRESS</td>
                <td className="py-3 px-4 text-xs text-gray-400">409</td>
                <td className="py-3 px-4 text-sm text-gray-400">An earlier request with the same idempotency_key is still being processed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Sender Verification</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            The <code className="text-blue-400 bg-blue-500/10 px-1 rounded">from</code> address must use a domain
            you have verified for your account. We never silently substitute a different sender, so an unverified
            domain is rejected outright:
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-gray-300">{`{
  "success": false,
  "error": {
    "code": "UNVERIFIED_SENDER_DOMAIN",
    "message": "The \\"from\\" domain \\"acme.com\\" is not verified for your account. Verify it under Domains, or omit \\"from\\" to use your default sender.",
    "details": {
      "provided_from": "Acme <hello@acme.com>",
      "provided_domain": "acme.com"
    }
  }
}`}</code>
          </pre>
          <ul className="text-sm text-gray-400 leading-relaxed mt-4 space-y-2 list-disc list-inside">
            <li>Display names are supported on every address field — <code className="text-blue-400 bg-blue-500/10 px-1 rounded">Acme &lt;hello@acme.com&gt;</code>.</li>
            <li>Omit <code className="text-blue-400 bg-blue-500/10 px-1 rounded">from</code> to send from your primary verified domain.</li>
            <li>Add and verify domains from the <Link href="/docs/api/email/domains" className="text-blue-400 hover:text-blue-300 underline">Domains</Link> endpoint.</li>
          </ul>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Idempotency</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Pass your own <code className="text-blue-400 bg-blue-500/10 px-1 rounded">idempotency_key</code> to make
            retries safe. If a request with that key already succeeded, we return the original result instead of
            sending a second email, and the replay is marked with an{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">X-Idempotent-Replay: true</code> response header.
          </p>
          <ul className="text-sm text-gray-400 leading-relaxed space-y-2 list-disc list-inside">
            <li>Keys are scoped to your account and cached for <strong>24 hours</strong>.</li>
            <li>While the first request is still in flight, a retry with the same key returns <code className="text-blue-400 bg-blue-500/10 px-1 rounded">409 REQUEST_IN_PROGRESS</code> — wait and retry.</li>
            <li>If the send fails, the key is released so you can retry it cleanly.</li>
            <li>Use a value that is unique to the action, e.g. <code className="text-blue-400 bg-blue-500/10 px-1 rounded">welcome-user-12345</code>.</li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-3">Success Response</h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            When an email is successfully queued for delivery, you&apos;ll receive a response containing the transaction ID and email details.
            Keep <code className="text-blue-400 bg-blue-500/10 px-1 rounded">transaction_id</code> and{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">email_id</code> — both are echoed back on every{' '}
            <Link href="/docs/api/email/webhooks" className="text-blue-400 hover:text-blue-300 underline">webhook event</Link> for this message.
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-green-400">{`{
  "success": true,
  "data": {
    "transaction_id": "email_mjgc0ejr_3ca715bfb7a0",
    "email_id": "msg_8f21c0d4a97b",
    "status": "sent",
    "to": ["user@example.com"],
    "from": "Your App <hello@yourdomain.com>",
    "subject": "Welcome to our platform!",
    "recipients": 1,
    "price": { "amount": 0.01, "currency": "USD" },
    "remaining": 499,
    "quota": { "used": 1, "remaining": 499 },
    "created_at": "2026-08-23T10:30:00.000000+00:00"
  }
}`}</code>
          </pre>
        </div>
      </div>

      

      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/authentication" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Authentication
        </Link>
        <Link href="/docs/api/email/batch" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          Batch Email
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
