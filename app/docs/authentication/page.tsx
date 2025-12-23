'use client';

import Link from 'next/link';
import { useState } from 'react';

const errorResponses = [
  {
    code: '401',
    name: 'Unauthorized',
    color: 'red',
    description: 'Missing or invalid API key',
    response: `{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}`
  },
  {
    code: '403',
    name: 'Forbidden',
    color: 'orange',
    description: 'API key is valid but lacks required permissions or account is suspended',
    response: `{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Your account has been suspended. Please contact support."
  }
}`
  }
];

const codeExamples = {
  curl: `curl -X POST https://api.sendcomms.com/api/v1/sms/send \\
  -H "Authorization: Bearer sc_live_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+233201234567",
    "message": "Hello from SendComms!"
  }'`,
  javascript: `const response = await fetch('https://api.sendcomms.com/api/v1/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sc_live_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+233201234567',
    message: 'Hello from SendComms!'
  })
});

const data = await response.json();`,
  python: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/sms/send',
    headers={
        'Authorization': 'Bearer sc_live_your_api_key_here',
        'Content-Type': 'application/json'
    },
    json={
        'to': '+233201234567',
        'message': 'Hello from SendComms!'
    }
)

data = response.json()`,
  php: `<?php
$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.sendcomms.com/api/v1/sms/send',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer sc_live_your_api_key_here',
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'to' => '+233201234567',
        'message' => 'Hello from SendComms!'
    ])
]);

$response = curl_exec($ch);
$data = json_decode($response, true);`
};

type Language = keyof typeof codeExamples;

export default function AuthenticationPage() {
  const [activeTab, setActiveTab] = useState<Language>('curl');

  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">API Reference</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Authentication</h1>
      
      <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/5 pb-8">
        SendComms uses API keys to authenticate requests. You can manage your API keys in the 
        <Link href="https://dashboard.sendcomms.com" className="text-blue-400 hover:text-blue-300 ml-1">dashboard</Link>. 
        All API requests must include your API key in the Authorization header.
      </p>

      {/* API Key Format */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">API Key Format</h2>
        <p className="text-gray-400 text-sm mb-4">
          SendComms API keys follow a specific format to help you identify the key type:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-gray-400">
                <th className="py-3 px-4 font-medium">Prefix</th>
                <th className="py-3 px-4 font-medium">Environment</th>
                <th className="py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 px-4">
                  <code className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs">sc_live_</code>
                </td>
                <td className="py-3 px-4 text-white">Production</td>
                <td className="py-3 px-4 text-gray-400">Live API key for production use</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <code className="text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded text-xs">sc_test_</code>
                </td>
                <td className="py-3 px-4 text-white">Sandbox</td>
                <td className="py-3 px-4 text-gray-400">Test key for development (coming soon)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Authorization Header */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Authorization Header</h2>
        <p className="text-gray-400 text-sm mb-4">
          Include your API key in the <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">Authorization</code> header 
          using the Bearer token scheme:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST HEADER</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">Authorization: <span className="text-green-400">Bearer</span> <span className="text-yellow-400">sc_live_your_api_key_here</span></code>
            </pre>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Example Requests</h2>
        <p className="text-gray-400 text-sm mb-4">
          Here&apos;s how to authenticate API requests in different languages:
        </p>
        
        {/* Language Tabs */}
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex border-b border-white/10">
            {(Object.keys(codeExamples) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  activeTab === lang 
                    ? 'text-white bg-white/5 border-b-2 border-blue-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{codeExamples[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* API Key Permissions */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">API Key Permissions</h2>
        <p className="text-gray-400 text-sm mb-4">
          Each API key has associated permissions that control which endpoints it can access:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-gray-400">
                <th className="py-3 px-4 font-medium">Permission</th>
                <th className="py-3 px-4 font-medium">Endpoints</th>
                <th className="py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 px-4">
                  <code className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-xs">sms:send</code>
                </td>
                <td className="py-3 px-4 text-green-400 font-mono text-xs">/api/v1/sms/*</td>
                <td className="py-3 px-4 text-gray-400">Send SMS messages</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <code className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-xs">email:send</code>
                </td>
                <td className="py-3 px-4 text-green-400 font-mono text-xs">/api/v1/email/*</td>
                <td className="py-3 px-4 text-gray-400">Send email messages</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <code className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-xs">data:purchase</code>
                </td>
                <td className="py-3 px-4 text-green-400 font-mono text-xs">/api/v1/data/*</td>
                <td className="py-3 px-4 text-gray-400">Purchase data bundles</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <code className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-xs">airtime:purchase</code>
                </td>
                <td className="py-3 px-4 text-green-400 font-mono text-xs">/api/v1/airtime/*</td>
                <td className="py-3 px-4 text-gray-400">Purchase airtime (coming soon)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-blue-400 font-medium text-sm">Full Access Keys</h4>
              <p className="text-blue-200/70 text-sm mt-1">
                By default, API keys created from the dashboard have access to all services. You can create 
                restricted keys with specific permissions for better security.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Responses */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Authentication Errors</h2>
        <p className="text-gray-400 text-sm mb-4">
          When authentication fails, you&apos;ll receive one of these error responses:
        </p>
        <div className="space-y-4">
          {errorResponses.map((error) => (
            <div key={error.code} className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center gap-3">
                <span className={`bg-${error.color}-500/20 text-${error.color}-400 px-2 py-0.5 rounded text-xs font-bold border border-${error.color}-500/30`}>
                  {error.code}
                </span>
                <span className="text-white text-sm font-medium">{error.name}</span>
                <span className="text-gray-500 text-xs">— {error.description}</span>
              </div>
              <div className="p-4">
                <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
                  <code className={`text-${error.color}-300`}>{error.response}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Best Practices */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Security Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Store Keys Securely</h4>
                <p className="text-gray-400 text-sm">
                  Never hardcode API keys in your source code. Use environment variables or a secrets manager.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Rotate Keys Regularly</h4>
                <p className="text-gray-400 text-sm">
                  Periodically rotate your API keys and immediately revoke any compromised keys from the dashboard.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Use Least Privilege</h4>
                <p className="text-gray-400 text-sm">
                  Create API keys with only the permissions needed for each use case. Don&apos;t use full-access keys everywhere.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Server-Side Only</h4>
                <p className="text-gray-400 text-sm">
                  Never expose API keys in client-side code. Make all API calls from your backend server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Variables Example */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Using Environment Variables</h2>
        <p className="text-gray-400 text-sm mb-4">
          Here&apos;s the recommended way to use API keys in your application:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">.env</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`# SendComms API Key
SENDCOMMS_API_KEY=sc_live_your_api_key_here`}</code>
            </pre>
          </div>
        </div>
        <div className="mt-4 bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">USAGE IN CODE</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`// Node.js / JavaScript
const apiKey = process.env.SENDCOMMS_API_KEY;

const response = await fetch('https://api.sendcomms.com/api/v1/sms/send', {
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  },
  // ...
});`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/quickstart" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quick Start
        </Link>
        <Link href="/docs/rate-limits" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          Rate Limits
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
