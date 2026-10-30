"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"

const WEB3FORMS_FREE_HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2"

export function Web3FormsCaptcha({
  language,
  onVerify,
  onExpire,
}: {
  language: "en" | "es"
  onVerify: (token: string) => void
  onExpire: () => void
}) {
  return (
    <div className="flex justify-center" aria-label={language === "en" ? "Spam protection" : "Protección contra spam"}>
      <HCaptcha
        sitekey={WEB3FORMS_FREE_HCAPTCHA_SITE_KEY}
        reCaptchaCompat={false}
        languageOverride={language}
        onVerify={onVerify}
        onExpire={onExpire}
        onError={() => onExpire()}
      />
    </div>
  )
}
