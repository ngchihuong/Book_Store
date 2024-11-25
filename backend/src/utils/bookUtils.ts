import cryto from "crypto";
import QRCode from "qrcode";
import nodemailer from "nodemailer";

export const generateCode = (): string => {
    return cryto.randomBytes(8).toString('hex').toUpperCase();
}
export const generateQRCode = async (text: string): Promise<string> => {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(text);
        return qrCodeDataUrl;
    } catch (error) {
        console.log(error);
        throw new Error("Error generating to QR Code")
    }
}
export const sendBookingMail = async (userEmail: string, bookingCode: string, qrCodeDataUrl: string) => {
    const tranporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Confirm Booking',
        html: `
                <h1>Thank you for your reservation!</h1>
        <p>Your booking code is: <strong>${bookingCode}</strong></p>
        <p>Please use this code for any inquiries or to check your reservation details.</p>
        <p>To quickly confirm your booking, scan the QR code below:</p>
        <img src="cid:qrcode" alt="Booking confirmation QR code" />
        <p>We look forward to welcoming you and hope you have an amazing stay!</p>

        <hr>

        <h1>Cảm ơn bạn đã đặt phòng!</h1>
        <p>Mã đặt phòng của bạn là: <strong>${bookingCode}</strong></p>
        <p>Vui lòng sử dụng mã này cho mọi thông tin liên hệ hoặc để kiểm tra chi tiết đặt phòng của bạn.</p>
        <p>Để xác nhận đặt phòng nhanh chóng, hãy quét mã QR dưới đây:</p>
        <img src="cid:qrcode" alt="Mã QR xác nhận đặt phòng" />
        <p>Chúng tôi rất hân hạnh được chào đón bạn. Chúc bạn có một kỳ nghỉ tuyệt vời!</p>
      `,
        attachments: [{
            filename: 'qrcode.png',
            path: qrCodeDataUrl, // Đường dẫn đến file ảnh QR code
            cid: 'qrcode' // Đặt CID để nhúng ảnh vào nội dung HTML
        }]
    };
    try {
        await tranporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
        throw new Error("Error sending mail")
    }
}