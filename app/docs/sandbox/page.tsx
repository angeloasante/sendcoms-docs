'use client';

import { useState } from 'react';
import Link from 'next/link';

type LanguageType = 'curl' | 'nodejs' | 'python';

const languages: { id: LanguageType; name: string }[] = [
  { id: 'curl', name: 'cURL' },
  { id: 'nodejs', name: 'Node.js' },
  { id: 'python', name: 'Python' },
];

const sandboxExamples: Record<LanguageType, string> = {
  curl: `curl -X POST https://api.sendcomms.com/api/v1/sms/send \\
  -H "Authorization: Bearer sc_test_YOUR_TEST_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+233540800994",
    "message": "Hello from sandbox mode!"
  }'`,
  nodejs: `import fetch from 'node-fetch';

const response = await fetch('https://api.sendcomms.com/api/v1/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sc_test_YOUR_TEST_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '+233540800994',
    message: 'Hello from sandbox mode!'
  }),
});

const result = await response.json();

// Check if in sandbox mode
if (result.data._sandbox) {
  console.log('⚠️ Running in sandbox mode');
  console.log(result.data._sandbox.message);
}`,
  python: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/sms/send',
    headers={
        'Authorization': 'Bearer sc_test_YOUR_TEST_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'to': '+233540800994',
        'message': 'Hello from sandbox mode!'
    }
)

result = response.json()

# Check if in sandbox mode
if '_sandbox' in result.get('data', {}):
    print('⚠️ Running in sandbox mode')
    print(result['data']['_sandbox']['message'])`
};

export default function SandboxPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('curl');
  const [copiedCode, setCopiedCode] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <>
      <div className="text-sm font-medium text-amber-500 mb-2">Testing</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Sandbox Mode</h1>
      
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          Test Environment
        </span>
        <span className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
          No Charges
        </span>
      </div>

      <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/5 pb-8">
        Test your integration without sending real messages or incurring charges. 
        Sandbox mode provides realistic mock responses for all API endpoints.
      </p>

      {/* Key Types */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">API Key Types</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#121316] border border-amber-500/20 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <span className="text-xl">🧪</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Test Keys</h3>
                <code className="text-amber-400 text-xs">sc_test_</code>
              </div>
            </div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Mock responses returned
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> No real messages sent
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> No balance deducted
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Full validation applied
              </li>
            </ul>
          </div>
          
          <div className="bg-[#121316] border border-blue-500/20 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Live Keys</h3>
                <code className="text-blue-400 text-xs">sc_live_</code>
              </div>
            </div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> Real messages sent
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> Balance deducted
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> Production metrics
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">→</span> Webhooks triggered
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Test Keys */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Getting Test Keys</h2>
        <div className="bg-[#121316] border border-white/10 rounded-lg p-6">
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-white font-medium">Go to Dashboard → API Keys</p>
                <p className="text-gray-500 text-sm">Navigate to your API keys management page</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-white font-medium">Click &quot;Create API Key&quot;</p>
                <p className="text-gray-500 text-sm">Open the key creation modal</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-white font-medium">Toggle &quot;Sandbox Mode&quot; ON</p>
                <p className="text-gray-500 text-sm">Enable test mode for this key</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">4</span>
              <div>
                <p className="text-white font-medium">Copy your test key</p>
                <p className="text-gray-500 text-sm">Your key will start with <code className="text-amber-400">sc_test_</code></p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Code Example */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Example Request</h2>
        <div className="bg-[#121316] border border-white/10 rounded-lg overflow-hidden">
          {/* Language Tabs */}
          <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-[#0b0c0e]">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  selectedLanguage === lang.id
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {lang.name}
              </button>
            ))}
            <button
              onClick={() => copyCode(sandboxExamples[selectedLanguage])}
              className="ml-auto px-3 py-1.5 text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
            >
              {copiedCode ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          {/* Code */}
          <pre className="p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{sandboxExamples[selectedLanguage]}</code>
          </pre>
        </div>
      </div>

      {/* Example Response */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Sandbox Response</h2>
        <div className="bg-[#121316] border border-white/10 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b border-white/10 bg-[#0b0c0e]">
            <span className="text-xs text-gray-500 px-2">Response</span>
            <span className="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">200 OK</span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{`{
  "success": true,
  "data": {
    "transaction_id": "sms_test_mji01l2o_g8pamf65",
    "message_id": "SMtest1c7pkfx8z",
    "status": "sent",
    "to": "+233540800994",
    "from": "SendComms",
    "message_length": 24,
    "segments": 1,
    "provider": "sandbox",
    "country": {
      "code": "233",
      "name": "Ghana"
    },
    "region": "africa",
    "_sandbox": {
      "mode": "test",
      "message": "This is a test transaction. No real SMS was sent.",
      "note": "Switch to a live API key (sc_live_) to send real messages."
    }
  }
}`}</code>
          </pre>
        </div>
        <p className="text-gray-500 text-xs mt-3">
          Note the <code className="text-amber-400">_sandbox</code> object in the response indicating test mode.
        </p>
      </div>

      {/* Supported Services */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Supported Services</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Endpoint</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sandbox</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e] hover:bg-[#121316] transition-colors">
                <td className="py-3 px-4 text-sm text-white font-medium">SMS</td>
                <td className="py-3 px-4 text-sm text-blue-400 font-mono text-xs">/api/v1/sms/send</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">Supported</span></td>
              </tr>
              <tr className="bg-[#0b0c0e] hover:bg-[#121316] transition-colors">
                <td className="py-3 px-4 text-sm text-white font-medium">Email</td>
                <td className="py-3 px-4 text-sm text-blue-400 font-mono text-xs">/api/v1/email/send</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">Supported</span></td>
              </tr>
              <tr className="bg-[#0b0c0e] hover:bg-[#121316] transition-colors">
                <td className="py-3 px-4 text-sm text-white font-medium">Email Batch</td>
                <td className="py-3 px-4 text-sm text-blue-400 font-mono text-xs">/api/v1/email/batch</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">Supported</span></td>
              </tr>
              <tr className="bg-[#0b0c0e] hover:bg-[#121316] transition-colors">
                <td className="py-3 px-4 text-sm text-white font-medium">Data Bundles</td>
                <td className="py-3 px-4 text-sm text-blue-400 font-mono text-xs">/api/v1/data/purchase</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">Supported</span></td>
              </tr>
              <tr className="bg-[#0b0c0e] hover:bg-[#121316] transition-colors">
                <td className="py-3 px-4 text-sm text-white font-medium">Airtime</td>
                <td className="py-3 px-4 text-sm text-blue-400 font-mono text-xs">/api/v1/airtime/purchase</td>
                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400">Coming Soon</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">What Gets Validated</h2>
        <div className="bg-[#121316] border border-white/10 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-4">
            Sandbox mode performs the same validation as production. If your request works in sandbox, it will work in production.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-semibold text-sm mb-3 flex items-center gap-2">
                <span>✓</span> Validated in Sandbox
              </h4>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li>• API key authentication</li>
                <li>• Request body format</li>
                <li>• Phone number format (E.164)</li>
                <li>• Email address format</li>
                <li>• Required fields</li>
                <li>• Message length limits</li>
                <li>• Network validation</li>
                <li>• Rate limiting</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-semibold text-sm mb-3 flex items-center gap-2">
                <span>✗</span> Skipped in Sandbox
              </h4>
              <ul className="space-y-2 text-gray-400 text-xs">
                <li>• Balance check</li>
                <li>• Actual message delivery</li>
                <li>• Provider API calls</li>
                <li>• Real charges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detecting Sandbox Mode */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Detecting Sandbox Mode</h2>
        <div className="bg-[#121316] border border-white/10 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-4">
            All sandbox responses include a <code className="text-amber-400">_sandbox</code> object. 
            Check for this to confirm you&apos;re in test mode:
          </p>
          <pre className="bg-[#0b0c0e] border border-white/5 rounded p-4 overflow-x-auto text-sm">
            <code className="text-gray-300">{`if (response.data._sandbox) {
  console.log('⚠️ Running in sandbox mode');
  // Handle test mode logic
}`}</code>
          </pre>
        </div>
      </div>

      {/* Switching to Production */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Switching to Production</h2>
        <div className="bg-[#121316] border border-white/10 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-4">
            When you&apos;re ready to go live, simply swap your test key for a live key:
          </p>
          <pre className="bg-[#0b0c0e] border border-white/5 rounded p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`# Development
