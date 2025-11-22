# دليل النشر - منصة سفر بلا حدود

## 🚀 النشر على GitHub و Vercel

### الخطوة 1: رفع المشروع على GitHub

```bash
# تأكد من أنك في مجلد المشروع
cd "C:\Resilience AI\travel"

# تحقق من حالة Git
git status

# أضف جميع التغييرات
git add .

# أنشئ commit
git commit -m "feat: تحسينات شاملة - إمكانية الوصول، التصميم الجديد، والأداء المحسّن"

# ادفع إلى GitHub
git push origin main
```

**ملاحظة**: إذا لم يكن لديك مستودع على GitHub:
1. اذهب إلى [GitHub](https://github.com)
2. أنشئ مستودع جديد
3. اتبع التعليمات لربط المستودع المحلي

### الخطوة 2: النشر على Vercel

1. **اذهب إلى Vercel**
   - افتح [vercel.com](https://vercel.com)
   - سجل الدخول بحساب GitHub

2. **أنشئ مشروع جديد**
   - اضغط "Add New..." → "Project"
   - اختر المستودع من GitHub
   - اضغط "Import"

3. **إعدادات المشروع**
   - **Framework Preset**: Next.js (يتم اكتشافه تلقائياً)
   - **Root Directory**: `./` (افتراضي)
   - **Build Command**: `npm run build` (افتراضي)
   - **Output Directory**: `.next` (افتراضي)
   - **Install Command**: `npm install` (افتراضي)

4. **متغيرات البيئة (Environment Variables)**
   أضف المتغيرات التالية في Vercel:
   
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **النشر**
   - اضغط "Deploy"
   - انتظر حتى يكتمل البناء (عادة 2-3 دقائق)
   - ستحصل على رابط للموقع المباشر

### الخطوة 3: التحقق من النشر

بعد النشر، تحقق من:

- ✅ الصفحة الرئيسية تعمل بشكل صحيح
- ✅ الترجمة العربية/الإنجليزية تعمل
- ✅ تسجيل المستخدم يعمل
- ✅ ميزات إمكانية الوصول تعمل
- ✅ جواز السفر مع QR Code يعمل
- ✅ صفحة الطوارئ تعمل
- ✅ الخرائط الذكية تعمل

### الخطوة 4: إعدادات إضافية (اختياري)

1. **نطاق مخصص (Custom Domain)**
   - في Vercel Dashboard → Settings → Domains
   - أضف نطاقك المخصص

2. **إعدادات Firebase**
   - تأكد من إضافة نطاق Vercel في Firebase Console
   - Firebase → Authentication → Settings → Authorized domains

3. **تحسين الأداء**
   - Vercel يقوم بتحسين الصور تلقائياً
   - تأكد من تفعيل Analytics في Vercel Dashboard

## 📝 ملاحظات مهمة

1. **البيئة**: تأكد من إضافة جميع متغيرات البيئة في Vercel
2. **Firebase**: تأكد من إعداد Firebase بشكل صحيح
3. **الصور**: الصور الحالية من Unsplash - يمكن استبدالها
4. **الترجمة**: جميع الترجمات موجودة في مجلد `messages/`

## 🐛 حل المشاكل الشائعة

### المشكلة: خطأ في البناء
- **الحل**: تحقق من متغيرات البيئة
- تحقق من أن جميع المكتبات مثبتة في `package.json`

### المشكلة: الصور لا تظهر
- **الحل**: تحقق من `next.config.ts` وإعدادات `remotePatterns`

### المشكلة: Firebase لا يعمل
- **الحل**: تحقق من متغيرات البيئة في Vercel
- تأكد من إضافة نطاق Vercel في Firebase Console

## 📞 الدعم

إذا واجهت أي مشاكل، راجع:
- [وثائق Vercel](https://vercel.com/docs)
- [وثائق Next.js](https://nextjs.org/docs)
- [وثائق Firebase](https://firebase.google.com/docs)

---

**جاهز للنشر! 🎉**

