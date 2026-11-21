import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { validateInquiry } from '../utils/validate';
import { useContent } from '../content/ContentContext';

const EMPTY = { name: '', email: '', company: '', service: '', budget: '', message: '', consent: false, website: '' };
const BUDGETS = ['Not sure yet', 'Under PKR 100k / $350', 'PKR 100k to 300k / $350 to $1,000', 'PKR 300k+ / $1,000+'];

export default function ContactForm() {
  const { liveServices, site } = useContent();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validateInquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-status success" role="status">
        <Icon name="check" size={28} />
        <h3>Thank you, your inquiry has been sent.</h3>
        <p>We will reply {site.responseTime}. For anything urgent, message us on WhatsApp.</p>
        <Button variant="ghost" onClick={() => setStatus('idle')}>Send another inquiry</Button>
      </div>
    );
  }

  const mailtoBody = encodeURIComponent(
    `Name: ${values.name}\nCompany: ${values.company}\nService: ${values.service}\nBudget: ${values.budget}\n\n${values.message}`,
  );

  const field = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });
  const err = (name) => errors[name] && <p className="field-error" id={`e-${name}`}>{errors[name]}</p>;

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Your name <span aria-hidden="true">*</span></label>
          <input type="text" autoComplete="name" required {...field('name')} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="f-email">Email <span aria-hidden="true">*</span></label>
          <input type="email" autoComplete="email" required {...field('email')} />
          {err('email')}
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="f-company">Company <span className="opt">(optional)</span></label>
          <input type="text" autoComplete="organization" {...field('company')} />
        </div>
        <div className="field">
          <label htmlFor="f-service">Service needed <span aria-hidden="true">*</span></label>
          <select required {...field('service')}>
            <option value="">Choose a service</option>
            {liveServices.map((s) => <option key={s.slug}>{s.title}</option>)}
            <option>Something else</option>
          </select>
          {err('service')}
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-budget">Estimated budget <span className="opt">(optional)</span></label>
        <select {...field('budget')}>
          <option value="">Prefer not to say</option>
          {BUDGETS.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-message">Project details <span aria-hidden="true">*</span></label>
        <textarea rows={6} required placeholder="What are you building, who is it for, and when do you need it?" {...field('message')} />
        {err('message')}
      </div>
      {/* Honeypot: hidden from people, bots tend to fill it. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input type="text" id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
      </div>
      <div className="field checkbox">
        <input type="checkbox" {...field('consent')} checked={values.consent} value={undefined} />
        <label htmlFor="f-consent">
          I agree that ASoftix may use these details to reply to my inquiry, as described in the <Link to="/privacy">privacy notice</Link>.
        </label>
      </div>
      {err('consent')}

      {status === 'error' && (
        <div className="form-status error" role="alert">
          <p><strong>Sorry, the form could not be sent.</strong> Please try again, or send your inquiry by email instead.</p>
          <a className="btn btn-ghost btn-sm" href={`mailto:${site.email}?subject=${encodeURIComponent('Project inquiry')}&body=${mailtoBody}`}>
            Open in email app
          </a>
        </div>
      )}

      <Button type="submit" disabled={status === 'sending'} icon={status === 'sending' ? undefined : 'arrow'}>
        {status === 'sending' ? 'Sending…' : 'Send inquiry'}
      </Button>
    </form>
  );
}
