'use client';

import Link from 'next/link';

const rateLimits = {
  sms: {
    free: { perMinute: 5, perDay: 100 },
    starter: { perMinute: 50, perDay: 1000 },
    pro: { perMinute: 200, perDay: 10000 },
    enterprise: { perMinute: 1000, perDay: 100000 }
  },
  email: {
    free: { perMinute: 10, perDay: 500 },
    starter: { perMinute: 100, perDay: 5000 },
    pro: { perMinute: 500, perDay: 50000 },
    enterprise: { perMinute: 2000, perDay: 500000 }
  },
  data: {
    free: { perMinute: 2, perDay: 50 },
    starter: { perMinute: 20, perDay: 500 },
    pro: { perMinute: 100, perDay: 5000 },
    enterprise: { perMinute: 500, perDay: 50000 }
  },
  airtime: {
    free: { perMinute: 2, perDay: 50 },
    starter: { perMinute: 20, perDay: 500 },
    pro: { perMinute: 100, perDay: 5000 },
    enterprise: { perMinute: 500, perDay: 50000 }
  }
};

const plans = ['free', 'starter', 'pro', 'enterprise'] as const;
const services = ['sms', 'email', 'data', 'airtime'] as const;

export default function RateLimitsPage() {
  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">API Reference</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Rate Limits & Idempotency</h1>
      
      <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/5 pb-8">
        SendComms uses rate limiting to ensure fair usage and protect our infrastructure. We also support 
        idempotency keys to prevent duplicate requests from being processed multiple times.
      </p>

      {/* Rate Limit Headers */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Rate Limit Headers</h2>
        <p className="text-gray-400 text-sm mb-4">
          All API responses include headers to help you track your rate limit status:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">RESPONSE HEADERS</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`X-RateLimit-Limit: 5          # Max requests in window
X-RateLimit-Remaining: 3      # Requests remaining
X-RateLimit-Reset: 1766452500 # Unix timestamp when limit resets`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Rate Limit Error */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Rate Limit Exceeded Response</h2>
        <p className="text-gray-400 text-sm mb-4">
          When you exceed your rate limit, you&apos;ll receive a <code className="text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">429</code> status code:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center gap-2">
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-bold border border-red-500/30">429</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">TOO MANY REQUESTS</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-red-300">{`{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "limit": 5,
    "remaining": 0,
    "reset": 1766452500,
    "retryAfter": 39
  }
}`}</code>
            </pre>
          </div>
        </div>
        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className="text-yellow-400 font-medium text-sm">Best Practice</h4>
              <p className="text-yellow-200/70 text-sm mt-1">
                Use the <code className="bg-yellow-500/20 px-1 rounded">Retry-After</code> header to determine when to retry your request.
                Implement exponential backoff for production applications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limits by Service */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Rate Limits by Service</h2>
        <p className="text-gray-400 text-sm mb-6">
          Rate limits vary by service and plan. Limits are applied per API key.
        </p>

        {/* SMS */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
            <span>💬</span> SMS API
          </h3>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#16181b]">
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Minute</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {plans.map(plan => (
                  <tr key={plan} className="bg-[#0b0c0e]">
                    <td className="py-3 px-4 text-sm text-white font-medium capitalize">{plan}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.sms[plan].perMinute.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.sms[plan].perDay.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
            <span>📧</span> Email API
          </h3>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#16181b]">
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Minute</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {plans.map(plan => (
                  <tr key={plan} className="bg-[#0b0c0e]">
                    <td className="py-3 px-4 text-sm text-white font-medium capitalize">{plan}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.email[plan].perMinute.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.email[plan].perDay.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
            <span>📶</span> Data Bundles API
          </h3>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#16181b]">
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Minute</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {plans.map(plan => (
                  <tr key={plan} className="bg-[#0b0c0e]">
                    <td className="py-3 px-4 text-sm text-white font-medium capitalize">{plan}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.data[plan].perMinute.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.data[plan].perDay.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Airtime */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-orange-400 mb-3 flex items-center gap-2">
            <span>📱</span> Airtime API
          </h3>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#16181b]">
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Minute</th>
                  <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Per Day</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {plans.map(plan => (
                  <tr key={plan} className="bg-[#0b0c0e]">
                    <td className="py-3 px-4 text-sm text-white font-medium capitalize">{plan}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.airtime[plan].perMinute.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-gray-400 font-mono">{rateLimits.airtime[plan].perDay.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Idempotency Section */}
      <div className="mb-10 pt-8 border-t border-white/10">
        <h2 className="text-xl font-semibold text-white mb-4">Idempotency</h2>
        <p className="text-gray-400 text-sm mb-6">
          Idempotency keys prevent duplicate requests from being processed multiple times. This is critical for 
          payment-related operations like SMS, data purchases, and airtime top-ups.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#16181b] border border-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">🛡️</div>
            <h4 className="text-white font-medium mb-1">Prevent Double Charges</h4>
            <p className="text-gray-500 text-xs">Same purchase isn&apos;t processed twice</p>
          </div>
          <div className="bg-[#16181b] border border-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">📨</div>
            <h4 className="text-white font-medium mb-1">No Duplicate Messages</h4>
            <p className="text-gray-500 text-xs">Same SMS/email isn&apos;t sent multiple times</p>
          </div>
          <div className="bg-[#16181b] border border-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">🔄</div>
            <h4 className="text-white font-medium mb-1">Safe Retries</h4>
            <p className="text-gray-500 text-xs">Network retries don&apos;t cause issues</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Usage</h3>
        <p className="text-gray-400 text-sm mb-4">
          Include an <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">idempotency_key</code> in your request body:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">REQUEST</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`curl -X POST https://api.sendcomms.com/api/v1/sms/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+233540800994",
    "message": "Your OTP is 123456",
    "idempotency_key": "order-12345-otp-sms"
  }'`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Cached Response</h3>
        <p className="text-gray-400 text-sm mb-4">
          When a duplicate request is detected, we return the cached response with an indicator:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5 flex items-center gap-2">
            <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/30">200</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">CACHED RESPONSE</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-green-300">{`{
  "success": true,
  "data": {
    "transaction_id": "sms_mjhw8xkw_6f97ab63ff91",
    "message_id": "SMf9c2ebdffd58b516f6895b02051c4b21",
    "status": "sent",
    "to": "+233540800994"
  },
  "_idempotent": {
    "replayed": true,
    "message": "Duplicate request - returning cached response"
  }
}`}</code>
            </pre>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-blue-400 font-medium text-sm">How It Works</h4>
              <ul className="text-blue-200/70 text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Idempotency keys are cached for <strong>24 hours</strong></li>
                <li>Keys are scoped per customer and per service</li>
                <li>Use UUIDs or unique order IDs as keys</li>
                <li>Responses include <code className="bg-blue-500/20 px-1 rounded">X-Idempotent-Replay: true</code> header</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Supported Endpoints</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#16181b]">
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Endpoint</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Idempotency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-purple-400 font-mono">POST /api/v1/sms/send</td>
                <td className="py-3 px-4"><span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">Supported</span></td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-blue-400 font-mono">POST /api/v1/email/send</td>
                <td className="py-3 px-4"><span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">Supported</span></td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4 text-sm text-green-400 font-mono">POST /api/v1/data/purchase</td>
                <td className="py-3 px-4"><span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">Supported</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/authentication" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Authentication
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
