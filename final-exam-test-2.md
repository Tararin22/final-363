# ข้อสอบปลายภาค Software Testing ด้วย Playwright

**รายวิชา:** Software Testing  
**ระบบสำหรับทดสอบ:** https://www.saucedemo.com/  
**เครื่องมือ:** Playwright Test (TypeScript)  
**จำนวนข้อ:** 6 ข้อ (3 บท บทละ 2 ข้อ)  
**คะแนน:** ข้อละ 20 คะแนน รวม **120 คะแนน**

## วัตถุประสงค์ของการสอบ

1. ใช้ Playwright ทดสอบพฤติกรรมขององค์ประกอบบนเว็บไซต์ได้
2. ออกแบบ Test Cases และตรวจผลด้วย Assertions ได้ถูกต้อง
3. อธิบายและสาธิต Top-Down Integration Testing ด้วย Stub และ Bottom-Up Integration Testing ด้วย Driver ได้
4. ทดสอบกระบวนการใช้งานจริงตั้งแต่เริ่มต้นจนสิ้นสุดด้วย System Testing ได้
5. บันทึก Playwright HTML/JSON Report จากผลการรันทดสอบจริงได้
6. ใช้ GitHub จัดเก็บ Source Code และรายงาน พร้อมส่งงานด้วย Repository URL ได้

## ข้อกำหนดทั่วไป

- ใช้เว็บไซต์ **SauceDemo เท่านั้น** เป็นระบบเป้าหมายของการทดสอบ ไม่สร้างเว็บไซต์ตัวอย่างอื่นมาทดแทน
- ใช้ TypeScript และ `@playwright/test` และเขียน Assertions ตรวจสอบผลลัพธ์ตามโจทย์
- ทุก Test ต้องใช้ชื่อ `test()` ตามที่กำหนด พร้อม `annotation` ชนิด `description` และแบ่งลำดับด้วย `test.step()` ตามโครงสร้างในแต่ละข้อ (ส่วนที่เป็น Comment ให้นักศึกษาเขียน Code เอง)
- สำหรับการเข้าสู่ระบบปกติ ใช้ Username `standard_user` และ Password `secret_sauce`
- เฉพาะ Integration Testing ข้อ IT-01 อนุญาตให้จำลองหน้า Inventory ด้วย `page.setContent()` และข้อ IT-02 ให้ใช้ Driver เตรียมสถานะ Login
- รันการทดสอบจริงและบันทึก HTML Report และ JSON Report แม้ว่าบาง Test Case จะ Failed ก็ตาม
- จัดเก็บ Source Code และรายงานไว้ใน GitHub Repository ชื่อ `final-student-id` (แทน `student-id` ด้วยรหัสนักศึกษา)
- ส่งงานโดย **ส่ง GitHub Repository Link จำนวน 1 ลิงก์** และกำหนดสิทธิ์ให้อาจารย์เข้าถึงได้

> **หมายเหตุเชิงวิชาการ:** บทที่ 1 ใช้การทดสอบ UI ผ่าน Black-box Browser จึงเป็น UI Component/Functional Testing ไม่ใช่ Unit Testing ของฟังก์ชันภายในโดยตรง เนื่องจากไม่สามารถเข้าถึง Source Code ภายในของ SauceDemo

---

# บทที่ 1: Unit Testing / UI Component Testing

## ข้อ 1: การตรวจสอบข้อมูล Login Form (20 คะแนน)

**หัวข้อ:** Login Form Validation  
**เว็บไซต์:** https://www.saucedemo.com/

### คำสั่ง

ให้นักศึกษาเขียน Playwright Test เพื่อตรวจสอบ Login Form ดังนี้

1. เปิดเว็บไซต์ SauceDemo
2. ไม่กรอก Username และ Password แล้วคลิก Login
3. ตรวจสอบข้อความ `Username is required`
4. กรอก Username เป็น `standard_user` แต่ไม่กรอก Password แล้วคลิก Login
5. ตรวจสอบข้อความ `Password is required`
6. กรอก Username เป็น `invalid_user` และ Password เป็น `wrong_password` แล้วคลิก Login
7. ตรวจสอบข้อความแจ้งว่า Username และ Password ไม่ตรงกัน
8. ตรวจสอบว่าทั้งสามกรณีไม่เข้าสู่หน้า Inventory

