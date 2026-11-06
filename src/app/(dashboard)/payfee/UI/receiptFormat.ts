import logo from "@/assets/logo.png";
import { FeeReceipt } from "../Controller/payfee";

export const receiptNo = (id: number) => `PC-${String(id).padStart(5, '0')}`;

// paymentDate is stored as a plain date (UTC midnight), so format in UTC to avoid day shifts
export const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-IN', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' });

export const formatAmount = (amount: number) => amount.toLocaleString('en-IN');

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
    'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const belowHundred = (n: number) => n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]} ${ONES[n % 10]}`.trim();

const belowThousand = (n: number) => {
    const h = Math.floor(n / 100);
    const rest = n % 100;
    return [h ? `${ONES[h]} Hundred` : '', rest ? belowHundred(rest) : ''].filter(Boolean).join(' ');
}

// Indian numbering: crore / lakh / thousand
export const amountInWords = (amount: number) => {
    if (amount === 0) return 'Zero Rupees Only';
    const parts: string[] = [];
    const crore = Math.floor(amount / 10000000);
    const lakh = Math.floor((amount % 10000000) / 100000);
    const thousand = Math.floor((amount % 100000) / 1000);
    const rest = amount % 1000;
    if (crore) parts.push(`${belowThousand(crore)} Crore`);
    if (lakh) parts.push(`${belowHundred(lakh)} Lakh`);
    if (thousand) parts.push(`${belowHundred(thousand)} Thousand`);
    if (rest) parts.push(belowThousand(rest));
    return `${parts.join(' ')} Rupees Only`;
}

const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

// Opens a clean window with only the receipt and prints it,
// so the dashboard navbar / sidebar never end up on paper.
export const printReceipt = (receipt: FeeReceipt) => {
    const win = window.open('', '_blank', 'width=800,height=900');
    if (!win) {
        alert('Please allow pop-ups for this site to print the receipt.');
        return;
    }

    const logoUrl = new URL(logo.src, window.location.origin).href;
    const rows = [
        ['Receipt No.', receiptNo(receipt.id)],
        ['Date of Payment', formatDate(receipt.paymentDate)],
        ['Name', receipt.name],
        ['User ID', receipt.userId || '-'],
        ['Phone Number', receipt.phoneNumber || '-'],
        ...(receipt.comment ? [['Comment', receipt.comment]] : []),
    ];

    win.document.write(`<!DOCTYPE html>
<html>
<head>
<title>Fee Receipt ${receiptNo(receipt.id)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 32px; color: #1f2937; }
  .receipt { max-width: 640px; margin: 0 auto; border: 2px solid #1c3f3a; border-radius: 12px; overflow: hidden; }
  .head { display: flex; align-items: center; gap: 16px; padding: 20px 24px; border-bottom: 2px solid #1c3f3a; }
  .head img { width: 80px; height: auto; }
  .head h1 { margin: 0; font-size: 24px; color: #1c3f3a; }
  .head p { margin: 4px 0 0; font-size: 13px; color: #4b5563; }
  .title { text-align: center; font-weight: bold; letter-spacing: 3px; padding: 10px; background: #1c3f3a; color: #fff;
           -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 12px 24px; border-bottom: 1px solid #e5e7eb; font-size: 15px; }
  td:first-child { color: #4b5563; width: 40%; }
  td:last-child { font-weight: bold; }
  .amount { padding: 20px 24px; text-align: center; }
  .amount .value { font-size: 32px; font-weight: bold; color: #1c3f3a; }
  .amount .words { font-size: 13px; color: #4b5563; margin-top: 4px; }
  .foot { display: flex; justify-content: space-between; align-items: flex-end; padding: 40px 24px 20px; font-size: 13px; color: #4b5563; }
  .sign { border-top: 1px solid #1f2937; padding-top: 6px; min-width: 180px; text-align: center; }
  @page { margin: 12mm; }
</style>
</head>
<body>
  <div class="receipt">
    <div class="head">
      <img src="${logoUrl}" alt="The Path Catalyst" />
      <div>
        <h1>The Path Catalyst</h1>
        <p>Library</p>
      </div>
    </div>
    <div class="title">FEE RECEIPT</div>
    <table>
      ${rows.map(([label, value]) => `<tr><td>${label}</td><td>${escapeHtml(value)}</td></tr>`).join('')}
    </table>
    <div class="amount">
      <div>Amount Received</div>
      <div class="value">Rs. ${formatAmount(receipt.amount)}</div>
      <div class="words">${amountInWords(receipt.amount)}</div>
    </div>
    <div class="foot">
      <div>This is a computer generated receipt.</div>
      <div class="sign">Authorised Signatory</div>
    </div>
  </div>
  <script>
    window.onload = function () { window.focus(); window.print(); };
    window.onafterprint = function () { window.close(); };
  </script>
</body>
</html>`);
    win.document.close();
}
