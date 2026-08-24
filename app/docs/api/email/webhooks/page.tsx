'use client';

import Link from 'next/link';
import { useState } from 'react';

type Language = 'curl' | 'nodejs' | 'python' | 'php';

const codeExamples: Record<Language, string> = {
  curl: `# Register a webhook endpoint
curl -X POST \\
  https://api.sendcomms.com/api/v1/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-server.com/webhooks/email",
    "events": [
      "email.sent",
      "email.delivered",
      "email.bounced",
      "email.complained",
      "email.opened",
      "email.clicked",
      "email.delivery_delayed",
      "email.failed"
    ],
    "secret": "your_webhook_secret"
  }'`,
  nodejs: `import axios from 'axios';

// Register a webhook endpoint
const response = await axios.post(
  'https://api.sendcomms.com/api/v1/webhooks',
  {
    url: 'https://your-server.com/webhooks/email',
    events: [
      'email.sent',
      'email.delivered',
      'email.bounced',
      'email.complained',
      'email.opened',
      'email.clicked',
      'email.delivery_delayed',
      'email.failed'
    ],
    secret: 'your_webhook_secret'
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

# Register a webhook endpoint
response = requests.post(
    'https://api.sendcomms.com/api/v1/webhooks',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'url': 'https://your-server.com/webhooks/email',
        'events': [
            'email.sent',
            'email.delivered',
            'email.bounced',
            'email.complained',
            'email.opened',
            'email.clicked',
            'email.delivery_delayed',
            'email.failed'
        ],
        'secret': 'your_webhook_secret'
    }
)

print(response.json())`,
  php: `<?php

$curl = curl_init();

$data = [
    'url' => 'https://your-server.com/webhooks/email',
    'events' => [
        'email.sent',
        'email.delivered',
        'email.bounced',
        'email.complained',
        'email.opened',
        'email.clicked',
        'email.delivery_delayed',
        'email.failed'
    ],
    'secret' => 'your_webhook_secret'
];

curl_setopt_array($curl, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/webhooks',
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

export default function WebhooksDocsPage() {
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
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Webhooks</h1>

      <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-8">
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Receive real-time notifications about email events via webhooks. Track sends, deliveries, bounces,
          complaints, opens, clicks and more. Register an HTTPS endpoint, subscribe to the events you care about,
          and verify the signature on every request.
        </p>
      </div>

      {/* Webhook Events */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Available Events</h3>
        
        {/* API Note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-blue-400">💡</span>
            <div>
              <p className="text-sm text-blue-300 font-medium">Secret is Auto-Generated</p>
              <p className="text-xs text-gray-400 mt-1">If you don&apos;t provide a <code className="text-blue-400 bg-blue-500/10 px-1 rounded">secret</code>, we&apos;ll generate one for you. Save it - it&apos;s only shown once!</p>
            </div>
          </div>
        </div>
        
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Event</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.sent</td>
                <td className="py-3 px-4 text-sm text-gray-400">Message accepted by SendComms and handed to our mail infrastructure</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.delivered</td>
                <td className="py-3 px-4 text-sm text-gray-400">Recipient&apos;s mail server accepted the message</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.bounced</td>
                <td className="py-3 px-4 text-sm text-gray-400">Message was rejected by the recipient&apos;s mail server (hard or soft bounce)</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.complained</td>
                <td className="py-3 px-4 text-sm text-gray-400">Recipient marked the message as spam</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.opened</td>
                <td className="py-3 px-4 text-sm text-gray-400">Tracking pixel loaded — requires open tracking on the sending domain</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.clicked</td>
                <td className="py-3 px-4 text-sm text-gray-400">A tracked link was clicked — requires click tracking on the sending domain</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.delivery_delayed</td>
                <td className="py-3 px-4 text-sm text-gray-400">Delivery was temporarily deferred and is still being retried</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.failed</td>
                <td className="py-3 px-4 text-sm text-gray-400">The send itself failed — the message never left our mail infrastructure</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.scheduled</td>
                <td className="py-3 px-4 text-sm text-gray-400">A message was accepted for delivery at a future time</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.suppressed</td>
                <td className="py-3 px-4 text-sm text-gray-400">Send was blocked because the address is on your suppression list</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">email.received</td>
                <td className="py-3 px-4 text-sm text-gray-400">An inbound message arrived on one of your domains</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          The same endpoint also accepts SMS, airtime and data events
          (<code className="text-blue-400 bg-blue-500/10 px-1 rounded">sms.sent</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">sms.delivered</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">sms.failed</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">airtime.success</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">airtime.failed</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data.purchased</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data.delivered</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data.success</code>,{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data.failed</code>), plus the wildcard{' '}
          <code className="text-blue-400 bg-blue-500/10 px-1 rounded">&quot;*&quot;</code> which subscribes to everything.
          Any name outside this list is rejected with <code className="text-blue-400 bg-blue-500/10 px-1 rounded">400 INVALID_EVENTS</code>.
        </p>
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
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REGISTER WEBHOOK</span>
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

      {/* Registration Parameters */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Registration Parameters</h3>
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
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">url</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Your endpoint. Must be <code className="text-blue-400 bg-blue-500/10 px-1 rounded">https://</code> — anything else returns 400 INVALID_URL</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">events</td>
                <td className="py-3 px-4 text-xs text-gray-400">string[]</td>
                <td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">Required</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Non-empty list of event names from the table above, or <code className="text-blue-400 bg-blue-500/10 px-1 rounded">[&quot;*&quot;]</code> for all of them. Unknown names return 400 INVALID_EVENTS</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">secret</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Signing secret. If you omit it we generate a <code className="text-blue-400 bg-blue-500/10 px-1 rounded">whsec_</code> value and return it once</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          You have one webhook endpoint per account — registering again updates the existing URL, event list and
          secret rather than adding a second endpoint.
        </p>
      </div>

      {/* Webhook Payload */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Webhook Payload</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <p className="text-sm text-gray-400 mb-4">
            When an event occurs we POST a JSON body to your endpoint. Every payload has the same envelope —{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">event</code>,{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data</code>,{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">transaction_id</code> and{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">timestamp</code> — with the fields inside{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data</code> varying by event.
          </p>

          <p className="text-sm text-white font-medium mb-2">Delivery events (email.delivered, email.bounced)</p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5 mb-6">
            <code className="text-gray-300">{`{
  "event": "email.delivered",
  "data": {
    "transaction_id": "email_mjgc0ejr_3ca715bfb7a0",
    "type": "email",
    "status": "delivered",
    "email_id": "msg_8f21c0d4a97b",
    "to": ["recipient@example.com"],
    "subject": "Welcome to our platform!",
    "detail": "",
    "timestamp": "2026-08-23T10:30:04.512000+00:00"
  },
  "transaction_id": "email_mjgc0ejr_3ca715bfb7a0",
  "timestamp": "2026-08-23T10:30:04.702000+00:00"
}`}</code>
          </pre>

          <p className="text-sm text-white font-medium mb-2">Send events (email.sent, email.failed)</p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-gray-300">{`{
  "event": "email.sent",
  "data": {
    "transaction_id": "email_mjgc0ejr_3ca715bfb7a0",
    "type": "email",
    "status": "sent",
    "to": ["recipient@example.com"],
    "subject": "Welcome to our platform!",
    "email_id": "msg_8f21c0d4a97b",
    "from": "Your App <hello@yourdomain.com>",
    "cost": 0.01,
    "error": null
  },
  "transaction_id": "email_mjgc0ejr_3ca715bfb7a0",
  "timestamp": "2026-08-23T10:30:00.318000+00:00"
}`}</code>
          </pre>

          <ul className="text-sm text-gray-400 leading-relaxed mt-4 space-y-2 list-disc list-inside">
            <li><code className="text-blue-400 bg-blue-500/10 px-1 rounded">transaction_id</code> appears both in the envelope and inside <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data</code>, and matches the value returned by the send endpoint.</li>
            <li><code className="text-blue-400 bg-blue-500/10 px-1 rounded">email_id</code> is the per-message id, so it also matches an entry in a batch <code className="text-blue-400 bg-blue-500/10 px-1 rounded">results[]</code>.</li>
            <li>On <code className="text-blue-400 bg-blue-500/10 px-1 rounded">email.bounced</code>, <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data.status</code> is <code className="text-blue-400 bg-blue-500/10 px-1 rounded">&quot;failed&quot;</code> and <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data.detail</code> carries the reason reported by the receiving server. Always branch on <code className="text-blue-400 bg-blue-500/10 px-1 rounded">event</code>, not on <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data.status</code>.</li>
            <li>Treat <code className="text-blue-400 bg-blue-500/10 px-1 rounded">data</code> as open-ended — we add fields over time, so ignore anything you don&apos;t recognise.</li>
          </ul>
        </div>
      </div>

      {/* Request Headers */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Request Headers</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Header</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">X-SendComms-Signature</td>
                <td className="py-3 px-4 text-sm text-gray-400"><code className="text-gray-300">sha256=</code> followed by the hex HMAC-SHA256 of the raw request body, keyed with your webhook secret. Only sent when a secret is configured</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">Content-Type</td>
                <td className="py-3 px-4 text-sm text-gray-400"><code className="text-gray-300">application/json</code></td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">User-Agent</td>
                <td className="py-3 px-4 text-sm text-gray-400"><code className="text-gray-300">SendComms-Webhook/1.0</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Format */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Registration Response</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <p className="text-sm text-gray-400 mb-4">
            When you register a webhook, you&apos;ll receive this response. <span className="text-yellow-400 font-medium">Save the secret - it&apos;s only shown once!</span>
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-gray-300">{`{
  "success": true,
  "data": {
    "id": "e406c83c-50bc-4783-b5fc-4beafe6bf5eb",
    "url": "https://your-server.com/webhooks/email",
    "events": [
      "email.sent",
      "email.delivered",
      "email.bounced",
      "email.complained",
      "email.opened",
      "email.clicked",
      "email.delivery_delayed",
      "email.failed"
    ],
    "secret": "whsec_21be983f359112f9e07658ed2bddcee3...",
    "active": true,
    "created_at": "2026-08-23T23:25:12.006000+00:00"
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Verifying Webhooks */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Verifying Webhooks</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <p className="text-sm text-gray-400 mb-4">
            Every request is signed with your webhook secret. The signature is{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">sha256=</code> followed by the hex-encoded
            HMAC-SHA256 of the <strong>raw request body</strong>, sent in the{' '}
            <code className="text-blue-400 bg-blue-500/10 px-1 rounded">X-SendComms-Signature</code> header. Compute it
            over the bytes you received — re-serialising the parsed JSON will not reproduce the same digest.
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5 mb-6">
            <code className="text-gray-300">{`// Node.js / Express — note express.raw(), not express.json()
const crypto = require('crypto');

app.post('/webhooks/sendcomms',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const secret = process.env.SENDCOMMS_WEBHOOK_SECRET; // whsec_...
    const received = req.headers['x-sendcomms-signature'] || '';

    const expected = 'sha256=' +
      crypto.createHmac('sha256', secret)
        .update(req.body)          // the raw Buffer, unmodified
        .digest('hex');

    const a = Buffer.from(received);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data, transaction_id } = JSON.parse(req.body.toString());
    console.log(\`\${event} for \${transaction_id}\`);

    // Acknowledge first, process asynchronously
    res.status(200).json({ received: true });
  }
);`}</code>
          </pre>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-gray-300">{`# Python / Flask
import hmac, hashlib, os
from flask import request, jsonify

@app.post('/webhooks/sendcomms')
def sendcomms_webhook():
    secret = os.environ['SENDCOMMS_WEBHOOK_SECRET'].encode()
    raw = request.get_data()                       # raw bytes, unmodified
    expected = 'sha256=' + hmac.new(secret, raw, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(expected, request.headers.get('X-SendComms-Signature', '')):
        return jsonify(error='Invalid signature'), 401

    payload = request.get_json()
    print(payload['event'], payload['transaction_id'])
    return jsonify(received=True), 200`}</code>
          </pre>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Best Practices</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-sm text-white font-medium">Respond quickly</p>
              <p className="text-xs text-gray-400">We wait up to 10 seconds for a response. Acknowledge with a 2xx immediately and process the event asynchronously.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-sm text-white font-medium">Handle duplicates</p>
              <p className="text-xs text-gray-400">One transaction produces several events, so deduplicate on the pair of transaction_id and event rather than transaction_id alone.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-sm text-white font-medium">Use HTTPS</p>
              <p className="text-xs text-gray-400">Webhook URLs must use HTTPS — an http:// URL is rejected with 400 INVALID_URL.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-sm text-white font-medium">Verify signatures</p>
              <p className="text-xs text-gray-400">Always verify X-SendComms-Signature against the raw body with a constant-time comparison to prevent spoofing.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-sm text-white font-medium">Tolerate unknown events</p>
              <p className="text-xs text-gray-400">Ignore event names and data fields you don&apos;t handle yet instead of erroring, so new events don&apos;t break your endpoint.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Managing Webhooks */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Managing Webhooks</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6 space-y-6">
          {/* List Webhooks */}
          <div>
            <p className="text-sm text-white font-medium mb-2">List Your Webhooks</p>
            <pre className="bg-[#0b0c0e] p-3 rounded text-xs overflow-x-auto border border-white/5">
              <code className="text-gray-300">{`curl -X GET https://api.sendcomms.com/api/v1/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
            </pre>
          </div>
          
          {/* Delete Webhook */}
          <div>
            <p className="text-sm text-white font-medium mb-2">Delete a Webhook</p>
            <pre className="bg-[#0b0c0e] p-3 rounded text-xs overflow-x-auto border border-white/5">
              <code className="text-gray-300">{`curl -X DELETE "https://api.sendcomms.com/api/v1/webhooks?id=WEBHOOK_ID" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/api/email/batch" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Batch Send
        </Link>
        <Link href="/docs/api/sms" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          SMS API
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
