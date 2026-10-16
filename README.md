# อย่าลืมกด ctrl+shift+v นะคะอาจาร :)
# Final Exam: Software Testing with Playwright

## IT-01: Top-Down Integration Testing with Stub

แนวคิด Top-Down: ทดสอบโมดูลระดับบน (Login) ของจริงก่อน แล้วใช้ Stub แทนโมดูลระดับล่างที่ยังไม่พร้อมหรือไม่ต้องการใช้ของจริง

| ส่วน | ประเภท | รายละเอียด |
|------|--------|------------|
| เปิดเว็บ SauceDemo | **Real** | เปิด https://www.saucedemo.com/ จริง |
| Login Form และการ Login | **Real** | กรอก standard_user / secret_sauce และส่งฟอร์มบนเว็บจริง |
| การตรวจ URL inventory.html | **Real** | ยืนยันว่าระบบจริงพาเข้าหน้า Inventory สำเร็จ |
| หน้า Inventory ที่แสดงผล | **Stub** | สร้างด้วย `page.setContent()` แทนหน้า Inventory จริง |
| ข้อความ Mock Inventory Ready | **Stub** | ข้อความจำลองที่เขียนเอง |
| สินค้า Mock Backpack, Mock Bike Light | **Stub** | ข้อมูลสินค้าจำลอง 2 รายการ |

หมายเหตุ: Stub ข้อนี้จำลอง DOM ระดับ Browser หลัง Login จริง ไม่ได้แทน Internal Module ของ SauceDemo โดยตรง

# ถึงหนูจะใช้ AI แต่หนูก็อ่านนะคะ เข้าใจบ้างไม่เข้าใจบ้าง5555