/**
 * NEXIIVA Contact & Subscription Request Dispatcher
 * Directly dispatches enterprise intake requests to Eng. Mostafa Adel:
 * Email: Mostafa.adel.esmaiel@gmail.com
 * WhatsApp: 01004131154 (+201004131154)
 */

export const RECIPIENT_EMAIL = 'Mostafa.adel.esmaiel@gmail.com';
export const RECIPIENT_WHATSAPP_PHONE = '201004131154'; // 01004131154
export const RECIPIENT_DISPLAY_PHONE = '01004131154';
export const RECIPIENT_INTL_PHONE = '+20 100 413 1154';

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

  const whatsappText = `مرحباً م. مصطفى عادل، تم تقديم طلب جديد عبر منصة نكسيفا (NEXIIVA):
----------------------------------------
*الاسم*: ${data.fullName || 'غير محدد'}
*الشركة / المصفاة*: ${data.company || 'غير محدد'}
*البريد الإلكتروني*: ${data.email || 'غير محدد'}
*الهاتف*: ${data.phone || 'غير محدد'}
*الوحدة المستهدفة*: ${data.targetUnit}
*نموذج النشر*: ${data.deploymentPreference}
*مصدر الطلب*: ${data.source || 'نموذج المنصة'}
*التاريخ*: ${new Date().toLocaleString('ar-EG')}
----------------------------------------
نود التنسيق معكم لمناقشة المتطلبات وتحديد موعد الجلسة الاستكشافية.`;

  const whatsappUrl = `https://wa.me/${RECIPIENT_WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappText)}`;

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

  // Attempt background fetch via FormSubmit to ensure Mostafa receives direct email notification
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
      // Background catch
    });
  } catch {
    // Silent catch
  }

  // Open WhatsApp directly with pre-filled message directed to 01004131154
  try {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  } catch {
    // Popup blocker fallback handled by the prominent WhatsApp CTA button
  }

  return { mailtoUrl, whatsappUrl, body };
}

