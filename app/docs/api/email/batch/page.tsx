'use client';

import Link from 'next/link';
import { useState } from 'react';

type Language = 'curl' | 'nodejs' | 'python' | 'php';

const codeExamples: Record<Language, string> = {
  curl: `curl -X POST \\
  https://api.sendcomms.com/api/v1/email/batch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "emails": [
      {
        "to": "user1@example.com",
        "subject": "Welcome!",
        "html": "<h1>Welcome User 1!</h1>",
        "from": "Your App <hello@yourdomain.com>"
      },
      {
        "to": "user2@example.com",
        "subject": "Your receipt",
        "text": "Thanks for your order.",
        "from": "Billing <billing@yourdomain.com>",
        "replyTo": "support@yourdomain.com"
      },
      {
        "to": ["user3@example.com", "user4@example.com"],
        "subject": "Team Update",
        "html": "<p>Important team update...</p>",
        "tags": [{ "name": "campaign", "value": "august" }]
      }
    ]
  }'`,
  nodejs: `import axios from 'axios';

const response = await axios.post(
  'https://api.sendcomms.com/api/v1/email/batch',
  {
    emails: [
      {
        to: 'user1@example.com',
        subject: 'Welcome!',
        html: '<h1>Welcome User 1!</h1>',
        from: 'Your App <hello@yourdomain.com>'
      },
      {
        to: 'user2@example.com',
        subject: 'Your receipt',
        text: 'Thanks for your order.',
        from: 'Billing <billing@yourdomain.com>',
        replyTo: 'support@yourdomain.com'
      },
      {
        to: ['user3@example.com', 'user4@example.com'],
        subject: 'Team Update',
        html: '<p>Important team update...</p>',
        tags: [{ name: 'campaign', value: 'august' }]
      }
    ]
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data);`,
  python: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/email/batch',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'emails': [
            {
                'to': 'user1@example.com',
                'subject': 'Welcome!',
                'html': '<h1>Welcome User 1!</h1>',
                'from': 'Your App <hello@yourdomain.com>'
            },
            {
                'to': 'user2@example.com',
                'subject': 'Your receipt',
                'text': 'Thanks for your order.',
                'from': 'Billing <billing@yourdomain.com>',
                'replyTo': 'support@yourdomain.com'
            },
            {
                'to': ['user3@example.com', 'user4@example.com'],
                'subject': 'Team Update',
                'html': '<p>Important team update...</p>',
                'tags': [{'name': 'campaign', 'value': 'august'}]
            }
        ]
    }
)

print(response.json())`,
  php: `<?php

$curl = curl_init();

$data = [
    'emails' => [
        [
            'to' => 'user1@example.com',
            'subject' => 'Welcome!',
            'html' => '<h1>Welcome User 1!</h1>',
            'from' => 'Your App <hello@yourdomain.com>'
        ],
        [
            'to' => 'user2@example.com',
            'subject' => 'Your receipt',
            'text' => 'Thanks for your order.',
            'from' => 'Billing <billing@yourdomain.com>',
            'replyTo' => 'support@yourdomain.com'
        ],
        [
            'to' => ['user3@example.com', 'user4@example.com'],
            'subject' => 'Team Update',
            'html' => '<p>Important team update...</p>',
            'tags' => [['name' => 'campaign', 'value' => 'august']]
        ]
    ]
];

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/email/batch',
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

