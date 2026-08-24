import Link from 'next/link';

type Row = { name: string; type: string; required: boolean; description: string };

const createParams: Row[] = [
  { name: 'user', type: 'string', required: true, description: 'The part before the @ (e.g. "hello" creates hello@yourdomain.com). Letters, numbers, dots, dashes and underscores.' },
  { name: 'password', type: 'string', required: false, description: 'Optional. Minimum 8 characters. Leave it out and we generate a strong one for you.' },
];

const responseFields: Row[] = [
  { name: 'email', type: 'string', required: false, description: 'The full mailbox address that was created.' },
  { name: 'password', type: 'string', required: false, description: 'Shown once, in this response only. It is not stored in a retrievable form.' },
  { name: 'smtp', type: 'object', required: false, description: 'Outgoing server: host, port (587), security (STARTTLS) and username.' },
  { name: 'imap', type: 'object | null', required: false, description: 'Incoming server: host, port (993), security (SSL/TLS) and username. Null on send-only domains, which have no inbox here — their mail still goes to your existing provider.' },
];

const errors = [
  { code: '400', name: 'Invalid mailbox name', when: 'The local part contains characters that are not allowed, or the password is shorter than 8 characters.' },
  { code: '404', name: 'Domain not found', when: 'The domain id does not exist, or belongs to another account.' },
  { code: '409', name: 'Domain not verified', when: 'The domain has not passed DNS verification yet. Add the DKIM record and verify before creating mailboxes.' },
];

