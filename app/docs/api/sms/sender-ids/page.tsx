import Link from 'next/link';

type Row = { name: string; type: string; required: boolean; description: string };

const registerParams: Row[] = [
  { name: 'sender_id', type: 'string', required: true, description: '3–11 characters. Letters, numbers, spaces, dots, dashes or underscores. This is what recipients see instead of a number.' },
  { name: 'purpose', type: 'string', required: true, description: 'What the sender ID will be used for. Carriers require this and reject vague answers — e.g. "Order notifications for our online store".' },
  { name: 'destination', type: 'string', required: true, description: 'Where you will send from this name: a country dialing code such as "233" (Ghana), or "international" for everywhere else. Each carrier keeps its own approved list, so this decides who we register it with.' },
];

const statuses = [
  { value: 'pending', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20', meaning: 'Submitted and awaiting carrier review. Messages keep sending from your default sender in the meantime.' },
  { value: 'approved', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', meaning: 'Live. Pass it as the "from" field when you send.' },
  { value: 'rejected', cls: 'bg-red-500/10 text-red-400 border-red-500/20', meaning: 'The carrier declined it. Register a different name, or contact support for the reason.' },
];

export default function SenderIdsPage() {
  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">SMS API</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Sender IDs</h1>

      <p className="text-gray-400 leading-relaxed mb-6 border-b border-white/5 pb-8">
        A sender ID is the name recipients see in place of a phone number &mdash; <code className="text-gray-300">AcmeCorp</code>{' '}
        instead of <code className="text-gray-300">+233…</code>. Register the ones you want to use, then pass an approved
        name as <code className="text-gray-300">from</code> when you send.
      </p>

      <div className="mb-10 rounded-lg border border-amber-500/25 bg-amber-500/5 p-4">
        <p className="text-sm font-medium text-amber-300 mb-1">Approval is done by the mobile carriers, not by us</p>
        <p className="text-sm text-gray-400">
          Registration is reviewed manually and typically takes <span className="text-white">a few weeks</span>. In Ghana,
          carriers <span className="text-white">block</span> unregistered sender IDs rather than replacing them with a
          number, so a message sent from an unregistered name may not arrive at all. Until yours is approved, omit{' '}
          <code className="text-gray-300">from</code> and your messages go out under the default sender.
        </p>
      </div>

      {/* Register */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
          <code className="text-sm text-gray-300 font-mono">/api/v1/sms/sender-ids</code>
        </div>

        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`curl -X POST https://api.sendcomms.com/api/v1/sms/sender-ids \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender_id": "AcmeCorp",
    "purpose": "Order notifications for our online store",
    "destination": "233"
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
              {registerParams.map((p) => (
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

        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">RESPONSE</span>
            <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">201 Created</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`{
  "success": true,
  "data": {
    "id": "3f2a…",
    "sender_id": "AcmeCorp",
    "status": "pending",
    "purpose": "Order notifications for our online store",
    "destination_code": "233",
    "destination_label": "Ghana",
    "provider": "bms",
    "created_at": "2026-08-24T09:12:04Z",
    "approved_at": null
  },
  "submitted_to_carrier": true,
  "message": "Sender ID submitted for approval. Carriers review these manually and it can take a few weeks."
}`}</code>
            </pre>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-3">
          If <code className="text-gray-300">submitted_to_carrier</code> is <code className="text-gray-300">false</code>,
          we saved your request but could not reach the carrier &mdash; use the refresh endpoint below to retry.
        </p>
      </div>

      {/* List / refresh / delete */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-white mb-4">Managing sender IDs</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
            <span className="text-sm text-gray-300 font-mono">/api/v1/sms/sender-ids</span>
            <span className="text-sm text-gray-500">- List yours and their status</span>
          </div>
          <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-500/20">POST</span>
            <span className="text-sm text-gray-300 font-mono">/api/v1/sms/sender-ids/:id/refresh</span>
            <span className="text-sm text-gray-500">- Re-check approval with the carrier</span>
          </div>
          <div className="flex items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-900/40 text-red-400 border border-red-500/20">DELETE</span>
            <span className="text-sm text-gray-300 font-mono">/api/v1/sms/sender-ids/:id</span>
            <span className="text-sm text-gray-500">- Remove it from your account</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          There is no push notification when a sender ID is approved &mdash; poll the refresh endpoint, or check the
          Sender IDs tab in your dashboard.
        </p>
      </div>

      {/* Statuses */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Status Values</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {statuses.map((s) => (
                <tr key={s.value} className="bg-[#0b0c0e]">
                  <td className="py-3 px-4">
                    <span className={`${s.cls} px-2 py-0.5 rounded text-xs border`}>
                      {s.value}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{s.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Destination */}
      <div className="mb-10 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">A sender ID belongs to one market</h3>
        <p className="text-sm text-gray-400 mb-3">
          Sender IDs are not global. Each carrier keeps its own approved list, so a name approved for Ghana is unknown
          to the carrier that handles the rest of the world. That is why <code className="text-gray-300">destination</code>{' '}
          is required &mdash; it tells us which carrier to lodge the request with.
        </p>
        <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
          <li>
            <span className="text-white">Ghana (<code className="text-gray-300">233</code>)</span> &mdash; submitted to
            the Ghanaian carrier and starts as <code className="text-gray-300">pending</code> until approved.
          </li>
          <li>
            <span className="text-white">Anywhere else</span> &mdash; recorded against your account and usable
            immediately; that route has no carrier pre-approval step. Delivery of alphanumeric senders still varies by
            country.
          </li>
        </ul>
        <p className="text-sm text-gray-400 mt-3">
          Need the same name in two markets? Register it once per destination.
        </p>
      </div>

      {/* Ownership */}
      <div className="mb-10 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">One owner per sender ID</h3>
        <p className="text-sm text-gray-400 mb-3">
          A sender ID can be held by only one SendComms account. Registering a name another account already holds
          returns <code className="text-gray-300">409</code>, and sending from it returns{' '}
          <code className="text-gray-300">403 SENDER_ID_NOT_YOURS</code>. If you own the brand and someone else has
          registered it, contact <span className="text-blue-400">support@sendcomms.com</span>.
        </p>
        <p className="text-sm text-gray-400">
          Names nobody has registered are still accepted on routes whose carriers allow ad-hoc sender IDs &mdash; but
          they are not guaranteed to be delivered, and are blocked outright in Ghana.
        </p>
      </div>

      {/* Content rules */}
      <div className="mb-12 rounded-lg border border-white/10 bg-[#121316] p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Content rules (Ghana)</h3>
        <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
          <li>Promotional SMS may <span className="text-white">not</span> be sent on Sundays.</li>
          <li>Political, religious, gambling and unsolicited promotional content is not permitted.</li>
          <li>Sender IDs are capped at 11 characters by the carriers, not by us.</li>
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-6">
        <Link href="/docs/api/sms" className="text-sm text-gray-400 hover:text-white">&larr; Send SMS</Link>
        <Link href="/docs/api/sms/pricing" className="text-sm text-gray-400 hover:text-white">Pricing &rarr;</Link>
      </div>
    </>
  );
}