**ให้แยกออกเป็น 3 Test Cases** เพื่อให้แต่ละกรณีมีผลทดสอบแยกจากกัน

**ไฟล์ที่ต้องสร้าง:** `tests/unit/UT-01.spec.ts`

**ชื่อ Test ที่ต้องใช้ใน Playwright Report:**

- `UT-01.1: empty username and password`
- `UT-01.2: missing password`
- `UT-01.3: invalid login details`


**โครงสร้าง Test ที่กำหนด (ชื่อ Test, Annotation และ Test Steps):**

```typescript
import { test, expect } from '@playwright/test';

test.describe('UT-01: Login Form Validation', () => {
  test('UT-01.1: empty username and password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อไม่กรอก Username และ Password' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login', async () => {
      // เปิดเว็บไซต์ SauceDemo
    });
    await test.step('ส่งฟอร์มโดยไม่กรอกข้อมูล', async () => {
      // กดปุ่ม Login
    });
    await test.step('ตรวจสอบ Error และ URL', async () => {
      // ตรวจสอบ Username is required และไม่เข้าสู่ Inventory
    });
  });

  test('UT-01.2: missing password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อกรอก Username แต่ไม่กรอก Password' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอก Username', async () => {
      // กรอก standard_user
    });
    await test.step('กด Login โดยไม่กรอก Password', async () => {
      // ส่งฟอร์ม
    });
    await test.step('ตรวจสอบ Error และ URL', async () => {
      // ตรวจสอบ Password is required และไม่เข้าสู่ Inventory
    });
  });

  test('UT-01.3: invalid login details', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อ Username และ Password ไม่ถูกต้อง' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอกข้อมูลผิด', async () => {
      // กรอก invalid_user / wrong_password
    });
    await test.step('กด Login', async () => {
      // ส่งฟอร์ม
    });
    await test.step('ตรวจสอบ Error และ URL', async () => {
      // ตรวจสอบข้อความแจ้งข้อมูลไม่ถูกต้อง และไม่เข้าสู่ Inventory
    });
  });
});
```

### ผลลัพธ์ที่คาดหวัง

| ขั้นตอน | Expected Result |
|---|---|
| ไม่กรอก Username และ Password | แสดง `Username is required` |
| ไม่กรอก Password | แสดง `Password is required` |
| ข้อมูลเข้าสู่ระบบไม่ถูกต้อง | แสดงข้อความแจ้ง Username/Password ไม่ตรงกัน |
| ทั้งสามกรณี | ไม่เข้าสู่หน้า Inventory |
| Playwright Report | บันทึก Passed / Failed ตามผลจริง |

---

## ข้อ 2: การตรวจสอบสถานะปุ่ม Add to Cart และ Remove (20 คะแนน)

**หัวข้อ:** Product Button State Validation  
**เว็บไซต์:** https://www.saucedemo.com/

### คำสั่ง

1. Login ด้วย Username `standard_user` และ Password `secret_sauce`
2. ตรวจสอบว่าเข้าสู่หน้า Inventory สำเร็จ
3. ตรวจสอบว่าสินค้า Sauce Labs Backpack มีปุ่ม `Add to cart`
4. คลิกปุ่ม `Add to cart` ของสินค้า Sauce Labs Backpack
5. ตรวจสอบว่าปุ่มเปลี่ยนเป็น `Remove` และ Cart Badge แสดง `1`
6. คลิกปุ่ม `Remove` ของสินค้าเดิม
7. ตรวจสอบว่าปุ่มกลับมาเป็น `Add to cart` และ Cart Badge ไม่แสดงตัวเลขอีกต่อไป

**ไฟล์ที่ต้องสร้าง:** `tests/unit/UT-02.spec.ts`

**ชื่อ Test ที่ต้องใช้ใน Playwright Report:**

- `UT-02: product button state Add to cart -> Remove -> Add to cart`


**โครงสร้าง Test ที่กำหนด (ชื่อ Test, Annotation และ Test Steps):**

