import logo from "@/assets/logo.png";
import { FeeReceipt } from "../Controller/payfee";
import { amountInWords, formatAmount, formatDate, receiptNo } from "./receiptFormat";

const GREEN: [number, number, number] = [28, 63, 58];   // #1c3f3a
const GRAY: [number, number, number] = [75, 85, 99];     // #4b5563
const DARK: [number, number, number] = [31, 41, 55];     // #1f2937
const LINE: [number, number, number] = [229, 231, 235];  // #e5e7eb

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
});

// Builds the receipt as an A4 PDF and saves it, matching the printed layout.
export const downloadReceipt = async (receipt: FeeReceipt) => {
    // loaded on demand so jspdf stays out of the main bundle
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const left = 20;
    const width = 170;
    const right = left + width;
    let y = 20;
    const top = y;

    // header: logo + name
    try {
        const img = await loadImage(logo.src);
        const logoW = 28;
        const logoH = (img.height / img.width) * logoW;
        doc.addImage(img, "PNG", left + 6, y + 5, logoW, logoH);
    } catch {
        // logo is optional, keep going without it
    }
    doc.setFont("helvetica", "bold").setFontSize(20).setTextColor(...GREEN);
    doc.text("The Path Catalyst", left + 40, y + 14);
    doc.setFont("helvetica", "normal").setFontSize(11).setTextColor(...GRAY);
    doc.text("Library", left + 40, y + 21);
    y += 28;

    // title bar
    doc.setFillColor(...GREEN).rect(left, y, width, 10, "F");
    doc.setFont("helvetica", "bold").setFontSize(12).setTextColor(255, 255, 255);
    doc.setCharSpace(1.5);
    doc.text("FEE RECEIPT", left + width / 2, y + 6.8, { align: "center" });
    doc.setCharSpace(0);
    y += 10;

    // detail rows
    const rows = [
        ["Receipt No.", receiptNo(receipt.id)],
        ["Date of Payment", formatDate(receipt.paymentDate)],
        ["Name", receipt.name],
        ["User ID", receipt.userId || "-"],
        ["Phone Number", receipt.phoneNumber || "-"],
    ];
    doc.setFontSize(12);
    for (const [label, value] of rows) {
        doc.setFont("helvetica", "normal").setTextColor(...GRAY);
        doc.text(label, left + 8, y + 8);
        doc.setFont("helvetica", "bold").setTextColor(...DARK);
        const lines = doc.splitTextToSize(value, width - 78);
        doc.text(lines, left + 70, y + 8);
        const rowH = 6 + lines.length * 5;
        y += rowH;
        doc.setDrawColor(...LINE).setLineWidth(0.3).line(left, y, right, y);
    }

    // amount block
    y += 10;
    doc.setFont("helvetica", "normal").setFontSize(12).setTextColor(...DARK);
    doc.text("Amount Received", left + width / 2, y, { align: "center" });
    y += 11;
    doc.setFont("helvetica", "bold").setFontSize(26).setTextColor(...GREEN);
    doc.text(`Rs. ${formatAmount(receipt.amount)}`, left + width / 2, y, { align: "center" });
    y += 7;
    doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...GRAY);
    doc.text(amountInWords(receipt.amount), left + width / 2, y, { align: "center", maxWidth: width - 16 });

    // footer
    y += 28;
    doc.setFontSize(10).setTextColor(...GRAY);
    doc.text("This is a computer generated receipt.", left + 8, y);
    doc.setDrawColor(...DARK).setLineWidth(0.3).line(right - 60, y - 5, right - 8, y - 5);
    doc.text("Authorised Signatory", right - 34, y, { align: "center" });
    y += 8;

    // outer rounded border
    doc.setDrawColor(...GREEN).setLineWidth(0.7).roundedRect(left, top, width, y - top, 3, 3, "S");
    // line under header
    doc.line(left, top + 28, right, top + 28);

    doc.save(`Fee-Receipt-${receiptNo(receipt.id)}.pdf`);
};
