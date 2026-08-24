import Link from 'next/link';

const curlExample = `# Last 20 calls, newest first
curl -X GET "https://api.sendcomms.com/api/v1/requests?limit=20" \\
  -H "Authorization: Bearer sc_live_your_api_key_here"

# Only the calls that failed at the provider
curl -X GET "https://api.sendcomms.com/api/v1/requests?outcome=provider_error&limit=50" \\
  -H "Authorization: Bearer sc_live_your_api_key_here"

# Page through everything you sent to one endpoint
curl -X GET "https://api.sendcomms.com/api/v1/requests?endpoint=/api/v1/sms/send&limit=100&offset=100" \\
  -H "Authorization: Bearer sc_live_your_api_key_here"`;

const responseExample = `{
  "success": true,
  "data": {
    "requests": [
      {
        "id": "6f2a1c74-1a0e-4b1f-9b6d-0a2f5e7c9d31",
        "endpoint": "/api/v1/sms/send",
        "method": "POST",
        "service": "sms",
        "sandbox": false,
        "outcome": "provider_error",
        "status_code": 503,
        "error_code": "SMS_SEND_FAILED",
        "error_message": "Failed to send SMS. Please try again in a few minutes.",
        "transaction_id": "sms_mjhw8xkw_6f97ab63ff91",
        "request_summary": {
          "to": "+233540800994",
          "from": "SendComms",
          "reference": "order-12345",
          "message_length": 24
        },
        "duration_ms": 1843,
        "started_at": "2026-08-22T09:14:02.118Z",
        "finished_at": "2026-08-22T09:14:03.961Z"
      },
      {
        "id": "b91d0f30-7c44-4f0e-8a5a-1c3d9f2b6e70",
        "endpoint": "/api/v1/sms/send",
        "method": "POST",
        "service": "sms",
        "sandbox": false,
        "outcome": "rate_limited",
        "status_code": 429,
        "error_code": "RATE_LIMIT_EXCEEDED",
        "error_message": null,
        "transaction_id": null,
        "request_summary": {
          "to": "+233540800994",
          "from": null,
          "reference": null,
          "message_length": 18
        },
        "duration_ms": 12,
        "started_at": "2026-08-22T09:13:58.402Z",
        "finished_at": "2026-08-22T09:13:58.414Z"
      },
      {
        "id": "0c5b8e12-30a7-49d5-b2c1-77e4a1f0b8aa",
        "endpoint": "/api/v1/email/send",
        "method": "POST",
        "service": "email",
        "sandbox": true,
        "outcome": "success",
        "status_code": 200,
        "error_code": null,
        "error_message": null,
        "transaction_id": "email_test_1935f2c0a11_9f3b21c4",
        "request_summary": {
          "to": ["customer@example.com"],
          "subject_length": 27,
          "recipients": 1
        },
        "duration_ms": 96,
        "started_at": "2026-08-22T09:11:44.007Z",
        "finished_at": "2026-08-22T09:11:44.103Z"
      }
    ],
    "total": 1487,
    "limit": 20,
    "offset": 0
  }
}`;

const outcomes: { value: string; badge: string; meaning: string }[] = [
  {
    value: 'success',
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
    meaning: 'The response was a 2xx. The call did what you asked.',
  },
  {
    value: 'client_error',
    badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    meaning: 'A 4xx we attributed to the request itself — validation failures, missing fields, unknown transaction, insufficient balance. Check error_code.',
  },
  {
    value: 'rate_limited',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    meaning: 'A 429. You exceeded a per-minute, per-day or per-month limit for that service. Nothing was sent and nothing was charged.',
  },
  {
    value: 'provider_error',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    meaning: 'A 502/503, or a 5xx carrying a provider error code (SMS_SEND_FAILED, EMAIL_SEND_FAILED, DATA_PURCHASE_FAILED, PROVIDER_ERROR, SERVICE_UNAVAILABLE). We reached the downstream network or carrier and it refused or timed out.',
  },
  {
    value: 'internal_error',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    meaning: 'A 5xx on our side that was not a provider failure. Safe to retry; if it repeats, quote the id when you contact support.',
  },
  {
    value: 'unauthorized',
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
    meaning: 'A 401. The key was rejected mid-request, or the account attached to it was suspended.',
  },
  {
    value: 'started',
    badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    meaning: 'The row was opened but never finalised — the request crashed hard or the connection dropped before a response was produced. A row that stays started is the strongest signal to send us.',
  },
];

