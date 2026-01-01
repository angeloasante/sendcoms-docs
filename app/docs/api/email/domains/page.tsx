'use client';

import Link from 'next/link';
import { useState } from 'react';

type Language = 'curl' | 'nodejs' | 'python';

const listDomainsExamples: Record<Language, string> = {
  curl: `curl -X GET \\
  https://api.sendcomms.com/api/v1/domains \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  nodejs: `const response = await fetch('https://api.sendcomms.com/api/v1/domains', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const { data } = await response.json();
console.log(data);`,
  python: `import requests

response = requests.get(
    'https://api.sendcomms.com/api/v1/domains',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

print(response.json())`
};

const createDomainExamples: Record<Language, string> = {
  curl: `curl -X POST \\
  https://api.sendcomms.com/api/v1/domains \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "mail.yourdomain.com",
    "region": "us-east-1"
  }'`,
  nodejs: `const response = await fetch('https://api.sendcomms.com/api/v1/domains', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'mail.yourdomain.com',
    region: 'us-east-1'
  })
});

const { data } = await response.json();
// data.dns_records contains records to add to your DNS
console.log(data.dns_records);`,
  python: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/domains',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'mail.yourdomain.com',
        'region': 'us-east-1'
    }
)

data = response.json()['data']
# data['dns_records'] contains records to add to your DNS
print(data['dns_records'])`
};

const verifyDomainExamples: Record<Language, string> = {
  curl: `curl -X POST \\
  https://api.sendcomms.com/api/v1/domains/YOUR_DOMAIN_ID/verify \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  nodejs: `const response = await fetch(
  'https://api.sendcomms.com/api/v1/domains/YOUR_DOMAIN_ID/verify',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

const { data } = await response.json();
console.log(data.status); // 'pending', 'verified', etc.`,
  python: `import requests

response = requests.post(
    'https://api.sendcomms.com/api/v1/domains/YOUR_DOMAIN_ID/verify',
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

data = response.json()['data']
print(data['status'])  # 'pending', 'verified', etc.`
};

