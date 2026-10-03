// Kiểm thử hàm gửi liên hệ (api/sendInquiry.ts) bằng dữ liệu mẫu.
// Không gửi email thật: mọi lệnh gọi tới Microsoft được giả lập.
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import https from 'node:https';
import handler from '../api/sendInquiry.ts';

const realRequest = https.request;
let calls;
let graphPlan; // trạng thái trả về giả lập: { token: 200, send: 202 }

beforeEach(() => {
  calls = [];
  graphPlan = { token: 200, send: 202 };
  Object.assign(process.env, {
    MS_GRAPH_TENANT_ID: 'tenant-mau',
    MS_GRAPH_CLIENT_ID: 'client-mau',
    MS_GRAPH_CLIENT_SECRET: 'secret-mau',
    MS_GRAPH_SENDER: 'admin@vovsmart.net',
    CONTACT_RECIPIENT: 'sales@vovsmart.net',
  });
  https.request = (url, options, callback) => {
    const req = new EventEmitter();
    let body = '';
    req.write = (chunk) => { body += chunk; };
    req.end = () => {
      calls.push({ url: String(url), headers: options.headers, body });
      const isToken = String(url).includes('/oauth2/v2.0/token');
      const res = new EventEmitter();
      res.statusCode = isToken ? graphPlan.token : graphPlan.send;
      res.setEncoding = () => {};
      callback(res);
      res.emit('data', isToken ? JSON.stringify({ access_token: 'token-mau' }) : '');
      res.emit('end');
    };
    return req;
  };
});

afterEach(() => {
  https.request = realRequest;
});

const makeReq = ({ method = 'POST', headers = {}, body = '' } = {}) => {
  const req = Readable.from(body ? [Buffer.from(body)] : []);
  req.method = method;
  req.headers = headers;
  return req;
};

const makeRes = () => ({
  statusCode: 200,
  headers: {},
  body: '',
  setHeader(key, value) { this.headers[key.toLowerCase()] = value; },
  end(chunk) { this.body = chunk ? String(chunk) : ''; },
  json() { return JSON.parse(this.body); },
});

const sample = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  message: 'Cần tư vấn hệ thống BMS cho tòa nhà 12 tầng.\nXin gọi lại <script>alert(1)</script>',
  lang: 'vi',
  hp_field: '',
};

const postJson = (data) =>
  makeReq({ headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
const postForm = (data) =>
  makeReq({ headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() });

test('từ chối phương thức GET (405)', async () => {
  const res = makeRes();
  await handler(makeReq({ method: 'GET' }), res);
  assert.equal(res.statusCode, 405);
  assert.equal(calls.length, 0);
});

test('thiếu trường bắt buộc → 400, không gửi email', async () => {
  const res = makeRes();
  await handler(postJson({ ...sample, message: '   ' }), res);
  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.json(), { ok: false, error: 'Missing required fields' });
  assert.equal(calls.length, 0);
});

test('email sai định dạng → 400, không gửi email', async () => {
  const res = makeRes();
  await handler(postJson({ ...sample, email: 'nguyenvana@' }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, 'Invalid email address');
  assert.equal(calls.length, 0);
});

test('nội dung JSON hỏng → 400', async () => {
  const res = makeRes();
  await handler(makeReq({ headers: { 'content-type': 'application/json' }, body: '{"name":' }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().error, 'Invalid request body');
});

test('JSON không phải object (null) → 400 thiếu trường, không lỗi máy chủ', async () => {
  const res = makeRes();
  await handler(makeReq({ headers: { 'content-type': 'application/json' }, body: 'null' }), res);
  assert.equal(res.statusCode, 400);
});

test('ô bẫy thư rác có dữ liệu → báo thành công nhưng KHÔNG gửi email', async () => {
  const res = makeRes();
  await handler(postJson({ ...sample, hp_field: 'http://spam.example' }), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.json(), { ok: true });
  assert.equal(calls.length, 0);
});

test('chưa cấu hình biến môi trường gửi mail → 500', async () => {
  delete process.env.MS_GRAPH_SENDER;
  const res = makeRes();
  await handler(postJson(sample), res);
  assert.equal(res.statusCode, 500);
  assert.equal(res.json().error, 'Email service is not configured.');
  assert.equal(calls.length, 0);
});

test('gửi thành công bằng JSON (trình duyệt có JavaScript)', async () => {
  const res = makeRes();
  await handler(postJson(sample), res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.json(), { ok: true });
  assert.equal(calls.length, 2, 'gọi lấy token rồi gửi mail');

  const [tokenCall, mailCall] = calls;
  assert.match(tokenCall.url, /login\.microsoftonline\.com\/tenant-mau\/oauth2\/v2\.0\/token/);
  assert.match(tokenCall.body, /client_id=client-mau/);

  assert.match(mailCall.url, /graph\.microsoft\.com\/v1\.0\/users\/admin%40vovsmart\.net\/sendMail/);
  assert.equal(mailCall.headers.Authorization, 'Bearer token-mau');
  const mail = JSON.parse(mailCall.body).message;
  assert.equal(mail.subject, 'New inquiry from Nguyễn Văn A');
  assert.equal(mail.toRecipients[0].emailAddress.address, 'sales@vovsmart.net');
  assert.equal(mail.replyTo[0].emailAddress.address, 'nguyenvana@example.com');
  assert.ok(mail.body.content.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'mã độc trong nội dung bị vô hiệu');
  assert.ok(!mail.body.content.includes('<script>alert(1)'), 'không chứa thẻ script thật');
  assert.ok(mail.body.content.includes('Vietnamese (/vi)'), 'ghi rõ khách gửi từ trang tiếng Việt');
  assert.ok(mail.body.content.includes('tòa nhà 12 tầng.<br>Xin gọi lại'), 'giữ xuống dòng');
});

test('biểu mẫu thường (không JavaScript), trang tiếng Việt → chuyển về /vi#contact-sent', async () => {
  const res = makeRes();
  await handler(postForm(sample), res);
  assert.equal(res.statusCode, 303);
  assert.equal(res.headers.location, '/vi#contact-sent');
  assert.equal(calls.length, 2);
});

test('biểu mẫu thường, trang tiếng Anh, Microsoft báo lỗi → chuyển về /#contact-failed', async () => {
  graphPlan.send = 500;
  const res = makeRes();
  await handler(postForm({ ...sample, lang: 'en' }), res);
  assert.equal(res.statusCode, 303);
  assert.equal(res.headers.location, '/#contact-failed');
});

test('biểu mẫu thường thiếu email → chuyển về #contact-failed, không gửi', async () => {
  const res = makeRes();
  await handler(postForm({ ...sample, email: '' }), res);
  assert.equal(res.statusCode, 303);
  assert.equal(res.headers.location, '/vi#contact-failed');
  assert.equal(calls.length, 0);
});

test('Vercel đã phân tích sẵn body thành object → vẫn xử lý đúng', async () => {
  const req = makeReq({ headers: { 'content-type': 'application/json' } });
  req.body = { ...sample, lang: 'en' };
  const res = makeRes();
  await handler(req, res);
  assert.equal(res.statusCode, 200);
  assert.ok(JSON.parse(calls[1].body).message.body.content.includes('English (/)'));
});

test('lấy token Microsoft thất bại → 500', async () => {
  graphPlan.token = 401;
  const res = makeRes();
  await handler(postJson(sample), res);
  assert.equal(res.statusCode, 500);
  assert.equal(res.json().error, 'Failed to send inquiry email');
  assert.equal(calls.length, 1);
});