```typescript
import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบสถานะปุ่ม Add to cart และ Remove รวมถึง Cart Badge'
  }
}, async ({ page }) => {
  await test.step('Login เข้าสู่ระบบ', async () => {
    // Login และตรวจสอบหน้า Inventory
  });
  await test.step('ตรวจสอบปุ่มก่อนเพิ่มสินค้า', async () => {
    // ตรวจสอบปุ่ม Add to cart ของ Backpack
  });
  await test.step('เพิ่มสินค้าเข้า Cart', async () => {
    // เพิ่มสินค้าและตรวจสอบปุ่ม Remove และ Cart Badge = 1
  });
  await test.step('ลบสินค้าออกจาก Cart', async () => {
    // ลบสินค้า ตรวจสอบปุ่ม Add to cart และ Cart Badge หายไป
  });
});
```

### ผลลัพธ์ที่คาดหวัง

| ขั้นตอน | Expected Result |
|---|---|
| ก่อนเพิ่มสินค้า | แสดงปุ่ม Add to cart |
| หลังเพิ่มสินค้า | แสดงปุ่ม Remove |
| จำนวนสินค้า | Cart Badge = `1` |
| หลังลบสินค้า | ปุ่มกลับเป็น Add to cart |
| จำนวนสินค้าหลังลบ | Cart Badge ไม่แสดง |
| Playwright Report | บันทึก Passed / Failed ตามผลจริง |

---

# บทที่ 2: Integration Testing

## ข้อ 3: Top-Down Integration Testing ด้วย Stub (20 คะแนน)

**หัวข้อ:** Top-Down Integration Testing with Stub  
**เว็บไซต์:** https://www.saucedemo.com/

### คำสั่ง

1. เปิดเว็บไซต์ SauceDemo
2. Login ด้วย `standard_user` / `secret_sauce`
3. ตรวจสอบว่า Login สำเร็จและเข้าสู่ `inventory.html`
4. ใช้ `page.setContent()` สร้าง Inventory Stub เพื่อจำลองการแสดงผลหน้า Inventory
5. ให้ Inventory Stub แสดงข้อความ `Mock Inventory Ready`
6. ให้ Inventory Stub แสดงสินค้าจำลองสองรายการ: `Mock Backpack` และ `Mock Bike Light`
7. ตรวจสอบว่าข้อความ `Mock Inventory Ready` ปรากฏ
8. ตรวจสอบว่า Inventory Stub มีสินค้า 2 รายการและชื่อถูกต้อง
9. อธิบายใน `README.md` ว่าส่วนใดเป็น Real และส่วนใดเป็น Stub

**ไฟล์ที่ต้องสร้าง:** `tests/integration/IT-01.spec.ts`

**ชื่อ Test ที่ต้องใช้ใน Playwright Report:**

- `IT-01: top-down REAL Login -> browser-level Inventory STUB`


**โครงสร้าง Test ที่กำหนด (ชื่อ Test, Annotation และ Test Steps):**

```typescript
import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()'
  }
}, async ({ page }) => {
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    // Login และตรวจสอบ URL inventory.html
  });
  await test.step('สร้าง Inventory Stub', async () => {
    // ใช้ page.setContent() แสดง Mock Inventory Ready และสินค้าจำลอง 2 รายการ
  });
  await test.step('ตรวจสอบผลจาก Stub', async () => {
    // ตรวจสอบข้อความ จำนวน และชื่อสินค้าจำลอง
  });
});
```

> Stub ข้อนี้เป็นการจำลอง DOM ระดับ Browser หลัง Login จริง ไม่ใช่การแทน Internal Module ของ SauceDemo โดยตรง

### ผลลัพธ์ที่คาดหวัง

| ขั้นตอน | Expected Result |
|---|---|
| Login จริง | เข้าสู่ Inventory สำเร็จ |
| สร้าง Stub | แสดงหน้า Inventory Stub ได้ |
| ข้อความ | แสดง `Mock Inventory Ready` |
| จำนวนสินค้า | มีสินค้าจำลอง 2 รายการ |
| ชื่อสินค้า | แสดง `Mock Backpack` และ `Mock Bike Light` |
| Playwright Report | บันทึก Passed / Failed ตามผลจริง |

---

## ข้อ 4: Bottom-Up Integration Testing ด้วย Driver (20 คะแนน)

