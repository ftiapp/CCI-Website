"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import ValidationHandler from "@/components/registration/form/ValidationHandler";

export default function TicketLookupPage() {
  const params = useParams();
  const locale = (params?.locale || "th").toString();
  const router = useRouter();
  const [code, setCode] = useState("");

  const t = useMemo(() => {
    if (locale === "th") {
      return {
        title: "ค้นหาบัตรเข้าร่วมงาน",
        subtitle:
          "โปรดกรอก UUID 6 ตัวท้าย หรือวางรหัสเต็มรูปแบบ (CCI-XXXXXX)",
        inputLabel: "UUID 6 ตัวท้าย",
        placeholder: "เช่น A20B97 หรือ CCI-A20B97",
        button: "เปิดบัตร",
        errorLength: "กรุณากรอกรหัสจำนวน 6 ตัวอักษร",
        errorInvalid: "โปรดกรอกเฉพาะตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น",
      };
    }
    return {
      title: "Find Your Ticket",
      subtitle:
        "Enter the last 6 characters of your UUID or paste the full code (CCI-XXXXXX)",
      inputLabel: "Last 6 of UUID",
      placeholder: "e.g., A20B97 or CCI-A20B97",
      button: "Open Ticket",
      errorLength: "Please enter exactly 6 characters.",
      errorInvalid: "Only letters A-Z and digits 0-9 are allowed.",
    };
  }, [locale]);

  const handleChange = (e) => {
    const raw = (e.target.value || "").toUpperCase().trim();
    // If user pasted full code like CCI-XXXXXX, extract the 6-char suffix
    const match = raw.match(/CCI-([A-Z0-9]{6})/i);
    if (match) {
      setCode(match[1].toUpperCase());
      return;
    }
    // Otherwise, keep only A-Z and 0-9 and take the last 6 chars
    const cleaned = raw.replace(/[^A-Z0-9]/g, "");
    setCode(cleaned.slice(-6));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      ValidationHandler.showErrorToast(t.errorLength, locale);
      return;
    }
    if (!/^[A-Z0-9]{6}$/.test(code)) {
      ValidationHandler.showErrorToast(t.errorInvalid, locale);
      return;
    }

    const fullId = `CCI-${code}`;
    // Navigate within the app for current domain
    router.push(`/${locale}/ticket/${fullId}`);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-[#d6cfc7] p-6">
        <h1 className="text-2xl font-semibold text-[#084d4e] mb-2">{t.title}</h1>
        <p className="text-sm text-[#5b5b5b] mb-6">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="uidSuffix" className="block text-sm font-medium mb-1">
              {t.inputLabel}
            </label>
            <input
              id="uidSuffix"
              name="uidSuffix"
              value={code}
              onChange={handleChange}
              placeholder={t.placeholder}
              maxLength={6}
              className="w-full rounded-lg border border-[#d6cfc7] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[#084d4e]/40 focus:border-[#084d4e] text-lg tracking-widest uppercase"
              autoComplete="off"
              inputMode="text"
              pattern="[A-Za-z0-9]{6}"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#084d4e] text-white py-2.5 rounded-lg hover:bg-[#0a5f61] transition-colors font-medium"
          >
            {t.button}
          </button>
        </form>

        <div className="mt-4 text-xs text-[#7a7a7a]">
          {locale === 'th' ? 'รูปแบบรหัส: ' : 'Code format: '}<span className="font-mono">CCI-XXXXXX</span>
        </div>
      </div>
    </div>
  );
}