export default function RequestLogPage() {
  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">API Reference</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Request Log</h1>

      <div className="flex items-center gap-3 font-mono text-sm bg-[#16181b] border border-white/10 rounded-lg p-1.5 pr-4 w-fit mb-6">
        <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-500/20">GET</span>
        <span className="text-gray-300">/api/v1/requests</span>
      </div>

      <div className="flex items-start justify-between mb-8 border-b border-white/5 pb-8">
        <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
          An audit trail of every authenticated API call made with your keys, newest first. The row is written
          the moment your key is accepted — <strong className="text-gray-300">before</strong> anything that can
          fail: before the rate limit check, before the body is parsed, before we ever talk to a provider. That
          means it can answer &quot;what happened to my request?&quot; even for calls that never reached a
          provider at all.
        </p>
      </div>

      {/* Why it exists */}
      <div className="mb-10">
        <div className="bg-[#101318] border border-blue-500/20 rounded-lg py-3 px-4 flex items-start gap-2 text-sm text-blue-400">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <strong>Transactions vs. requests:</strong> a transaction only exists once a send has been accepted
            and priced. A request row exists for every call, including the ones that were rejected, rate limited
            or crashed. If a call left no transaction behind, this is where you find out why.
          </div>
        </div>
      </div>

      {/* Request example */}
      <div className="mb-10">
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">cURL</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{curlExample}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Query Parameters */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Query Parameters</h3>
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
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">limit</td>
                <td className="py-3 px-4 text-xs text-gray-400">integer</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Rows to return. Default <code className="text-gray-300">50</code>, maximum <code className="text-gray-300">200</code>. Values outside 1–200 are clamped, not rejected.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">offset</td>
                <td className="py-3 px-4 text-xs text-gray-400">integer</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Rows to skip. Default <code className="text-gray-300">0</code>. Combine with <code className="text-gray-300">limit</code> and <code className="text-gray-300">total</code> to page.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">outcome</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Exact-match filter on one of the outcome values below.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">endpoint</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4"><span className="bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">Optional</span></td>
                <td className="py-3 px-4 text-sm text-gray-400">Exact-match filter on the path, e.g. <code className="text-gray-300">/api/v1/sms/send</code>. No prefix or wildcard matching.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Rows are always ordered by <code className="text-gray-400">started_at</code> descending, and are always
          scoped to the account that owns the API key — you never see another customer&apos;s calls.
        </p>
      </div>

      {/* Response Codes */}
      <div className="mb-10">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response Codes</h3>
        <div className="flex flex-wrap items-center gap-3 bg-[#16181b] border border-white/10 rounded-lg p-3">
          <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-mono border border-green-500/20">200</span>
          <span className="text-sm text-gray-400">Success</span>
          <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs font-mono border border-red-500/20 ml-4">401</span>
          <span className="text-sm text-gray-400">Missing or invalid API key</span>
          <span className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded text-xs font-mono border border-orange-500/20 ml-4">403</span>
          <span className="text-sm text-gray-400">Account suspended</span>
        </div>
      </div>

      {/* Response */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Response</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-3">Success Response</h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            <code className="text-gray-300">requests</code> holds the page of rows, and <code className="text-gray-300">total</code> is
            the number of rows matching your filters — not the number returned.
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-green-400">{responseExample}</code>
          </pre>
        </div>
      </div>

      {/* Response Fields */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Request Fields</h3>
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
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">id</td>
                <td className="py-3 px-4 text-xs text-gray-400">uuid</td>
                <td className="py-3 px-4 text-sm text-gray-400">Identifier for this attempt. Quote it when you contact support.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">endpoint</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4 text-sm text-gray-400">Public path that was called, e.g. /api/v1/sms/send</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">method</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4 text-sm text-gray-400">HTTP method</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">service</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | null</td>
                <td className="py-3 px-4 text-sm text-gray-400">sms, email, data, airtime, usage or webhooks</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">sandbox</td>
                <td className="py-3 px-4 text-xs text-gray-400">boolean</td>
                <td className="py-3 px-4 text-sm text-gray-400">True when the call used an <code className="text-gray-300">sc_test_</code> key</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">outcome</td>
                <td className="py-3 px-4 text-xs text-gray-400">string</td>
                <td className="py-3 px-4 text-sm text-gray-400">What happened. See the table below.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">status_code</td>
                <td className="py-3 px-4 text-xs text-gray-400">integer | null</td>
                <td className="py-3 px-4 text-sm text-gray-400">HTTP status we returned. Null while the row is still <code className="text-gray-300">started</code>.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">error_code</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | null</td>
                <td className="py-3 px-4 text-sm text-gray-400">Our error code, e.g. INVALID_PHONE_NUMBER</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">error_message</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | null</td>
                <td className="py-3 px-4 text-sm text-gray-400">Short sanitised message, truncated to 500 characters</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">transaction_id</td>
                <td className="py-3 px-4 text-xs text-gray-400">string | null</td>
                <td className="py-3 px-4 text-sm text-gray-400">Set once the call got far enough to create a transaction</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">request_summary</td>
                <td className="py-3 px-4 text-xs text-gray-400">object</td>
                <td className="py-3 px-4 text-sm text-gray-400">Redacted summary of what you sent. Never message bodies — see below.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">duration_ms</td>
                <td className="py-3 px-4 text-xs text-gray-400">integer | null</td>
                <td className="py-3 px-4 text-sm text-gray-400">Wall-clock time we spent on the request</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">started_at</td>
                <td className="py-3 px-4 text-xs text-gray-400">timestamp</td>
                <td className="py-3 px-4 text-sm text-gray-400">When your key was accepted. Rows are sorted on this.</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">finished_at</td>
                <td className="py-3 px-4 text-xs text-gray-400">timestamp | null</td>
                <td className="py-3 px-4 text-sm text-gray-400">When the response was produced. Null for <code className="text-gray-300">started</code> rows.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Outcomes */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Outcome Values</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Outcome</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">What it means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {outcomes.map((o) => (
                <tr key={o.value} className="bg-[#0b0c0e]">
                  <td className="py-3 px-4 align-top">
                    <span className={`${o.badge} px-2 py-0.5 rounded text-xs font-mono border whitespace-nowrap`}>
                      {o.value}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{o.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redaction */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">What request_summary Contains</h3>
        <div className="bg-[#121316] border border-white/5 rounded-lg p-6">
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            <code className="text-gray-300">request_summary</code> is deliberately redacted. It records only what
            is needed to identify a call — the destination, your reference, and sizes such as message length or
            recipient count. It never contains message bodies, email HTML, subjects, attachments or credentials.
            Routes write it before validation runs, so a rejected request is still traceable: you can see who you
            tried to reach and why it was refused.
          </p>
          <pre className="bg-[#0b0c0e] p-4 rounded-lg text-sm overflow-x-auto border border-white/5">
            <code className="text-green-400">{`"request_summary": {
  "to": "+233540800994",
  "from": "SendComms",
  "reference": "order-12345",
  "message_length": 24
}`}</code>
          </pre>
          <p className="text-xs text-gray-500 mt-3">
            The exact keys vary by endpoint. The client IP and user agent of each call are recorded too, but are
            not returned by this endpoint.
          </p>
        </div>
      </div>

      <div className="bg-[#101318] border border-blue-500/20 rounded-lg py-3 px-4 mb-12 flex items-start gap-2 text-sm text-blue-400">
        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <strong>Debugging a 429:</strong> filter with <code className="bg-blue-500/20 px-1 rounded">outcome=rate_limited</code> to
          see exactly which calls were shed and when. See <Link href="/docs/rate-limits" className="underline hover:text-white">Rate Limits</Link> for
          the per-plan ceilings.
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/rate-limits" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Rate Limits
        </Link>
        <Link href="/docs/errors" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          Error Handling
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </>
  );
}
