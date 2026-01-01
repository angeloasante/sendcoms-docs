'use client';

import Link from 'next/link';

const customerErrors = [
  {
    code: 'UNAUTHORIZED',
    status: 401,
    description: 'Invalid or missing API key',
    example: `{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}`
  },
  {
    code: 'ACCOUNT_SUSPENDED',
    status: 403,
    description: 'Your account has been suspended',
    example: `{
  "success": false,
  "error": {
    "code": "ACCOUNT_SUSPENDED",
    "message": "Your account has been suspended. Please contact support."
  }
}`
  },
  {
    code: 'INSUFFICIENT_BALANCE',
    status: 402,
    description: 'Not enough balance to complete the request',
    example: `{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance. Required: $0.0350, Available: $0.0100",
    "details": {
      "required": 0.035,
      "available": 0.01
    }
  }
}`
  },
  {
    code: 'RATE_LIMIT_EXCEEDED',
    status: 429,
    description: 'Too many requests, please slow down',
    example: `{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again in 39 seconds.",
    "limit": 5,
    "remaining": 0,
    "reset": 1766452500,
    "retryAfter": 39
  }
}`
  },
  {
    code: 'INVALID_PHONE_NUMBER',
    status: 400,
    description: 'Phone number format is invalid',
    example: `{
  "success": false,
  "error": {
    "code": "INVALID_PHONE_NUMBER",
    "message": "Invalid phone number. Use E.164 format (e.g., +233540800994)"
  }
}`
  },
  {
    code: 'INVALID_EMAIL',
    status: 400,
    description: 'Email address format is invalid',
    example: `{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Invalid email address: notanemail"
  }
}`
  },
  {
    code: 'MESSAGE_TOO_LONG',
    status: 400,
    description: 'SMS message exceeds maximum length',
    example: `{
  "success": false,
  "error": {
    "code": "MESSAGE_TOO_LONG",
    "message": "Message too long. Maximum 1600 characters allowed, got 1750",
    "details": {
      "length": 1750,
      "maxLength": 1600
    }
  }
}`
  },
  {
    code: 'MISSING_FIELD',
    status: 400,
    description: 'A required field is missing from the request',
    example: `{
  "success": false,
  "error": {
    "code": "MISSING_FIELD",
    "message": "Missing required field: to"
  }
}`
  },
  {
    code: 'SMS_SEND_FAILED',
    status: 400,
    description: 'Invalid sender ID or phone number',
    example: `{
  "success": false,
  "error": {
    "code": "SMS_SEND_FAILED",
    "message": "The \"from\" number is not a verified SendComms sender. Remove the \"from\" parameter to use the default sender, add a verified number in your dashboard, or contact support@sendcomms.com for assistance.",
    "transaction_id": "sms_abc123xyz"
  }
}`
  },
  {
    code: 'INVALID_SENDER_ID',
    status: 400,
    description: 'The sender ID is not verified for your account',
    example: `{
  "success": false,
  "error": {
    "code": "SMS_SEND_FAILED",
    "message": "The \"from\" number is not verified. Please add and verify this number in your SendComms dashboard or contact support@sendcomms.com.",
    "transaction_id": "sms_abc123xyz"
  }
}`
  },
  {
    code: 'RECIPIENT_OPTED_OUT',
    status: 400,
    description: 'The recipient has opted out of receiving messages',
    example: `{
  "success": false,
  "error": {
    "code": "SMS_SEND_FAILED",
    "message": "This recipient has opted out of receiving messages from this number.",
    "transaction_id": "sms_abc123xyz"
  }
}`
  }
];

const serviceErrors = [
  {
    code: 'SMS_SEND_FAILED',
    status: 503,
    service: 'SMS',
    description: 'Failed to send SMS message',
    retryable: true
  },
  {
    code: 'EMAIL_SEND_FAILED',
    status: 503,
    service: 'Email',
    description: 'Failed to send email message',
    retryable: true
  },
  {
    code: 'DATA_PURCHASE_FAILED',
    status: 503,
    service: 'Data',
    description: 'Failed to process data bundle purchase',
    retryable: true
  },
  {
    code: 'AIRTIME_PURCHASE_FAILED',
    status: 503,
    service: 'Airtime',
    description: 'Failed to process airtime purchase',
    retryable: true
  }
];

const getStatusColor = (status: number) => {
  if (status >= 500) return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
  if (status >= 400) return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' };
  return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' };
};

