require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Nguyen Thi Thu Quyen " <nttquyen1902@gmail.com>',
    to: dataSend.reciverEmail,
    subject: "THÔNG TIN ĐẶT LỊCH TƯ VẤN",
    text: "Hello world?",
    html: `
    <h3>Xin chào ${dataSend.name}</h3>
    <p>Cảm ơn bạn đã đặt lịch tư vấn tại Children's Care</p>
    <p>Thông tin chi tiết:</p>
    <div><b>Tên người đại diện: ${dataSend.name}</b></div>
    <div><b>Số điện thoại: ${dataSend.phone}</b></div>
    <div><b>Tên trẻ: ${dataSend.childrentName}</b></div>
    <div><b>Ngày sinh: ${dataSend.birthday}</b></div>
   

    <p>Thông tin tư vấn:</p>
    <div><b>Gói tư vấn: ${dataSend.testGoiKham}</b></div>
    <div><b>Giá tư vấn: ${dataSend.testGiaGoiKham}</b></div>
    <div><b>Ngày tư vấn: ${dataSend.arrivalDate}</b></div>
    <div><b>khung giờ tư vấn: ${dataSend.testTimeslot}</b></div>
    <div></div>
    `,
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
