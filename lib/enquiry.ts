// Browser validation improves feedback; Web3Forms enforces server-side delivery and spam protection.
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const DEFAULT_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

export async function submitEnquiry(data: Record<string, unknown>, source: string): Promise<void> {
  const text = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const name = text("name"), phone = text("phone"), email = text("email"), type = text("type"), message = text("message");
  const accessKey = text("access_key") || DEFAULT_ACCESS_KEY;

  if (name.length < 2 || name.length > 100) throw new Error("Please enter your name.");
  if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15) throw new Error("Please enter a valid phone number.");
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)) throw new Error("Please enter a valid email address.");
  if (data.consent !== "on" || text("_gotcha") || text("botcheck") || message.length > 2000 || !["Residential", "Commercial", "Multi-storey Building", "Renovation"].includes(type)) {
    throw new Error("Please check your enquiry and consent.");
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      phone,
      email,
      type,
      message,
      source,
      subject: `New Structora Website Enquiry — ${name}`,
      from_name: "Structora India Website",
      botcheck: ""
    }),
    signal: AbortSignal.timeout(15000)
  });

  const receipt = await response.json();
  if (!response.ok || receipt?.success !== true) {
    throw new Error(receipt?.message || "Delivery could not be confirmed. Please try again or call us.");
  }
}