**หัวข้อ:** Bottom-Up Integration Testing with Driver  
**เว็บไซต์:** https://www.saucedemo.com/

### คำสั่ง

1. สร้างฟังก์ชัน `driverOpenInventory()` ทำหน้าที่ Driver เตรียมสถานะ Login
2. ใช้ `BrowserContext.addCookies()` กำหนด Cookie `session-username` เป็น `standard_user` บนโดเมน `www.saucedemo.com`
3. ใช้ Driver เปิด `https://www.saucedemo.com/inventory.html` โดยตรง ไม่ผ่าน Login Form
4. ตรวจสอบหน้า Inventory แสดงสินค้าครบ 6 รายการ
5. เพิ่มสินค้า Sauce Labs Backpack ลง Shopping Cart
6. เพิ่มสินค้า Sauce Labs Bike Light ลง Shopping Cart
7. ตรวจสอบ Cart Badge เป็น `2`
8. เปิดหน้า Shopping Cart
9. ตรวจสอบว่ามีสินค้าทั้งสองรายการอยู่ใน Cart
10. อธิบายใน `README.md` บทบาทของ Driver และส่วนที่เป็น Real

**ไฟล์ที่ต้องสร้าง:** `tests/integration/IT-02.spec.ts`

**ชื่อ Test ที่ต้องใช้ใน Playwright Report:**

- `IT-02: DRIVER login state -> REAL Inventory and Cart`


**โครงสร้าง Test ที่กำหนด (ชื่อ Test, Annotation และ Test Steps):**

```typescript
import { test, expect } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    // สร้าง BrowserContext และใช้ driverOpenInventory() ตั้งค่า Cookie
  });
  await test.step('ตรวจสอบ Inventory จริง', async () => {
    // ตรวจสอบสินค้า 6 รายการ
  });
  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    // เพิ่ม Backpack และ Bike Light แล้วตรวจสอบ Cart Badge = 2
  });
  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    // เปิด Cart และตรวจสอบชื่อสินค้าทั้งสองรายการ
  });
  // ปิด BrowserContext ที่สร้างเองเมื่อสิ้นสุดการทดสอบ
});
```

### ผลลัพธ์ที่คาดหวัง

| ขั้นตอน | Expected Result |
|---|---|
| Driver | เตรียมสถานะเพื่อเปิด Inventory ได้ |
| Inventory | แสดงสินค้า 6 รายการ |
| เพิ่ม Backpack | เพิ่มสินค้าสำเร็จ |
| เพิ่ม Bike Light | เพิ่มสินค้าสำเร็จ |
| Cart Badge | แสดง `2` |
| Shopping Cart | แสดงสินค้าทั้งสองรายการ |
| Playwright Report | บันทึก Passed / Failed ตามผลจริง |

---

# บทที่ 3: System Testing

## ข้อ 5: การทดสอบกระบวนการซื้อสินค้าหลายรายการ (20 คะแนน)

**หัวข้อ:** Complete Purchase Flow  
**เว็บไซต์:** https://www.saucedemo.com/

### คำสั่ง

1. เปิดเว็บไซต์ SauceDemo
2. Login ด้วย `standard_user` / `secret_sauce`
3. ตรวจสอบว่าเข้าสู่ Inventory สำเร็จ
4. เพิ่มสินค้า Sauce Labs Backpack และ Sauce Labs Bike Light ลง Shopping Cart
5. ตรวจสอบ Cart Badge แสดง `2`
6. เปิด Shopping Cart และตรวจสอบสินค้าทั้งสองรายการ
7. คลิก Checkout และกรอกข้อมูลลูกค้าให้ครบถ้วน
8. คลิก Continue เพื่อเข้าสู่ Checkout Overview
9. ตรวจสอบว่า Checkout Overview แสดงสินค้าทั้งสองรายการถูกต้อง
10. คลิก Finish
11. ตรวจสอบข้อความ `Thank you for your order!`

**ไฟล์ที่ต้องสร้าง:** `tests/system/ST-01.spec.ts`

**ชื่อ Test ที่ต้องใช้ใน Playwright Report:**

- `ST-01: complete purchase of two products`


**โครงสร้าง Test ที่กำหนด (ชื่อ Test, Annotation และ Test Steps):**

