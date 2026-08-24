import Link from 'next/link';

type ErrorRow = {
  code: string;
  status: number;
  when: string;
  fix: string;
};

const authErrors: ErrorRow[] = [
  {
    code: 'UNAUTHORIZED',
    status: 401,
    when: 'The Authorization header is missing or malformed, or the key is unknown, revoked or inactive.',
    fix: 'Send Authorization: Bearer <your_api_key> (the legacy X-API-Key header also works) and confirm the key is still active in your dashboard.'
  },
  {
    code: 'ACCOUNT_SUSPENDED',
    status: 403,
    when: 'The API key is valid but the account it belongs to has been deactivated.',
    fix: 'Contact support@sendcomms.com. Requests keep failing until the account is reactivated.'
  },
  {
    code: 'FORBIDDEN',
    status: 403,
    when: 'The API key is valid, but it does not carry the permission for the service you called. The response names the needed scope in required_permission and the key\u2019s current scopes in key_permissions.',
    fix: 'Use a key that has the service enabled, or create a new key with that permission from the dashboard.'
  },
  {
    code: 'SENDER_ID_NOT_YOURS',
    status: 403,
    when: 'The alphanumeric sender ID passed as "from" is registered to another SendComms account. Sender IDs are globally unique so one customer cannot send under another business\u2019s brand.',
    fix: 'Register your own sender ID under Sender IDs, omit "from" to use the default sender, or contact support@sendcomms.com if you own the brand.'
  },
  {
    code: 'CONFLICT',
    status: 409,
    when: 'A domain you tried to add is already held by another SendComms account, is already on your account, or is already configured on our mail infrastructure. The response carries a reason field: taken, taken_by_you or in_use_upstream. Creating a mailbox on a domain that has not been verified yet also returns 409.',
    fix: 'Call GET /api/v1/domains/check?name=… first. If you own a domain that shows as taken, contact support@sendcomms.com. For mailboxes, verify the domain before creating addresses on it.'
  }
];

const requestErrors: ErrorRow[] = [
  {
    code: 'INVALID_JSON',
    status: 400,
    when: 'The request body could not be parsed as JSON at all (empty body, trailing comma, form encoding).',
    fix: 'Send a JSON body with Content-Type: application/json. Serialise with your language’s JSON encoder rather than string concatenation.'
  },
  {
    code: 'INVALID_REQUEST',
    status: 400,
    when: 'The body is valid JSON but not the shape the endpoint expects — a field has the wrong type, or the body is not a JSON object.',
    fix: 'Read the errors array included in the error object: it lists the offending field path and the expected type.'
  },
  {
    code: 'MISSING_FIELD',
    status: 400,
    when: 'A required field is absent — to, message, subject, phone_number, network, capacity_gb, or the transaction_id query parameter on status endpoints. In /email/batch the message names the offending index.',
    fix: 'Add the field named in the message. The message is always of the form "Missing required field: <name>".'
  },
  {
    code: 'MISSING_CONTENT',
    status: 400,
    when: 'An email was submitted with neither html nor text content.',
    fix: 'Provide at least one of html or text. Sending both is recommended so clients that block HTML still render the message.'
  },
  {
    code: 'NO_RECIPIENTS',
    status: 400,
    when: 'The to field is present but resolves to an empty list.',
    fix: 'Pass a non-empty string or a non-empty array of addresses in to.'
  },
  {
    code: 'TOO_MANY_RECIPIENTS',
    status: 400,
    when: 'More than 50 recipients on a single email. /email/send counts to; the mail service also rejects any message whose to + cc + bcc together exceed 50.',
    fix: 'Split the send, or use POST /api/v1/email/batch to submit up to 100 separate messages in one call.'
  },
  {
    code: 'BATCH_LIMIT_EXCEEDED',
    status: 400,
    when: 'POST /api/v1/email/batch was called with more than 100 emails in the emails array.',
    fix: 'Chunk the array into batches of 100 or fewer and send them sequentially.'
  },
  {
    code: 'INVALID_INPUT',
    status: 400,
    when: 'POST /api/v1/email/batch was called without an emails array, or with an empty one.',
    fix: 'Send { "emails": [ ... ] } with at least one message object.'
  },
  {
    code: 'NOT_FOUND',
    status: 404,
    when: 'A status lookup referenced a transaction_id that does not exist, or does not belong to your account.',
    fix: 'Use the transaction_id returned by the original send/purchase response. IDs are scoped to the account that created them.'
  }
];

