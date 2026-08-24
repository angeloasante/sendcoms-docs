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
    "mode": "send_only"
  }'`,
  nodejs: `const response = await fetch('https://api.sendcomms.com/api/v1/domains', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'mail.yourdomain.com',
    mode: 'send_only'
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
        'mode': 'send_only'
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
              <p className="font-medium text-white">Add one DNS record</p>
              <p>Add the single DKIM TXT record we return to your DNS provider. Leave your MX records alone &mdash; your inbox stays exactly where it is.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium text-white">Verify your domain</p>
              <p>Trigger verification to check DNS propagation. Records usually appear within 30 minutes, though some providers take longer.</p>
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

      {/* Ownership + availability */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-white mb-3">Checking a domain before you add it</h3>
        <p className="text-sm text-gray-400 mb-4">
          A domain can be held by only one SendComms account at a time. Check availability before you commit &mdash;
          the dashboard does this as you type.
        </p>

        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
          <code className="text-sm text-gray-300 font-mono">/api/v1/domains/check?name=yourdomain.com</code>
        </div>

        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">RESPONSE</span>
            <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">200 OK</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`{
  "success": true,
  "data": {
    "name": "yourdomain.com",
    "available": true,
    "reason": null,
    "message": "Domain is available."
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">reason</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">What it means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><code className="text-gray-300 text-xs">null</code></td>
                <td className="py-3 px-4 text-sm text-gray-400">Available &mdash; you can add it.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><code className="text-gray-300 text-xs">taken_by_you</code></td>
                <td className="py-3 px-4 text-sm text-gray-400">Already on your account. Use the existing domain instead of adding it again.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><code className="text-gray-300 text-xs">taken</code></td>
                <td className="py-3 px-4 text-sm text-gray-400">
                  Registered to another SendComms account. If you own the domain, contact{' '}
                  <span className="text-blue-400">support@sendcomms.com</span> and we will transfer it.
                </td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><code className="text-gray-300 text-xs">in_use_upstream</code></td>
                <td className="py-3 px-4 text-sm text-gray-400">Already configured on our mail infrastructure. Contact support if you own it.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><code className="text-gray-300 text-xs">invalid</code></td>
                <td className="py-3 px-4 text-sm text-gray-400">Not a valid domain name.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Adding a domain that is not available returns <code className="text-gray-300">409</code> with the same{' '}
          <code className="text-gray-300">reason</code> field, so you can rely on the create call alone if you prefer.
        </p>
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
                <td className="py-3 px-4 text-sm text-gray-400">Verification failed. Legacy status &mdash; new domains stay <span className="text-gray-300">pending</span> until the DKIM record is found.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded text-xs border border-orange-500/20">temporary_failure</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">DNS records temporarily not detected. Legacy status &mdash; retried automatically.</td>
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
                    <td className="py-3 px-4 text-sm text-blue-400 font-mono">mode</td>
                    <td className="py-3 px-4 text-xs text-gray-400">string</td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      <code className="text-gray-300">send_only</code> (default) adds sending to a domain whose inbox
                      stays with your current provider &mdash; one DKIM record, your MX untouched.{' '}
                      <code className="text-gray-300">full</code> also hosts this domain&apos;s inbox, which{' '}
                      <span className="text-amber-400">moves your MX to us and stops mail reaching your current provider</span>.
                    </td>
                  </tr>
                  <tr className="bg-[#0b0c0e]">
                    <td className="py-3 px-4 text-sm text-blue-400 font-mono">region</td>
                    <td className="py-3 px-4 text-xs text-gray-400">string</td>
                    <td className="py-3 px-4 text-sm text-gray-400">Optional label kept on your domain record. All mail is currently sent from a single region, so this does not change routing.</td>
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
              <span className="text-sm text-gray-500">- Remove a domain (your DNS records are left in place; delete them yourself)</span>
            </div>
            <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
              <span className="text-sm text-gray-300 font-mono">/api/v1/domains/sync</span>
              <span className="text-sm text-gray-500">- Sync all domains to refresh status</span>
            </div>
            <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
              <span className="text-sm text-gray-300 font-mono">/api/v1/domains/check?name=</span>
              <span className="text-sm text-gray-500">- Check whether a domain can be added</span>
            </div>
            <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
              <span className="text-sm text-gray-300 font-mono">/api/v1/domains/:domainId/mailboxes</span>
              <span className="text-sm text-gray-500">- Create a mailbox on a verified domain</span>
            </div>
          </div>
        </div>
      </div>

      {/* DNS Records Info */}
      <div className="mt-10 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Required DNS Records</h3>

        <div className="mb-5 rounded-lg border border-amber-500/25 bg-amber-500/5 p-4">
          <p className="text-sm font-medium text-amber-300 mb-1">Your inbox is not affected</p>
          <p className="text-sm text-gray-400">
            SendComms sending domains are <span className="text-white font-medium">send-only</span>. You add one DKIM
            record and nothing else. <span className="text-white font-medium">Do not change or remove your MX records</span> &mdash;
            mail you receive keeps going to your current provider (Google Workspace, Zoho, Outlook, whatever you use today).
          </p>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          When you create a domain, the API returns the exact record to add. Domains verify on DKIM alone.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">DKIM</span>
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white">1 TXT record &mdash; required</p>
              <p>
                Host <code className="text-gray-300">scomms._domainkey</code>, value starting{' '}
                <code className="text-gray-300">v=DKIM1; k=rsa; p=…</code>. Cryptographically signs your email so
                receivers can prove it really came from you. We use our own selector so it never collides with a DKIM
                record your existing provider already publishes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-900/40 text-purple-400 border border-purple-500/20">SPF</span>
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white">Optional &mdash; merge, never add a second record</p>
              <p>
                If you already have an SPF record, you may merge our sending IPs into it (before the trailing{' '}
                <code className="text-gray-300">~all</code>/<code className="text-gray-300">-all</code>). Never create a
                second SPF record &mdash; two SPF records make SPF invalid. Not required: DMARC passes through DKIM
                alignment.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">DMARC</span>
            <div className="text-sm text-gray-400">
              <p className="font-medium text-white">Optional TXT record (recommended)</p>
              <p>
                If you have no <code className="text-gray-300">_dmarc</code> record, adding one improves deliverability
                and gives you reporting. If you already have one, leave it as it is.
              </p>
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