```typescript
import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {
  await test.step('Login และตรวจสอบ Inventory', async () => {
    // Login จริงผ่าน SauceDemo
  });
  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    // เพิ่ม Backpack และ Bike Light ตรวจสอบ Badge = 2
  });
  await test.step('ตรวจสอบ Cart', async () => {
    // ตรวจสอบชื่อสินค้าทั้งสองรายการ
  });
  await test.step('กรอก Checkout Information', async () => {
    // กรอกข้อมูลลูกค้าและกด Continue
  });
  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    // ตรวจสอบรายการสินค้าแล้วกด Finish
  });
  await test.step('ตรวจสอบ Order Complete', async () => {
    // ตรวจสอบข้อความ Thank you for your order!
  });
});
```

### ผลลัพธ์ที่คาดหวัง

| ขั้นตอน | Expected Result |
|---|---|
| Login | เข้าสู่ Inventory สำเร็จ |
| เพิ่มสินค้า | เพิ่มครบ 2 รายการ |
| Shopping Cart | แสดงสินค้าทั้งสองรายการ |
| Checkout Information | กรอกข้อมูลลูกค้าได้ |
| Checkout Overview | แสดงสินค้าถูกต้อง |
| Finish Order | สั่งซื้อสำเร็จ |
| Order Complete | แสดง `Thank you for your order!` |
| Playwright Report | บันทึก Passed / Failed ตามผลจริง |

---

## ข้อ 6: การตรวจสอบข้อมูล Checkout และการแก้ไขข้อผิดพลาด (20 คะแนน)

**หัวข้อ:** Checkout Validation and Recovery  
**เว็บไซต์:** https://www.saucedemo.com/

### คำสั่ง

1. Login ด้วย `standard_user` / `secret_sauce`
2. เพิ่มสินค้า Sauce Labs Backpack ลง Shopping Cart
3. เปิด Shopping Cart และคลิก Checkout
4. ไม่กรอกข้อมูลใด ๆ แล้วคลิก Continue
5. ตรวจสอบข้อความ `First Name is required`
6. กรอก First Name เป็น `John` แต่เว้น Last Name แล้วคลิก Continue
7. ตรวจสอบข้อความ `Last Name is required`
8. กรอก Last Name เป็น `Doe` แต่เว้น Postal Code แล้วคลิก Continue
9. ตรวจสอบข้อความ `Postal Code is required`
10. กรอก Postal Code เป็น `50000` แล้วคลิก Continue
11. ตรวจสอบว่าเข้าสู่ Checkout Overview สำเร็จ
12. คลิก Finish และตรวจสอบข้อความ `Thank you for your order!`

**ไฟล์ที่ต้องสร้าง:** `tests/system/ST-02.spec.ts`

**ชื่อ Test ที่ต้องใช้ใน Playwright Report:**

- `ST-02: checkout validation and recovery`


**โครงสร้าง Test ที่กำหนด (ชื่อ Test, Annotation และ Test Steps):**

```typescript
import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {
  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    // เตรียมขั้นตอน Checkout ด้วยระบบจริง
  });
  await test.step('ตรวจสอบ First Name is required', async () => {
    // ส่งฟอร์มว่างและตรวจสอบ Error
  });
  await test.step('ตรวจสอบ Last Name is required', async () => {
    // กรอก First Name และตรวจสอบ Error
  });
  await test.step('ตรวจสอบ Postal Code is required', async () => {
    // กรอก Last Name และตรวจสอบ Error
  });
  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    // กรอก Postal Code, ตรวจสอบ Overview, กด Finish และตรวจสอบข้อความสำเร็จ
  });
});
```

### ผลลัพธ์ที่คาดหวัง

| ขั้นตอน | Expected Result |
|---|---|
| ไม่กรอกข้อมูล | แสดง `First Name is required` |
| ไม่กรอก Last Name | แสดง `Last Name is required` |
| ไม่กรอก Postal Code | แสดง `Postal Code is required` |
| ข้อมูลไม่ครบ | ไม่สามารถเข้าสู่ Checkout Overview |
| กรอกข้อมูลครบ | เข้าสู่ Checkout Overview สำเร็จ |
| Finish Order | สั่งซื้อสำเร็จ |
| Order Complete | แสดง `Thank you for your order!` |
| Playwright Report | บันทึก Passed / Failed ตามผลจริง |