const fieldErrors: ErrorRow[] = [
  {
    code: 'INVALID_EMAIL',
    status: 400,
    when: 'An address in to, cc or bcc is not a valid email address. The message repeats the address, and names the field for cc/bcc.',
    fix: 'Validate addresses before sending. Display names must use the Name <user@example.com> form.'
  },
  {
    code: 'UNVERIFIED_SENDER_DOMAIN',
    status: 400,
    when: 'The domain in the from address is not a verified sending domain on your account. The error echoes provided_from and provided_domain.',
    fix: 'Verify the domain under Domains in your dashboard, or omit from entirely to send from your account default sender. SendComms never silently substitutes a different sender.'
  },
  {
    code: 'INVALID_PHONE_NUMBER',
    status: 400,
    when: 'The SMS or airtime recipient is not a valid E.164 number.',
    fix: 'Send the number in E.164 format, including the + and country code — for example +233540800994.'
  },
  {
    code: 'MESSAGE_TOO_LONG',
    status: 400,
    when: 'An SMS body is longer than 1600 characters (10 concatenated segments).',
    fix: 'Shorten the message, or split it into several sends. Non-GSM characters shorten each segment, so long unicode messages hit the limit sooner.'
  },
  {
    code: 'INVALID_CONTINENT',
    status: 400,
    when: 'The optional continent routing hint on /sms/send is not one of the supported values.',
    fix: 'Use one of the values listed in the error message, or omit continent and let SendComms detect it from the number.'
  },
  {
    code: 'INVALID_PHONE',
    status: 400,
    when: 'The number on a Ghana data purchase is not a valid Ghanaian mobile number.',
    fix: 'Use 0241234567 or +233241234567. Data bundles are Ghana-only, so international numbers are rejected here.'
  },
  {
    code: 'INVALID_NETWORK',
    status: 400,
    when: 'The network on a data purchase is not a supported Ghanaian carrier.',
    fix: 'Use mtn, telecel or airteltigo (case-insensitive).'
  },
  {
    code: 'INVALID_AMOUNT',
    status: 400,
    when: 'The airtime amount is missing, zero, negative or not numeric.',
    fix: 'Send amount as a positive number in the operator’s currency.'
  },
  {
    code: 'INVALID_OPERATOR',
    status: 400,
    when: 'The airtime operatorId could not be read as a number.',
    fix: 'Pass the numeric operator id from the operator lookup endpoint, not the operator name.'
  },
  {
    code: 'INVALID_COUNTRY',
    status: 400,
    when: 'The optional airtime countryCode is not a two-letter ISO code.',
    fix: 'Use a 2-letter ISO 3166-1 alpha-2 code such as GH or NG, or omit the field.'
  },
  {
    code: 'INVALID_URL',
    status: 400,
    when: 'Webhook registration was sent without a url, or with a url that is not HTTPS.',
    fix: 'Register an absolute https:// endpoint. Plain HTTP endpoints are rejected.'
  },
  {
    code: 'INVALID_EVENTS',
    status: 400,
    when: 'Webhook registration was sent with an empty events array, or with event names SendComms does not emit.',
    fix: 'Send a non-empty array of supported event names — the error message lists every valid value — or use "*" to subscribe to all of them.'
  },
  {
    code: 'MISSING_ID',
    status: 400,
    when: 'DELETE /api/v1/webhooks was called without the id query parameter.',
    fix: 'Append ?id=<webhook_id>, using the id returned when the webhook was registered.'
  }
];

const limitErrors: ErrorRow[] = [
  {
    code: 'INSUFFICIENT_BALANCE',
    status: 402,
    when: 'A prepaid account does not have enough balance to cover the request. Balance is reserved before the provider is called, so nothing is sent.',
    fix: 'Top up in the dashboard. The error carries required and currency so you can alert on the shortfall.'
  },
  {
    code: 'RATE_LIMIT_EXCEEDED',
    status: 429,
    when: 'You exceeded a per-minute, per-hour, per-day or per-month limit for your plan, either globally or for one service.',
    fix: 'Back off and retry after retryAfter seconds. The response also carries Retry-After and X-RateLimit-* headers.'
  },
  {
    code: 'REQUEST_IN_PROGRESS',
    status: 409,
    when: 'Another request with the same idempotency_key is still in flight for this account.',
    fix: 'Wait and retry the same key — once the first request finishes, replaying the key returns its stored response with X-Idempotent-Replay: true. Use a fresh key for a genuinely new message.'
  }
];