echo $response;`
};

export default function BatchDocsPage() {
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
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Batch Send</h1>
      
      <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-6">
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
        <span className="text-gray-300">/api/v1/email/batch</span>
      </div>

      <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-8">
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Send up to 100 separate emails in a single API request. Every item in the batch is its own message with its
          own sender, recipients, subject and body — so this is not a mailing list blast, it is 100 individually
          addressed sends. Perfect for newsletters, campaign fan-out and bulk notifications.
        </p>
      </div>

      {/* Warning */}
      <div className="bg-[#1a1410] border border-orange-500/20 rounded-lg py-3 px-4 mb-6 flex items-start gap-2 text-sm text-orange-400">
        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>
          Maximum <strong>100 emails per request</strong> — over that the call is rejected with{' '}
          <code className="bg-orange-500/10 px-1 rounded">400 BATCH_LIMIT_EXCEEDED</code>. Each individual message in the
          batch is still capped at <strong>50 recipients</strong>, the same per-message limit that applies on{' '}
          <Link href="/docs/api/email" className="underline hover:text-orange-300">POST /email/send</Link>.
        </span>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-blue-400">💡</span>
          <div>
            <p className="text-sm text-blue-300 font-medium">Batch items support a subset of the send fields</p>
            <p className="text-xs text-gray-400 mt-1">
              Each item accepts <code className="text-blue-400 bg-blue-500/10 px-1 rounded">to</code>,{' '}
              <code className="text-blue-400 bg-blue-500/10 px-1 rounded">subject</code>,{' '}
              <code className="text-blue-400 bg-blue-500/10 px-1 rounded">html</code>,{' '}
              <code className="text-blue-400 bg-blue-500/10 px-1 rounded">text</code>,{' '}
              <code className="text-blue-400 bg-blue-500/10 px-1 rounded">from</code>,{' '}
              <code className="text-blue-400 bg-blue-500/10 px-1 rounded">replyTo</code> and{' '}
              <code className="text-blue-400 bg-blue-500/10 px-1 rounded">tags</code>. <code className="text-blue-400 bg-blue-500/10 px-1 rounded">cc</code>,{' '}
              <code className="text-blue-400 bg-blue-500/10 px-1 rounded">bcc</code>, attachments, custom headers and
              idempotency keys are only honoured on{' '}
              <Link href="/docs/api/email" className="underline hover:text-blue-300">POST /email/send</Link> — send those
              messages one at a time.
            </p>
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

      {/* Request Body */}
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
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails</td>
                <td className="py-3 px-4 text-xs text-gray-400">array</td>
                <td className="py-3 px-4">
                  <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">Non-empty array of email objects, maximum 100 per request</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails[].to</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | string[]</td>
                <td className="py-3 px-4">
                  <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">Recipient email(s) for this message, up to 50</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails[].subject</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4">
                  <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">Email subject line</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails[].html</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs border border-yellow-500/20">Conditional</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">HTML content (required if no text)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails[].text</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs border border-yellow-500/20">Conditional</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">Plain text content (required if no html)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails[].from</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">Sender for this message. Must be on a domain verified for your account, otherwise the whole batch is rejected with 400 UNVERIFIED_SENDER_DOMAIN. Display names are supported: &quot;Acme &lt;hello@acme.com&gt;&quot;. If omitted, your primary verified domain is used</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails[].replyTo</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">Reply-To address for this message</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">emails[].tags</td>
                <td className="py-3 px-4 text-xs text-gray-400">object[]</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-400">Per-message labels, each <code className="text-blue-400 bg-blue-500/10 px-1 rounded">{'{ name, value }'}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Codes */}
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
          <span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs font-mono border border-yellow-500/20 ml-4">429</span>
          <span className="text-sm text-gray-400">Rate limit exceeded</span>
        </div>
      </div>

      {/* Common Errors */}
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
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">BATCH_LIMIT_EXCEEDED</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">More than 100 emails in one request</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">INVALID_INPUT</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400"><code className="text-blue-400 bg-blue-500/10 px-1 rounded">emails</code> is missing, not an array, or empty</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">MISSING_FIELD</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">An item is missing <code className="text-blue-400 bg-blue-500/10 px-1 rounded">to</code> or <code className="text-blue-400 bg-blue-500/10 px-1 rounded">subject</code>. The message names the offending index</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">MISSING_CONTENT</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">An item has neither <code className="text-blue-400 bg-blue-500/10 px-1 rounded">html</code> nor <code className="text-blue-400 bg-blue-500/10 px-1 rounded">text</code></td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">UNVERIFIED_SENDER_DOMAIN</td>
                <td className="py-3 px-4 text-xs text-gray-400">400</td>
                <td className="py-3 px-4 text-sm text-gray-400">A <code className="text-blue-400 bg-blue-500/10 px-1 rounded">from</code> address is not on a domain verified for your account</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Validation runs across the whole array before anything is sent, so a single bad item rejects the entire
          request and nothing is charged.
        </p>
      </div>

      {/* Response */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-3">Success Response</h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">results</code> comes back in the same order you
            submitted, each entry carrying its original <code className="text-blue-400 bg-blue-500/10 px-1 rounded">index</code>{' '}
            and the <code className="text-blue-400 bg-blue-500/10 px-1 rounded">email_id</code> you can match against{' '}
            <Link href="/docs/api/email/webhooks" className="text-blue-400 hover:text-blue-300 underline">webhook events</Link>.
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-green-400">{`{
  "success": true,
  "data": {
    "batch_id": "batch_mjgc0ejr_3ca715bfb7a0",
    "status": "sent",
    "total_emails": 3,
    "total_recipients": 4,
    "from": "Your App <hello@yourdomain.com>",
    "price": { "amount": 0.03, "currency": "USD" },
    "results": [
      {
        "index": 0,
        "email_id": "msg_8f21c0d4a97b",
        "to": "user1@example.com",
        "subject": "Welcome!"
      },
      {
        "index": 1,
        "email_id": "msg_1b7ee3390c42",
        "to": "user2@example.com",
        "subject": "Your receipt"
      },
      {
        "index": 2,
        "email_id": "msg_44de90ab1f05",
        "to": ["user3@example.com", "user4@example.com"],
        "subject": "Team Update"
      }
    ],
    "created_at": "2026-08-23T10:30:00.000000+00:00"
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Pricing section commented out
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Pricing</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold text-white">$0.001</div>
              <div className="text-sm text-gray-400">per recipient</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$0.01</div>
              <div className="text-sm text-gray-400">minimum per email</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100</div>
              <div className="text-sm text-gray-400">max emails per batch</div>
            </div>
          </div>
        </div>
      </div>
      */}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/api/email" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Send Email
        </Link>
        <Link href="/docs/api/email/webhooks" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          Webhooks
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