export default function DomainsDocsPage() {
  const [selectedLang, setSelectedLang] = useState<Language>('curl');

  const languages: { id: Language; name: string; icon: string }[] = [
    { id: 'curl', name: 'cURL', icon: '🌐' },
    { id: 'nodejs', name: 'Node.js', icon: '📦' },
    { id: 'python', name: 'Python', icon: '🐍' },
  ];

  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">Email API</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Custom Domains</h1>
      
      <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-8">
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          Add custom sending domains to send emails from your own domain (e.g., hello@yourdomain.com) 
          instead of the default SendComms address. Custom domains improve deliverability and brand recognition.
        </p>
      </div>

      {/* How it works */}
      <div className="mb-10 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How Custom Domains Work</h3>
        <div className="space-y-4 text-sm text-gray-400">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="font-medium text-white">Add your domain</p>
              <p>Register your sending domain (e.g., mail.yourdomain.com) via the API or dashboard</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="font-medium text-white">Configure DNS records</p>
              <p>Add the provided SPF, DKIM, and optional DMARC records to your DNS provider</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium text-white">Verify your domain</p>
              <p>Trigger verification to check DNS propagation (can take up to 72 hours)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
            <div>
              <p className="font-medium text-white">Start sending</p>
              <p>Once verified, emails will automatically use your domain. You can also specify a custom &quot;from&quot; address.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Status */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Domain Status Values</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">not_started</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Domain added but verification not yet initiated</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded text-xs border border-yellow-500/20">pending</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Verification in progress, waiting for DNS propagation</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">verified</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Domain verified and ready to send emails</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">failed</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">DNS records not detected within 72 hours</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded text-xs border border-orange-500/20">temporary_failure</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">DNS records temporarily not detected, will retry automatically</td>
              </tr>
            </tbody>
          </table>
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

      {/* API Endpoints */}
      <div className="space-y-10">
        {/* List Domains */}
        <div>
          <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-4">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
            <span className="text-gray-300">/api/v1/domains</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">List all domains for your account.</p>
          <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
              <button 
                onClick={() => navigator.clipboard.writeText(listDomainsExamples[selectedLang])}
                className="text-gray-500 hover:text-white transition-colors text-xs flex items-center gap-1"
              >
                Copy
              </button>
            </div>
            <div className="p-4">
              <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
                <code className="text-gray-300">{listDomainsExamples[selectedLang]}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Create Domain */}
        <div>
          <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-4">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
            <span className="text-gray-300">/api/v1/domains</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Add a new sending domain. Returns DNS records that must be added to your DNS provider.</p>
          
          <div className="mb-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Request Body</h4>
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-[#16181b]">
                    <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Parameter</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-[#0b0c0e]">
                    <td className="py-3 px-4 text-sm text-blue-400 font-mono">name</td>
                    <td className="py-3 px-4 text-xs text-gray-400">string</td>
                    <td className="py-3 px-4 text-sm text-gray-400">Domain name (e.g., mail.yourdomain.com)</td>
                  </tr>
                  <tr className="bg-[#0b0c0e]">
                    <td className="py-3 px-4 text-sm text-blue-400 font-mono">region</td>
                    <td className="py-3 px-4 text-xs text-gray-400">string</td>
                    <td className="py-3 px-4 text-sm text-gray-400">us-east-1, eu-west-1, sa-east-1, or ap-northeast-1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
              <button 
                onClick={() => navigator.clipboard.writeText(createDomainExamples[selectedLang])}
                className="text-gray-500 hover:text-white transition-colors text-xs flex items-center gap-1"
              >
                Copy
              </button>
            </div>
            <div className="p-4">
              <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
                <code className="text-gray-300">{createDomainExamples[selectedLang]}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Verify Domain */}
        <div>
          <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-4">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
            <span className="text-gray-300">/api/v1/domains/:domainId/verify</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Trigger DNS verification for a domain. Call this after adding DNS records.</p>
          <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
              <button 
                onClick={() => navigator.clipboard.writeText(verifyDomainExamples[selectedLang])}
                className="text-gray-500 hover:text-white transition-colors text-xs flex items-center gap-1"
              >
                Copy
              </button>
            </div>
            <div className="p-4">
              <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
                <code className="text-gray-300">{verifyDomainExamples[selectedLang]}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Other Endpoints */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Other Endpoints</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
              <span className="text-sm text-gray-300 font-mono">/api/v1/domains/:domainId</span>
              <span className="text-sm text-gray-500">- Get domain details with DNS records</span>
            </div>
            <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-900/40 text-yellow-400 border border-yellow-500/20">PATCH</span>
              <span className="text-sm text-gray-300 font-mono">/api/v1/domains/:domainId</span>
              <span className="text-sm text-gray-500">- Update domain settings (tracking, TLS)</span>
            </div>
            <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-900/40 text-red-400 border border-red-500/20">DELETE</span>
              <span className="text-sm text-gray-300 font-mono">/api/v1/domains/:domainId</span>
              <span className="text-sm text-gray-500">- Remove a domain</span>
            </div>
            <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
              <span className="text-sm text-gray-300 font-mono">/api/v1/domains/sync</span>
              <span className="text-sm text-gray-500">- Sync all domains to refresh status</span>
            </div>
          </div>
        </div>
      </div>

      {/* DNS Records Info */}
      <div className="mt-10 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Required DNS Records</h3>
        <p className="text-sm text-gray-400 mb-4">
          When you create a domain, you&apos;ll receive DNS records to add to your DNS provider. These typically include:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-900/40 text-purple-400 border border-purple-500/20">SPF</span>
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white">MX and TXT records</p>
              <p>Authorizes SendComms to send on your behalf</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">DKIM</span>
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white">3 CNAME records</p>
              <p>Cryptographically signs your emails for authenticity</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">DMARC</span>
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white">TXT record (recommended)</p>
              <p>Improves deliverability and provides reporting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Limits */}
      <div className="mt-10 mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Domain Limits by Plan</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">1</div>
            <div className="text-xs text-gray-500 uppercase mt-1">Free</div>
          </div>
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-xs text-gray-500 uppercase mt-1">Starter</div>
          </div>
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">10</div>
            <div className="text-xs text-gray-500 uppercase mt-1">Pro</div>
          </div>
          <div className="bg-[#121316] border border-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">100</div>
            <div className="text-xs text-gray-500 uppercase mt-1">Enterprise</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/api/email/batch" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Batch Email
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