---

# เกณฑ์การให้คะแนน

**แต่ละข้อมี 4 รายการประเมิน รายการละ 5 คะแนน รวม 20 คะแนนต่อข้อ** ไม่มีคะแนนแยกสำหรับการส่งรายงานหรือความครบถ้วนของไฟล์ แต่การส่ง Source Code และ Report ยังคงเป็นข้อกำหนดของการสอบ

| รายการประเมิน | คะแนน | วิธีตรวจสอบ |
|---|---:|---|
| 1. การเขียน Playwright Test Script ถูกต้องตามโจทย์ | 5 | Source Code บน GitHub |
| 2. การตรวจสอบเงื่อนไขครบตามที่กำหนด | 5 | Source Code และ Test Cases |
| 3. การใช้ Assertions ตรวจสอบผลลัพธ์อย่างถูกต้อง | 5 | Source Code |
| 4. ผลการทดสอบผ่านจริง (Passed) | 5 | Playwright HTML/JSON Report และอาจรันทดสอบซ้ำ |
| **รวมต่อข้อ** | **20** | |

## สรุปคะแนนทุกข้อ

| บท | รหัส | ข้อสอบ | คะแนน |
|---|---|---|---:|
| 1 | UT-01 | Login Form Validation | 20 |
| 1 | UT-02 | Product Button State Validation | 20 |
| | | **รวมบทที่ 1** | **40** |
| 2 | IT-01 | Top-Down with Stub | 20 |
| 2 | IT-02 | Bottom-Up with Driver | 20 |
| | | **รวมบทที่ 2** | **40** |
| 3 | ST-01 | Complete Purchase Flow | 20 |
| 3 | ST-02 | Checkout Validation and Recovery | 20 |
| | | **รวมบทที่ 3** | **40** |
| | | **รวมทั้งหมด 6 ข้อ** | **120** |

**แนวทางตรวจ:** ใช้รายงานตรวจ Passed/Failed ประกอบกับการอ่าน Source Code เพื่อยืนยันว่ามีการทดสอบและ Assertions ครบจริง ไม่ใช่อาศัยสถานะ Passed เพียงอย่างเดียว หากจำเป็นผู้สอนสามารถ Clone Repository และรันทดสอบใหม่ได้

---

# การบันทึกผลการทดสอบและส่งงานผ่าน GitHub

## 1. ตั้งชื่อ GitHub Repository

ใช้ชื่อ **`final-student-id`** โดยแทน `student-id` ด้วยรหัสนักศึกษาจริง เช่น รหัส `6712345678` ใช้ Repository `final-6712345678`

## 2. โครงสร้าง Repository

```text
final-student-id/
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tests/
│   ├── unit/
│   │   ├── UT-01.spec.ts
│   │   └── UT-02.spec.ts
│   ├── integration/
│   │   ├── IT-01.spec.ts
│   │   └── IT-02.spec.ts
│   └── system/
│       ├── ST-01.spec.ts
│       └── ST-02.spec.ts
├── playwright-report/
│   ├── index.html
│   └── data/
└── reports/
    ├── results.json
    └── test-summary.md
```

โฟลเดอร์ `playwright-report/data/` อาจมีไฟล์ประกอบแตกต่างกันตามผลการทดสอบ ให้เก็บไฟล์รายงานที่ Playwright สร้างจริงทั้งโฟลเดอร์

## 3. ตั้งค่า Playwright Reporter

