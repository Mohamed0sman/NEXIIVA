/**
 * NEXIIVA Contact & Subscription Request Dispatcher
 * Directly dispatches enterprise intake requests to Eng. Mostafa Adel:
 * Mostafa.adel.esmaiel@gmail.com
 */

export const RECIPIENT_EMAIL = 'Mostafa.adel.esmaiel@gmail.com';

export interface SubscriptionFormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  targetUnit: string;
  deploymentPreference: string;
  source?: 'Subscription Form' | 'Pilot Drawer';
}

export function buildEmailContent(data: SubscriptionFormData) {
  const subject = `[NEXIIVA Request] New ${data.source || 'Subscription'} from ${data.fullName || 'Client'} (${data.company || 'Plant'})`;

  const body = `مرحباً م. مصطفى،

تم استلام طلب جديد عبر منصة نكسيفا (NEXIIVA Platform):
--------------------------------------------------------
الاسم والمنصب: ${data.fullName}
الشركة / المصفاة: ${data.company}
البريد الإلكتروني للعمل: ${data.email}
الهاتف / واتساب: ${data.phone}
الوحدة المستهدفة: ${data.targetUnit}
نموذج وبيئة النشر: ${data.deploymentPreference}
مصدر الطلب: ${data.source || 'Subscription Form'}
التوقيت: ${new Date().toLocaleString('ar-EG')} (${new Date().toISOString()})
--------------------------------------------------------

Technical & Subscription Intake Desk
NEXIIVA Process Operator Training Simulator`;

  const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Clean phone number for WhatsApp message
  const rawPhone = data.phone.replace(/[^\d+]/g, '');
  const whatsappText = `مرحباً م. مصطفى عادل، أنا ${data.fullName} من ${data.company}. أود الاستفسار عن محاكي نكسيفا لوحدة ${data.targetUnit}. البريد الإلكتروني: ${data.email} والهاتف: ${data.phone}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;

  return {
    subject,
    body,
    mailtoUrl,
    whatsappUrl,
  };
}

export async function dispatchFormSubmission(data: SubscriptionFormData): Promise<{
  mailtoUrl: string;
  whatsappUrl: string;
  body: string;
}> {
  const { subject, body, mailtoUrl, whatsappUrl } = buildEmailContent(data);

  // Attempt background fetch via FormSubmit to ensure Mostafa receives direct notification
  try {
    fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: data.email,
        name: data.fullName,
        company: data.company,
        email: data.email,
        phone: data.phone,
        target_unit: data.targetUnit,
        deployment: data.deploymentPreference,
        source: data.source || 'NEXIIVA Website',
        message: body,
      }),
    }).catch(() => {
      // Background catch - mailto and UI guarantee delivery
    });
  } catch {
    // Silent catch
  }

  // Trigger mailto immediately in the user's browser so their email client pops open with all pre-filled details
  try {
    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch {
    window.location.href = mailtoUrl;
  }

  return { mailtoUrl, whatsappUrl, body };
}
