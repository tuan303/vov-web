// JavaScript duy nhất chạy trên trình duyệt (vài KB): gửi biểu mẫu liên hệ không cần tải lại trang.
// Nếu trình duyệt quá cũ hoặc tắt JavaScript, biểu mẫu vẫn gửi được theo cách thông thường.
import './styles.css';

const form = document.getElementById('contact-form') as HTMLFormElement | null;

if (form && typeof window.fetch === 'function') {
  const status = form.querySelector<HTMLElement>('[data-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const idleLabel = button?.textContent ?? '';
  const msg = form.dataset;

  const show = (state: 'success' | 'error' | '', text: string) => {
    if (!status) return;
    status.textContent = text;
    status.dataset.state = state;
    status.hidden = !text;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!button || button.disabled) return;

    const data: Record<string, string> = {};
    new FormData(form).forEach((value, key) => {
      data[key] = typeof value === 'string' ? value : '';
    });

    button.disabled = true;
    button.textContent = msg.msgSending ?? idleLabel;
    show('', '');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result && result.ok) {
        form.reset();
        show('success', msg.msgSuccess ?? '');
      } else {
        show('error', msg.msgError ?? '');
      }
    } catch {
      show('error', msg.msgError ?? '');
    } finally {
      button.disabled = false;
      button.textContent = idleLabel;
    }
  });
}
