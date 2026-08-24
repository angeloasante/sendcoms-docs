import Link from 'next/link';

const routes = [
  {
    id: 'africa_local',
    label: 'africa_local',
    cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    what: 'Carried on a local African network. Best rates and best deliverability in these markets.',
    sender: 'Registered sender IDs supported',
  },
  {
    id: 'africa_regional',
    label: 'africa_regional',
    cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    what: 'African countries not on a local network. Carried on our regional African route.',
    sender: 'Registered sender IDs supported',
  },
  {
    id: 'global',
    label: 'global',
    cls: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    what: 'Everywhere else — 180+ countries on our global route.',
    sender: 'Alphanumeric sender IDs vary by country',
  },
];

export default function CountriesPage() {
  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">SMS API</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Country Coverage</h1>

      <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/5 pb-8">
        Which destinations we reach, and how each one is carried. You never choose a route &mdash; we pick it from the
        destination number and fall back automatically if the first one is unavailable. Use this endpoint to check a
        destination is supported, and whether a sender ID will work there, before you send.
      </p>

      {/* Endpoint */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
          <code className="text-sm text-gray-300 font-mono">/api/v1/sms/countries</code>
        </div>

        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`# every destination
curl https://api.sendcomms.com/api/v1/sms/countries

# only the local African networks
curl "https://api.sendcomms.com/api/v1/sms/countries?route=africa_local"

# search by country name or dialing code
curl "https://api.sendcomms.com/api/v1/sms/countries?q=kenya"
curl "https://api.sendcomms.com/api/v1/sms/countries?q=233"`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Query Parameters</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Parameter</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">route</td>
                <td className="py-3 px-4 text-sm text-gray-400">
                  Filter to one route: <code className="text-gray-300">africa_local</code>,{' '}
                  <code className="text-gray-300">africa_regional</code> or <code className="text-gray-300">global</code>.
                </td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">q</td>
                <td className="py-3 px-4 text-sm text-gray-400">Match on country name or dialing code.</td>
              </tr>
            </tbody>
          </table>
        </div>

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
    "countries": [
      {
        "country": "Ghana",
        "dialing_code": "+233",
        "route": "africa_local",
        "supported": true,
        "sender_id_supported": true
      },
      {
        "country": "Kenya",
        "dialing_code": "+254",
        "route": "africa_local",
        "supported": true,
        "sender_id_supported": true
      },
      {
        "country": "United Kingdom",
        "dialing_code": "+44",
        "route": "global",
        "supported": true,
        "sender_id_supported": false
      }
    ],
    "total": 176,
    "routes": { "…": "…" }
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Routes */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-white mb-4">Routes</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Route</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">What it means</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sender IDs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {routes.map((r) => (
                <tr key={r.id} className="bg-[#0b0c0e]">
                  <td className="py-3 px-4">
                    <span className={`${r.cls} px-2 py-0.5 rounded text-xs border font-mono`}>{r.label}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{r.what}</td>
                  <td className="py-3 px-4 text-sm text-gray-400">{r.sender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-12 bg-[#121316] border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
        <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
          <li>
            <span className="text-white">Routes can change.</span> We move destinations between routes as coverage and
            quality change. Your code should read this endpoint rather than hard-coding a list.
          </li>
          <li>
            <span className="text-white">Sender IDs are per-market.</span> A name approved for one market is not
            automatically usable in another &mdash; see{' '}
            <Link href="/docs/api/sms/sender-ids" className="text-blue-400 hover:text-blue-300">Sender IDs</Link>.
          </li>
          <li>
            <span className="text-white">Supported does not mean unrestricted.</span> Individual countries apply their
            own content rules &mdash; Ghana, for example, does not permit promotional SMS on Sundays.
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-6">
        <Link href="/docs/api/sms/sender-ids" className="text-sm text-gray-400 hover:text-white">&larr; Sender IDs</Link>
        <Link href="/docs/api/sms/pricing" className="text-sm text-gray-400 hover:text-white">Pricing &rarr;</Link>
      </div>
    </>
  );
}