ไฟล์ `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

## 4. สร้าง Project ติดตั้ง Playwright และรันตรวจรายงาน

### 4.1 สร้าง Directory สำหรับข้อสอบ

ตรวจสอบว่ามี Node.js และ npm พร้อมใช้งาน จากนั้นสร้างโฟลเดอร์ชื่อ **`final-exam`** แล้วเข้าไปในโฟลเดอร์

```bash
node -v
npm -v
mkdir final-exam
cd final-exam
```

> `final-exam` เป็นชื่อโฟลเดอร์ Project ในเครื่อง ส่วนชื่อ GitHub Repository ยังคงเป็น `final-student-id` ตามข้อ 1

### 4.2 ติดตั้ง Playwright ตามตัวอย่างบทเรียน

รันคำสั่ง

```bash
npm init playwright@latest
```

เลือกค่าตามนี้ในขั้นตอนติดตั้ง

- ภาษา: **TypeScript**
- โฟลเดอร์สำหรับ Test: **tests**
- ติดตั้ง Playwright Browsers: **Yes**

ตรวจสอบการติดตั้ง

```bash
npx playwright --version
```

จากนั้นจัดโครงสร้างไฟล์ `tests/` ให้ตรงกับข้อสอบทั้ง 6 ข้อ และตั้งค่า `playwright.config.ts` ตามข้อ 3 เพื่อให้บันทึก HTML/JSON Report

### 4.3 รันการทดสอบและตรวจรายงาน

เมื่อเขียน Test Scripts ครบแล้ว ให้รันจากภายในโฟลเดอร์ `final-exam`

```bash
npx playwright test
npx playwright show-report
```

ตรวจสอบไฟล์ `playwright-report/index.html` และ `reports/results.json` หลังรันทดสอบ บันทึกสรุป Passed/Failed และข้อผิดพลาดที่พบใน `reports/test-summary.md` โดยต้องใช้ผลการรันทดสอบจริง ไม่แก้ไขผลรายงานด้วยตนเอง

## 5. บันทึกงานบน GitHub

หลังจากสร้าง Repository เปล่าชื่อ `final-student-id` บน GitHub ให้ดำเนินการ **ภายในโฟลเดอร์ `final-exam`** ดังนี้

```bash
git init
git add .
# ตรวจสอบว่ารายงาน HTML/JSON ถูกเพิ่มเข้า Git แล้ว
git status
git commit -m "Submit Playwright exam and reports: รหัสนักศึกษา ชื่อนักศึกษา นามสกุล"
git branch -M main
git remote add origin https://github.com/USERNAME/final-student-id.git
git push -u origin main
```

**ต้องแทน** `USERNAME`, `student-id` และข้อความรหัสนักศึกษา/ชื่อ/นามสกุลใน Commit Message ด้วยข้อมูลจริงของผู้ส่งงาน หากรายงานที่สร้างโดย Playwright ไม่ปรากฏในรายการ `git status` เพราะถูกละเว้นโดยไฟล์ที่ Project สร้างอัตโนมัติ ให้ใช้ `git add -f playwright-report/index.html reports/results.json` และเพิ่มไฟล์ประกอบรายงานที่จำเป็นก่อน Commit

## 6. รูปแบบการส่งข้อสอบ

**ส่ง GitHub Repository Link จำนวน 1 ลิงก์เท่านั้น** เช่น

```text
https://github.com/USERNAME/final-student-id
```

Repository ต้องมี Source Code ครบ 6 ข้อ, ไฟล์ตั้งค่า Playwright, HTML Report, JSON Report, README.md และไฟล์สรุปผล หาก Repository เป็น Private ต้องเพิ่มผู้สอนเป็น Collaborator ก่อนส่ง

> การกดเปิด `index.html` ในหน้า GitHub Repository ไม่ได้เปิด Interactive Playwright Report โดยตรง ผู้ตรวจสามารถ Clone Repository และใช้ `npx playwright show-report` ใน Project เพื่อดูรายงานที่บันทึกไว้

## 7. Checklist ก่อนส่ง

- [ ] สร้างโฟลเดอร์ `final-exam` และติดตั้ง Playwright สำเร็จ
- [ ] ชื่อ Repository เป็น `final-รหัสนักศึกษา`
- [ ] มี Test Scripts ครบทั้ง 6 ข้อ
- [ ] IT-01 ใช้ Stub และ IT-02 ใช้ Driver ตามโจทย์
- [ ] รันทดสอบจริงและจัดเก็บ HTML/JSON Report
- [ ] มี README.md และ reports/test-summary.md
- [ ] Commit Message ตรงตามรูปแบบที่กำหนด
- [ ] Push Source Code และรายงานขึ้น GitHub
- [ ] ตรวจสอบสิทธิ์ให้ผู้สอนเข้าถึงได้
- [ ] ส่ง GitHub Repository URL จำนวน 1 ลิงก์
