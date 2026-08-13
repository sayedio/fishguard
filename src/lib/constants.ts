export const SITE = {
  name: "PhishGuard",
  tagline: "Stop before you click.",
  description: "Check a suspicious email in seconds. Clear risk. Private by design.",
  url: "https://phishguard.app",
} as const;

export const SVM_API_URL =
  process.env.NEXT_PUBLIC_SVM_API_URL ??
  "https://phishguard-svm-sayed-b6ftcuckgqcjeqdz.eastasia-01.azurewebsites.net";

export const BERT_API_URL =
  process.env.NEXT_PUBLIC_BERT_API_URL ??
  "https://phishguard-bert-sayed-brhudpbrg4evh8h5.eastasia-01.azurewebsites.net";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/check", label: "Check" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export const SEED_REVIEWS = [
  {
    id: "r1",
    name: "Nadia R.",
    role: "Student",
    rating: 5,
    text: "Caught a fake exam-login email before I clicked.",
  },
  {
    id: "r2",
    name: "Karim A.",
    role: "Shop owner",
    rating: 5,
    text: "Simple result. I finally trust what to do next.",
  },
  {
    id: "r3",
    name: "Priya S.",
    role: "Designer",
    rating: 4,
    text: "Fast for daily checks. Deep when I’m unsure.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Do you keep my email text?",
    a: "No. It’s used for this check only — not saved or shared.",
  },
  {
    q: "Fast vs Deep?",
    a: "Fast is quick. Deep is stronger for tricky messages. Use Both to compare.",
  },
  {
    q: "Is this antivirus?",
    a: "No. It’s an email risk check. Still never share OTPs or passwords by email.",
  },
  {
    q: "Why do scams feel real?",
    a: "They copy banks, bosses, and delivery apps — then push you to act fast.",
  },
  {
    q: "Why was this flagged?",
    a: "Each check also shows the words that matter — urgency, password asks, odd links — the same signals used in our explainability work.",
  },
] as const;

export const THREAT_POINTS = [
  {
    title: "Money gone fast",
    body: "Fake bank alerts steal logins before you notice.",
    visual: "money",
  },
  {
    title: "Stolen identity",
    body: "One reply can hand over your personal details.",
    visual: "id",
  },
  {
    title: "Hidden malware",
    body: "A single file or link can watch your device.",
    visual: "device",
  },
  {
    title: "Trust is bait",
    body: "Scams sound like people you already know.",
    visual: "trust",
  },
] as const;