export default function ErrorsPage() {
  return (
    <>
      <div className="text-sm font-medium text-blue-500 mb-2">API Reference</div>
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">Error Handling</h1>
      
      <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/5 pb-8">
        SendComms uses conventional HTTP response codes to indicate the success or failure of an API request.
        Codes in the <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">2xx</code> range indicate success,
        codes in the <code className="text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">4xx</code> range indicate client errors,
        and codes in the <code className="text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">5xx</code> range indicate server errors.
      </p>

      {/* Error Response Structure */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Error Response Structure</h2>
        <p className="text-gray-400 text-sm mb-4">
          All error responses follow a consistent structure:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">ERROR RESPONSE FORMAT</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`{
  "success": false,
  "error": {
    "code": "ERROR_CODE",       // Machine-readable error code
    "message": "Human-readable description",
    "details": { ... },        // Optional: additional context
    "transaction_id": "txn_..." // Optional: for tracking
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* HTTP Status Codes */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">HTTP Status Codes</h2>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-gray-400">
                <th className="py-3 px-4 font-medium">Code</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 px-4"><span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/30">200</span></td>
                <td className="py-3 px-4 text-white">OK</td>
                <td className="py-3 px-4 text-gray-400">Request succeeded</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-bold border border-green-500/30">201</span></td>
                <td className="py-3 px-4 text-white">Created</td>
                <td className="py-3 px-4 text-gray-400">Resource created successfully</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold border border-orange-500/30">400</span></td>
                <td className="py-3 px-4 text-white">Bad Request</td>
                <td className="py-3 px-4 text-gray-400">Invalid parameters or request format</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold border border-orange-500/30">401</span></td>
                <td className="py-3 px-4 text-white">Unauthorized</td>
                <td className="py-3 px-4 text-gray-400">Invalid or missing API key</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold border border-orange-500/30">402</span></td>
                <td className="py-3 px-4 text-white">Payment Required</td>
                <td className="py-3 px-4 text-gray-400">Insufficient account balance</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold border border-orange-500/30">403</span></td>
                <td className="py-3 px-4 text-white">Forbidden</td>
                <td className="py-3 px-4 text-gray-400">Account suspended or permission denied</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold border border-orange-500/30">404</span></td>
                <td className="py-3 px-4 text-white">Not Found</td>
                <td className="py-3 px-4 text-gray-400">Resource not found</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold border border-orange-500/30">409</span></td>
                <td className="py-3 px-4 text-white">Conflict</td>
                <td className="py-3 px-4 text-gray-400">Request already in progress (idempotency)</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-bold border border-orange-500/30">429</span></td>
                <td className="py-3 px-4 text-white">Too Many Requests</td>
                <td className="py-3 px-4 text-gray-400">Rate limit exceeded</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-bold border border-red-500/30">500</span></td>
                <td className="py-3 px-4 text-white">Internal Server Error</td>
                <td className="py-3 px-4 text-gray-400">Unexpected server error</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-bold border border-red-500/30">503</span></td>
                <td className="py-3 px-4 text-white">Service Unavailable</td>
                <td className="py-3 px-4 text-gray-400">Service temporarily unavailable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Errors */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Client Error Codes</h2>
        <p className="text-gray-400 text-sm mb-4">
          These errors indicate an issue with your request. Check the error message for how to fix it.
        </p>
        <div className="space-y-4">
          {customerErrors.map((error) => {
            const colors = getStatusColor(error.status);
            return (
              <div key={error.code} className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-bold border ${colors.border}`}>
                      {error.status}
                    </span>
                    <code className="text-white font-mono text-sm">{error.code}</code>
                  </div>
                  <span className="text-gray-500 text-xs">{error.description}</span>
                </div>
                <div className="p-4">
                  <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
                    <code className="text-gray-300">{error.example}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Errors */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Service Error Codes</h2>
        <p className="text-gray-400 text-sm mb-4">
          These errors indicate a temporary issue with the service. Most are retryable after a short delay.
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10">
              <tr className="text-left text-gray-400">
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Code</th>
                <th className="py-3 px-4 font-medium">Service</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium">Retryable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {serviceErrors.map((error, index) => {
                const colors = getStatusColor(error.status);
                return (
                  <tr key={error.code} className={index % 2 === 1 ? 'bg-[#0b0c0e]' : ''}>
                    <td className="py-3 px-4">
                      <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-bold border ${colors.border}`}>
                        {error.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <code className="text-white font-mono text-xs">{error.code}</code>
                    </td>
                    <td className="py-3 px-4 text-white">{error.service}</td>
                    <td className="py-3 px-4 text-gray-400">{error.description}</td>
                    <td className="py-3 px-4">
                      {error.retryable ? (
                        <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">Yes</span>
                      ) : (
                        <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20">No</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-blue-400 font-medium text-sm">503 Service Unavailable</h4>
              <p className="text-blue-200/70 text-sm mt-1">
                When you receive a 503 error, this typically indicates a temporary issue. Wait a few seconds and 
                retry your request. Use the <code className="text-blue-400">idempotency_key</code> parameter to safely retry 
                without risk of duplicate processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Handling Best Practices */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Check the Error Code</h4>
                <p className="text-gray-400 text-sm">
                  Use the <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">error.code</code> field for 
                  programmatic handling rather than parsing error messages.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Use Idempotency Keys for Retries</h4>
                <p className="text-gray-400 text-sm">
                  Always include an <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">idempotency_key</code> when 
                  retrying failed requests to prevent duplicate processing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Implement Exponential Backoff</h4>
                <p className="text-gray-400 text-sm">
                  For rate limit (429) and service unavailable (503) errors, implement exponential backoff 
                  starting with a 1-second delay and doubling each retry.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Log Transaction IDs</h4>
                <p className="text-gray-400 text-sm">
                  Always log the <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">transaction_id</code> from 
                  error responses. This helps support quickly identify and resolve issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Retry Example */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Retry Example</h2>
        <p className="text-gray-400 text-sm mb-4">
          Here&apos;s how to implement safe retries with idempotency:
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">JAVASCRIPT</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`async function sendSMSWithRetry(to, message, maxRetries = 3) {
  const idempotencyKey = crypto.randomUUID();
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch('https://api.sendcomms.com/api/v1/sms/send', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to,
          message,
          idempotency_key: idempotencyKey
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return data; // Success!
      }
      
      // Don't retry client errors (4xx except 429)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new Error(data.error?.message || 'Request failed');
      }
      
      // Retry on 429 (rate limit) or 5xx (server errors)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      
    } catch (error) {
      if (attempt === maxRetries) throw error;
    }
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
        <Link href="/docs/rate-limits" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
          <svg className="w-4 h-4 text-gray-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Rate Limits
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