export default function MailboxesPage() {
  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">Email API</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Mailboxes</h1>

      <p className="text-gray-400 leading-relaxed mb-6 border-b border-white/5 pb-8">
        A mailbox is a real email address on one of your verified domains &mdash; an inbox you can log into over IMAP,
        plus an SMTP credential you can point any app at. Create one when an address needs to{' '}
        <span className="text-white">receive</span> mail or be used as an SMTP login.
      </p>

      {/* The clarification that saves support tickets */}
      <div className="mb-10 rounded-lg border border-blue-500/25 bg-blue-500/5 p-4">
        <p className="text-sm font-medium text-blue-300 mb-1">You do not need a mailbox to send email</p>
        <p className="text-sm text-gray-400">
          Once a domain is verified you can already send from <span className="text-white">any</span> address on it &mdash;{' '}
          <code className="text-gray-300">noreply@</code>, <code className="text-gray-300">hello@</code>,{' '}
          <code className="text-gray-300">alerts@</code> &mdash; with no mailbox at all. Just pass it as{' '}
          <code className="text-gray-300">from</code> on{' '}
          <Link href="/docs/api/email" className="text-blue-400 hover:text-blue-300">POST /api/v1/email/send</Link>.
          Create a mailbox only when you need to receive replies at that address or log in to it.
        </p>
      </div>

      {/* Prerequisite */}
      <div className="mb-10 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Before you start</h3>
        <p className="text-sm text-gray-400 mb-3">
          The domain must exist on your account and be <span className="text-emerald-400">verified</span>. See{' '}
          <Link href="/docs/api/email/domains" className="text-blue-400 hover:text-blue-300">Domains</Link> for adding
          and verifying one. Creating a mailbox on an unverified domain returns{' '}
          <code className="text-gray-300">409</code>.
        </p>
        <p className="text-sm text-gray-400">
          If the domain was added as <span className="text-white">send only</span>, its inbound mail still goes to your
          existing provider, so a mailbox there is useful as an SMTP credential rather than an inbox. To actually
          receive mail with us, add the domain with <code className="text-gray-300">mode: &quot;full&quot;</code>.
        </p>
      </div>

      {/* Create */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
          <code className="text-sm text-gray-300 font-mono">/api/v1/domains/:domainId/mailboxes</code>
        </div>
        <p className="text-sm text-gray-400 mb-4">Create a mailbox on a verified domain.</p>

        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`curl -X POST \\
  https://api.sendcomms.com/api/v1/domains/dom_abc123/mailboxes \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user": "hello"
  }'`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Body Parameters</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Field</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {createParams.map((p) => (
                <tr key={p.name} className="bg-[#0b0c0e]">
                  <td className="py-3 px-4 text-sm text-blue-400 font-mono whitespace-nowrap">
                    {p.name}
                    {p.required && <span className="ml-2 text-[10px] text-red-400 uppercase">required</span>}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">{p.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">RESPONSE</span>
            <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">201 Created</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`{
  "success": true,
  "data": {
    "email": "hello@yourdomain.com",
    "password": "shown-once-store-it",
    "smtp": {
      "host": "mail.sendcomms.com",
      "port": 587,
      "security": "STARTTLS",
      "username": "hello@yourdomain.com"
    },
    "imap": {
      "host": "mail.sendcomms.com",
      "port": 993,
      "security": "SSL/TLS",
      "username": "hello@yourdomain.com"
    }
    // imap is null on a send-only domain
  },
  "message": "Mailbox created. Copy the password now - it cannot be retrieved later."
}`}</code>
            </pre>
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-4 mb-6">
          <p className="text-sm font-medium text-amber-300 mb-1">The password is shown once</p>
          <p className="text-sm text-gray-400">
            Store it as soon as you receive it &mdash; we cannot show it again. If you lose it, POST the same{' '}
            <code className="text-gray-300">user</code> again to reset the password to a new value.
          </p>
        </div>

        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Response Fields</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Field</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {responseFields.map((p) => (
                <tr key={p.name} className="bg-[#0b0c0e]">
                  <td className="py-3 px-4 text-sm text-blue-400 font-mono whitespace-nowrap">{p.name}</td>
                  <td className="py-3 px-4 text-xs text-gray-400">{p.type}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* List */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
          <code className="text-sm text-gray-300 font-mono">/api/v1/domains/:domainId/mailboxes</code>
        </div>
        <p className="text-sm text-gray-400 mb-4">List the mailboxes that exist on a domain. Passwords are never returned.</p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">RESPONSE</span>
            <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">200 OK</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`{
  "success": true,
  "data": {
    "mailboxes": ["hello@yourdomain.com", "support@yourdomain.com"]
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Connecting */}
      <div className="mb-10 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Connecting a mail client or app</h3>
        <p className="text-sm text-gray-400 mb-4">
          Use the credentials exactly as returned. Port <code className="text-gray-300">587</code> with STARTTLS &mdash;
          not 465.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0b0c0e] border border-white/5 rounded-lg p-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Outgoing (SMTP)</div>
            <div className="text-sm text-gray-400 space-y-1 font-mono">
              <div>host: mail.sendcomms.com</div>
              <div>port: 587</div>
              <div>security: STARTTLS</div>
              <div>username: the full address</div>
            </div>
          </div>
          <div className="bg-[#0b0c0e] border border-white/5 rounded-lg p-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Incoming (IMAP) &mdash; full hosting only</div>
            <div className="text-sm text-gray-400 space-y-1 font-mono">
              <div>host: mail.sendcomms.com</div>
              <div>port: 993</div>
              <div>security: SSL/TLS</div>
              <div>username: the full address</div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Send-only domains return <code className="text-gray-400">imap: null</code> &mdash; there is no inbox here,
              your mail keeps arriving at your existing provider.
            </p>
          </div>
        </div>
      </div>

      {/* Errors */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Errors</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Meaning</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {errors.map((e) => (
                <tr key={e.code} className="bg-[#0b0c0e]">
                  <td className="py-3 px-4"><code className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-xs">{e.code}</code></td>
                  <td className="py-3 px-4 text-sm text-white">{e.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{e.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-6">
        <Link href="/docs/api/email/domains" className="text-sm text-gray-400 hover:text-white">&larr; Domains</Link>
        <Link href="/docs/api/email/webhooks" className="text-sm text-gray-400 hover:text-white">Webhooks &rarr;</Link>
      </div>
    </>
  );
}