type ServiceRow = {
  code: string;
  statuses: number[];
  service: string;
  description: string;
  retry: 'yes' | 'no' | 'conditional';
};

const serviceErrors: ServiceRow[] = [
  {
    code: 'SMS_SEND_FAILED',
    statuses: [400, 503],
    service: 'SMS',
    description: '400 when the carrier rejected this specific message (unverified sender ID, blocked or opted-out recipient) — the message explains what to change. 503 when the carrier itself is failing.',
    retry: 'conditional'
  },
  {
    code: 'EMAIL_SEND_FAILED',
    statuses: [400, 503],
    service: 'Email',
    description: '400 when the mail service rejected the message and returned a reason. 503 when the mail service is unreachable or erroring.',
    retry: 'conditional'
  },
  {
    code: 'PURCHASE_FAILED',
    statuses: [400, 503],
    service: 'Data / Airtime',
    description: 'The provider declined the purchase. 400 carries provider_message with the exact reason (out of stock, invalid bundle, operator rejected). 503 means the provider is degraded.',
    retry: 'conditional'
  },
  {
    code: 'DATA_PURCHASE_FAILED',
    statuses: [503],
    service: 'Data',
    description: 'An unexpected failure inside the data purchase flow. The reservation is refunded and the idempotency lock released before the error is returned.',
    retry: 'yes'
  },
  {
    code: 'AIRTIME_PURCHASE_FAILED',
    statuses: [503],
    service: 'Airtime',
    description: 'An unexpected failure inside the airtime purchase flow. The reservation is refunded and the idempotency lock released before the error is returned.',
    retry: 'yes'
  },
  {
    code: 'PROVIDER_ERROR',
    statuses: [502],
    service: 'Data / Airtime',
    description: 'SendComms could not reach the upstream provider at all (connection failure or timeout). Nothing was charged.',
    retry: 'yes'
  },
  {
    code: 'SERVICE_UNAVAILABLE',
    statuses: [503],
    service: 'All',
    description: 'The requested service is not currently available on this deployment — for example the email, data or airtime provider is not configured.',
    retry: 'no'
  },
  {
    code: 'INTERNAL_ERROR',
    statuses: [500],
    service: 'All',
    description: 'An unhandled error. The message is always "Internal server error" — details are logged on our side, never returned.',
    retry: 'yes'
  }
];

const examples = [
  {
    code: 'UNAUTHORIZED',
    status: 401,
    description: 'Invalid or missing API key',
    example: `{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key",
    "docs_url": "https://docs.sendcomms.com/docs/errors#client-error-codes"
  }
}`
  },
  {
    code: 'MISSING_FIELD',
    status: 400,
    description: 'A required field is missing',
    example: `{
  "success": false,
  "error": {
    "code": "MISSING_FIELD",
    "message": "Missing required field: to",
    "docs_url": "https://docs.sendcomms.com/docs/errors#client-error-codes"
  }
}`
  },
  {
    code: 'INVALID_REQUEST',
    status: 400,
    description: 'Body parsed, but failed validation',
    example: `{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request body",
    "errors": [
      {
        "type": "string_type",
        "loc": ["message"],
        "msg": "Input should be a valid string"
      }
    ],
    "docs_url": "https://docs.sendcomms.com/docs/errors#client-error-codes"
  }
}`
  },
  {
    code: 'UNVERIFIED_SENDER_DOMAIN',
    status: 400,
    description: 'The from domain is not verified on your account',
    example: `{
  "success": false,
  "error": {
    "code": "UNVERIFIED_SENDER_DOMAIN",
    "message": "The \\"from\\" domain \\"example.com\\" is not verified for your account. Verify it under Domains, or omit \\"from\\" to use your default sender.",
    "provided_from": "Acme <hello@example.com>",
    "provided_domain": "example.com",
    "docs_url": "https://docs.sendcomms.com/docs/errors#client-error-codes"
  }
}`
  },
  {
    code: 'INSUFFICIENT_BALANCE',
    status: 402,
    description: 'Not enough prepaid balance to cover the request',
    example: `{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance. Please add funds to your account.",
    "required": 0.035,
    "currency": "USD",
    "docs_url": "https://docs.sendcomms.com/docs/errors#client-error-codes"
  }
}`
  },
  {
    code: 'RATE_LIMIT_EXCEEDED',
    status: 429,
    description: 'Too many requests for your plan',
    example: `{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "limit": 5,
    "remaining": 0,
    "reset": 1766452500,
    "retryAfter": 39,
    "docs_url": "https://docs.sendcomms.com/docs/errors#client-error-codes"
  }
}`
  },
  {
    code: 'REQUEST_IN_PROGRESS',
    status: 409,
    description: 'The same idempotency_key is still in flight',
    example: `{
  "success": false,
  "error": {
    "code": "REQUEST_IN_PROGRESS",
    "message": "Request is being processed. Please wait.",
    "docs_url": "https://docs.sendcomms.com/docs/errors"
  }
}`
  },
  {
    code: 'SMS_SEND_FAILED',
    status: 503,
    description: 'The carrier is failing — safe to retry',
    example: `{
  "success": false,
  "error": {
    "code": "SMS_SEND_FAILED",
    "message": "Failed to send SMS. Please try again in a few minutes.",
    "transaction_id": "sms_mfa1x2y_9c4d1e2f3a4b",
    "docs_url": "https://docs.sendcomms.com/docs/errors#service-error-codes"
  }
}`
  }
];

