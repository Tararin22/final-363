## IT-02: Bottom-Up Integration Testing with Driver

แนวคิด Bottom-Up: ทดสอบโมดูลระดับล่าง (Inventory และ Cart) ของจริงก่อน โดยใช้ Driver แทนโมดูลระดับบน (Login) ที่เรียกใช้งาน

**บทบาทของ Driver:** ฟังก์ชัน `driverOpenInventory()` ทำหน้าที่เตรียมสถานะ Login โดยใช้ `BrowserContext.addCookies()` ตั้ง Cookie `session-username=standard_user` บนโดเมน `www.saucedemo.com` แล้วเปิด `inventory.html` โดยตรง ไม่ผ่าน Login Form

| ส่วน | ประเภท | รายละเอียด |
|------|--------|------------|
| `driverOpenInventory()` และ Cookie session-username | **Driver** | เตรียมสถานะ Login แทนการกรอกฟอร์ม |
| หน้า Inventory (สินค้า 6 รายการ) | **Real** | เว็บ SauceDemo จริง |
| การเพิ่มสินค้าและ Cart Badge | **Real** | ทำงานบนเว็บจริง |
| หน้า Shopping Cart และรายการสินค้า | **Real** | เว็บ SauceDemo จริง |