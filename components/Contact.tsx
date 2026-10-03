import { SITE, type Dictionary, type Lang } from '../content';
import { Icon } from '../icons';

const inputClass =
  'w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-accent focus:border-accent outline-none';
const labelClass = 'block text-xs font-bold uppercase text-slate-300 mb-2';

export default function Contact({ lang, t }: { lang: Lang; t: Dictionary }) {
  const f = t.contact.form;
  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 bg-white scroll-mt-24" id="contact" aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 lg:p-20 text-white relative overflow-hidden bg-primary">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px]" aria-hidden="true"></div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
            <div>
              <h2 id="contact-title" className="text-3xl md:text-4xl font-black mb-8">{t.contact.title}</h2>
              <p className="text-slate-300 mb-12 text-lg">
                <span className="block">{SITE.legalNameUpper}</span>
                <span className="block">
                  {t.contact.taxLabel}: {SITE.taxId}
                </span>
              </p>

              <ul className="space-y-8">
                <li className="flex items-center gap-6">
                  <span className="w-12 h-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center">
                    <Icon name="mail" className="w-6 h-6 text-accent" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-300 uppercase font-bold">{t.contact.emailLabel}</span>
                    <a href={`mailto:${SITE.email}`} className="font-bold hover:underline break-all">
                      {SITE.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-6">
                  <span className="w-12 h-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center">
                    <Icon name="call" className="w-6 h-6 text-accent" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-300 uppercase font-bold">{t.contact.phoneLabel}</span>
                    <a href={`tel:${SITE.phoneE164}`} className="font-bold hover:underline">
                      {SITE.phoneDisplay[lang]}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-6">
                  <span className="w-12 h-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center">
                    <Icon name="location_on" className="w-6 h-6 text-accent" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-300 uppercase font-bold">{t.contact.addressLabel}</span>
                    <span className="font-bold">{SITE.address[lang]}</span>
                  </span>
                </li>
              </ul>
            </div>

            <form
              id="contact-form"
              method="post"
              action="/api/sendInquiry"
              className="relative space-y-6 bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10"
              data-msg-sending={f.sending}
              data-msg-success={f.success}
              data-msg-error={f.error}
            >
              <input type="hidden" name="lang" value={lang} />
              {/* Ô bẫy chống thư rác: người thật không nhìn thấy nên luôn để trống */}
              <div className="absolute -left-[10000px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="hp_field">{f.honeypot}</label>
                <input id="hp_field" type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>{f.name}</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    autoComplete="name"
                    className={inputClass}
                    placeholder={f.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>{f.email}</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    className={inputClass}
                    placeholder={f.emailPlaceholder}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className={labelClass}>{f.message}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={5}
                  className={inputClass + ' h-32'}
                  placeholder={f.messagePlaceholder}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-accent-ink hover:bg-[#0052AB] disabled:opacity-60 disabled:cursor-not-allowed p-4 rounded-xl font-bold transition-colors"
              >
                {f.submit}
              </button>

              {/* Thông báo khi gửi bằng JavaScript */}
              <p
                data-status
                role="status"
                aria-live="polite"
                hidden
                className="rounded-xl border px-4 py-3 text-sm font-semibold data-[state=success]:border-emerald-400/40 data-[state=success]:bg-emerald-400/10 data-[state=success]:text-emerald-100 data-[state=error]:border-red-400/40 data-[state=error]:bg-red-400/10 data-[state=error]:text-red-100"
              ></p>
              {/* Thông báo khi trình duyệt không chạy JavaScript (máy chủ chuyển về #contact-sent / #contact-failed) */}
              <p
                id="contact-sent"
                className="hidden target:block rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100"
              >
                {f.success}
              </p>
              <p
                id="contact-failed"
                className="hidden target:block rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100"
              >
                {f.error}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