const getStatusColor = (status: number) => {
  if (status >= 500) return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
  if (status >= 400) return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' };
  return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' };
};

function StatusPill({ status }: { status: number }) {
  const colors = getStatusColor(status);
  return (
    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-bold border ${colors.border}`}>
      {status}
    </span>
  );
}

function ErrorTable({ title, subtitle, rows }: { title: string; subtitle: string; rows: ErrorRow[] }) {
  return (
    <div className="mb-6">
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{subtitle}</p>
      <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="border-b border-white/10">
              <tr className="text-left text-gray-400">
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Code</th>
                <th className="py-3 px-4 font-medium">When it happens</th>
                <th className="py-3 px-4 font-medium">How to fix it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row, index) => (
                <tr key={row.code} className={index % 2 === 1 ? 'bg-[#0b0c0e]' : ''}>
                  <td className="py-3 px-4 align-top"><StatusPill status={row.status} /></td>
                  <td className="py-3 px-4 align-top"><code className="text-white font-mono text-xs whitespace-nowrap">{row.code}</code></td>
                  <td className="py-3 px-4 text-gray-400 align-top">{row.when}</td>
                  <td className="py-3 px-4 text-gray-400 align-top">{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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
        Every error carries a stable machine-readable <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">code</code> and
        a <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">docs_url</code> that links straight back to this page.
      </p>

      {/* Error Response Structure */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-4">Error Response Structure</h2>
        <p className="text-gray-400 text-sm mb-4">
          All error responses follow a consistent structure. Any extra context an error carries is flattened
          alongside <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">code</code> and <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">message</code> —
          it is never nested under a <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">details</code> object.
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="px-4 py-2 bg-[#1a1c20] border-b border-white/5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">ERROR RESPONSE FORMAT</span>
          </div>
          <div className="p-4">
            <pre className="font-mono text-xs leading-relaxed bg-[#0b0c0e] p-4 rounded border border-white/5 overflow-x-auto">
              <code className="text-gray-300">{`{
  "success": false,             // always false on an error
  "error": {
    "code": "ERROR_CODE",       // machine-readable, stable
    "message": "Human-readable description",
    "transaction_id": "sms_...", // when the request reached a transaction
    "docs_url": "https://docs.sendcomms.com/docs/errors#client-error-codes"
  }
}`}</code>
            </pre>
          </div>
        </div>
        <div className="mt-4 bg-[#121316] border border-white/10 rounded-xl p-5">
          <h4 className="text-white font-medium mb-2 text-sm">Fields you can rely on</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">code</code> and
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded ml-1.5">message</code> are present on every error.
            </li>
            <li>
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">docs_url</code> is present on every error. Codes documented
              on this page link directly to their section anchor; anything else links to the top of this page.
            </li>
            <li>
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">transaction_id</code> (or
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded ml-1.5">batch_id</code>) appears once a transaction record exists —
              log it, it is what support needs to trace the request.
            </li>
            <li>
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">error_id</code> appears on unexpected 503s and identifies the
              recorded incident on our side.
            </li>
            <li>
              Context fields vary by code: <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">required</code> and
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded ml-1.5">currency</code> on balance errors,
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded ml-1.5">limit</code>/<code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">remaining</code>/<code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">reset</code>/<code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">retryAfter</code> on rate limits,
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded ml-1.5">errors</code> on validation failures, and
              <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded ml-1.5">provider_message</code> on declined purchases.
            </li>
          </ul>
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
                <td className="py-3 px-4 text-gray-400">Data or airtime purchase created</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><StatusPill status={400} /></td>
                <td className="py-3 px-4 text-white">Bad Request</td>
                <td className="py-3 px-4 text-gray-400">Invalid parameters, or the provider rejected this specific message</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><StatusPill status={401} /></td>
                <td className="py-3 px-4 text-white">Unauthorized</td>
                <td className="py-3 px-4 text-gray-400">Invalid or missing API key</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><StatusPill status={402} /></td>
                <td className="py-3 px-4 text-white">Payment Required</td>
                <td className="py-3 px-4 text-gray-400">Insufficient account balance</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><StatusPill status={403} /></td>
                <td className="py-3 px-4 text-white">Forbidden</td>
                <td className="py-3 px-4 text-gray-400">Account suspended</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><StatusPill status={404} /></td>
                <td className="py-3 px-4 text-white">Not Found</td>
                <td className="py-3 px-4 text-gray-400">Transaction or resource not found</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><StatusPill status={409} /></td>
                <td className="py-3 px-4 text-white">Conflict</td>
                <td className="py-3 px-4 text-gray-400">A request with the same idempotency_key is still in progress</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><StatusPill status={429} /></td>
                <td className="py-3 px-4 text-white">Too Many Requests</td>
                <td className="py-3 px-4 text-gray-400">Rate limit exceeded</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><StatusPill status={500} /></td>
                <td className="py-3 px-4 text-white">Internal Server Error</td>
                <td className="py-3 px-4 text-gray-400">Unexpected server error</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><StatusPill status={502} /></td>
                <td className="py-3 px-4 text-white">Bad Gateway</td>
                <td className="py-3 px-4 text-gray-400">Could not reach the upstream data or airtime provider</td>
              </tr>
              <tr className="bg-[#0b0c0e]">
                <td className="py-3 px-4"><StatusPill status={503} /></td>
                <td className="py-3 px-4 text-white">Service Unavailable</td>
                <td className="py-3 px-4 text-gray-400">Service temporarily unavailable or not configured</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Errors */}
      <div className="mb-10 scroll-mt-24" id="client-error-codes">
        <h2 className="text-xl font-semibold text-white mb-4">Client Error Codes</h2>
        <p className="text-gray-400 text-sm mb-6">
          These errors mean something about the request needs to change. Retrying an identical request will fail
          identically, so fix the request first. All validation runs before any balance is reserved or any
          rate-limit or idempotency state is consumed — a rejected request never costs you anything.
        </p>

        <ErrorTable
          title="Authentication and access"
          subtitle="Raised before the request body is even read."
          rows={authErrors}
        />

        <ErrorTable
          title="Request format"
          subtitle="The body could not be parsed, or is missing something the endpoint requires."
          rows={requestErrors}
        />

        <ErrorTable
          title="Field validation"
          subtitle="The request is well formed, but a value is not something SendComms can send."
          rows={fieldErrors}
        />

        <ErrorTable
          title="Billing, limits and concurrency"
          subtitle="Your request is valid, but your account state or request rate blocks it right now."
          rows={limitErrors}
        />

        <h3 className="text-white font-medium mb-3 mt-8">Examples</h3>
        <div className="space-y-4">
          {examples.map((error) => {
            const colors = getStatusColor(error.status);
            return (
              <div key={error.code} className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-[#1a1c20] border-b border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-bold border ${colors.border}`}>
                      {error.status}
                    </span>
                    <code className="text-white font-mono text-sm">{error.code}</code>
                  </div>
                  <span className="text-gray-500 text-xs text-right">{error.description}</span>
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
      <div className="mb-10 scroll-mt-24" id="service-error-codes">
        <h2 className="text-xl font-semibold text-white mb-4">Service Error Codes</h2>
        <p className="text-gray-400 text-sm mb-4">
          These errors come from the carriers, mail infrastructure and top-up providers behind SendComms, or from
          SendComms itself. When a send or purchase fails, any reserved balance is refunded and the idempotency lock
          is released before the error is returned — so the same key can be retried safely.
        </p>
        <div className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
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
                {serviceErrors.map((error, index) => (
                  <tr key={error.code} className={index % 2 === 1 ? 'bg-[#0b0c0e]' : ''}>
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-1.5">
                        {error.statuses.map((status) => (
                          <StatusPill key={status} status={status} />
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top">
                      <code className="text-white font-mono text-xs whitespace-nowrap">{error.code}</code>
                    </td>
                    <td className="py-3 px-4 text-white align-top whitespace-nowrap">{error.service}</td>
                    <td className="py-3 px-4 text-gray-400 align-top">{error.description}</td>
                    <td className="py-3 px-4 align-top">
                      {error.retry === 'yes' && (
                        <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20 whitespace-nowrap">Yes</span>
                      )}
                      {error.retry === 'no' && (
                        <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-xs border border-red-500/20 whitespace-nowrap">No</span>
                      )}
                      {error.retry === 'conditional' && (
                        <span className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded text-xs border border-orange-500/20 whitespace-nowrap">On 503</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-blue-400 font-medium text-sm">Reading a 400 vs a 503 on the same code</h4>
              <p className="text-blue-200/70 text-sm mt-1">
                <code className="text-blue-400">SMS_SEND_FAILED</code>, <code className="text-blue-400">EMAIL_SEND_FAILED</code> and{' '}
                <code className="text-blue-400">PURCHASE_FAILED</code> use the HTTP status to tell you what to do.
                A <strong className="text-blue-300">400</strong> means the provider rejected this particular message and the
                message text says why — retrying unchanged will fail again. A <strong className="text-blue-300">503</strong> means the
                provider is having trouble: wait a few seconds and retry, reusing the same{' '}
                <code className="text-blue-400">idempotency_key</code> so you cannot double-send.
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
                  programmatic handling rather than parsing error messages. Message wording can change; codes do not.
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
                  retrying failed requests to prevent duplicate processing. A retry that arrives while the first attempt is still
                  running returns <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">REQUEST_IN_PROGRESS</code> (409);
                  one that arrives after it finished replays the original response with an{' '}
                  <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">X-Idempotent-Replay: true</code> header.
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
                  For rate limit (429), bad gateway (502) and service unavailable (503) errors, implement exponential backoff
                  starting with a 1-second delay and doubling each retry. On a 429, prefer the{' '}
                  <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">Retry-After</code> header when it is present.
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
                  Always log the <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">transaction_id</code>,{' '}
                  <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">batch_id</code> or{' '}
                  <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">error_id</code> from error responses.
                  This helps support quickly identify and resolve issues.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#121316] border border-white/10 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-sm">5</span>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Follow the docs_url</h4>
                <p className="text-gray-400 text-sm">
                  Every error includes a <code className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">docs_url</code> pointing
                  at the section of this page that explains it. Surfacing that link in your own logs and dashboards saves your team
                  the lookup.
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
    const response = await fetch('https://api.sendcomms.com/api/v1/sms/send', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to, message, idempotency_key: idempotencyKey })
    });

    const data = await response.json();
    if (response.ok) return data; // Success

    const code = data.error?.code;

    // 409: the first attempt is still running - wait, then retry the SAME key
    // 429/502/503: transient - back off and retry
    const retryable =
      code === 'REQUEST_IN_PROGRESS' ||
      response.status === 429 ||
      response.status === 502 ||
      response.status === 503;

    // Anything else (validation, balance, unverified sender) will fail
    // identically on retry - fix the request instead.
    if (!retryable || attempt === maxRetries) {
      throw new Error(\`\${code}: \${data.error?.message} (\${data.error?.docs_url})\`);
    }

    const retryAfter = Number(response.headers.get('Retry-After'));
    const delay = retryAfter ? retryAfter * 1000 : Math.pow(2, attempt) * 1000;
    await new Promise(r => setTimeout(r, delay));
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