SENDCOMMS_API_KEY=sc_test_xxx

# Production
SENDCOMMS_API_KEY=sc_live_xxx`}</code>
          </pre>
          <div className="flex items-start gap-2 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-yellow-400 text-sm font-medium">Important</p>
              <p className="text-gray-400 text-xs">Ensure you have sufficient balance before switching to production. Live requests will charge your account.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Best Practices</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold text-sm mb-2">Use Environment Variables</h4>
            <p className="text-gray-500 text-xs">Store different keys for development and production environments</p>
          </div>
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold text-sm mb-2">Add Production Checks</h4>
            <p className="text-gray-500 text-xs">Verify you&apos;re not using test keys in production environments</p>
          </div>
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold text-sm mb-2">Test All Scenarios</h4>
            <p className="text-gray-500 text-xs">Test successful sends, validation errors, and edge cases</p>
          </div>
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4">
            <h4 className="text-white font-semibold text-sm mb-2">Log Sandbox Responses</h4>
            <p className="text-gray-500 text-xs">Check for _sandbox in responses to verify test mode</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">FAQ</h2>
        <div className="space-y-3">
          <details className="bg-[#121316] border border-white/10 rounded-lg group">
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <span className="text-white text-sm font-medium">Do test transactions count toward rate limits?</span>
              <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3">
              Yes, rate limits apply to both test and live keys to ensure your integration handles limits correctly.
            </div>
          </details>
          <details className="bg-[#121316] border border-white/10 rounded-lg group">
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <span className="text-white text-sm font-medium">Is there a test balance limit?</span>
              <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3">
              No, sandbox mode doesn&apos;t check or deduct balance. You can make unlimited test requests.
            </div>
          </details>
          <details className="bg-[#121316] border border-white/10 rounded-lg group">
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <span className="text-white text-sm font-medium">Can I convert a test key to live?</span>
              <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3">
              No, you need to create a new live key. Keys cannot be converted between modes.
            </div>
          </details>
          <details className="bg-[#121316] border border-white/10 rounded-lg group">
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <span className="text-white text-sm font-medium">Are test transactions logged?</span>
              <svg className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 text-gray-400 text-sm border-t border-white/5 pt-3">
              Yes, all test transactions are logged to a separate table for debugging purposes.
            </div>
          </details>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/errors" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Error Handling
        </Link>
        <Link href="/docs/api/email" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          Email API
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
