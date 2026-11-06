import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Phone, Mail, Globe } from "lucide-react";
import p1 from "@/assets/faq/faq-1.jpg.asset.json";
import p2 from "@/assets/faq/faq-2.jpg.asset.json";
import p3 from "@/assets/faq/faq-3.jpg.asset.json";
import p4 from "@/assets/faq/faq-4.jpg.asset.json";
import p5 from "@/assets/faq/faq-5.jpg.asset.json";

type Lang = "es" | "en";

const T = {
  es: {
    eyebrow: "Big-Foot de Thalek",
    introTitle: "Resolvemos tus dudas",
    intro:
      "Entendemos que incorporar un nuevo miembro a la familia es una decisión importante. Criamos a nuestros Shih Tzu en un entorno natural y familiar, brindándoles dedicación total las 24 horas del día. Aquí respondemos a las preguntas más habituales sobre nuestra forma de criar y el proceso para dar la bienvenida a uno de nuestros cachorros.",
    faqTitle: "Preguntas más frecuentes",
    faqIntro:
      "Nuestra prioridad es la salud, el bienestar y la felicidad de nuestros ejemplares. Descubre más detalles sobre nuestro día a día y nuestra filosofía de cría ética. No dudes en contactar para consultar cualquier duda que tengas.",
    faqs: [
      ["¿Con qué frecuencia tenéis camadas?", "Criamos de forma muy esporádica y selectiva. Realizamos pocas camadas al año para respetar al máximo los ciclos naturales y el descanso de nuestras hembras, anteponiendo siempre su salud y felicidad a cualquier otro factor."],
      ["¿Cómo crecen y se socializan los cachorros?", "Los cachorros nacen y crecen dentro de nuestra casa, en plena naturaleza. Disfrutan de atención constante las 24 horas del día, conviviendo con nosotros, escuchando sonidos cotidianos y recibiendo afecto diario para asegurar un carácter equilibrado y sociable."],
      ["¿Cómo seleccionáis a los reproductores?", "Buscamos siempre la máxima calidad morfológica y genética. Elegimos cuidadosamente a cada reproductor asegurándonos de que se complementen mutuamente y compartan un temperamento dulce, sano y vivaz."],
      ["¿Cuál es el precio de adopción y cómo consultar próximas fechas?", "Los importes exactos y las fechas estimadas de las próximas camadas se informan de manera individualizada bajo consulta directa. Te invitamos a ponerte en contacto con nosotros para conocer los detalles concretos."],
      ["¿Dónde puedo conocer más sobre vuestra crianza?", "Puedes descubrir todos los valores y cuidados diarios que ofrecemos a nuestros perros en la sección de Filosofía y cría familiar."],
      ["¿Cómo puedo ver si hay cachorros disponibles actualmente?", "Actualizamos periódicamente la información sobre los nacimientos previstos y camadas activas en el apartado de Camadas disponibles."],
    ],
    contactTitle: "Información de contacto",
    phone: "Teléfono para llamadas y WhatsApp",
    partners: "Socios",
    partnerList: [
      "RSCE : Real Sociedad Canina de España",
      "ACABE : Asociación de Criadores y Amigos del Bobtail mientras existió.",
      "CAPPIE : Club del Antiguo Perro de Pastor Inglés en España mientras existió.",
    ],
    ctaTitle: "Encuentra a tu nuevo compañero",
    cta: "Si deseas conocer la disponibilidad actual o consultar cualquier aspecto sobre nuestras próximas camadas, estaremos encantados de orientarte.",
    ctaBtn: "Ver camadas disponibles",
    litters: "cachorroshihtzuact",
  },
  en: {
    eyebrow: "Big-Foot de Thalek",
    introTitle: "We answer your questions",
    intro:
      "We understand that welcoming a new member into the family is an important decision. We raise our Shih Tzu in a natural, family environment, giving them our full dedication 24 hours a day. Here we answer the most common questions about the way we breed and the process of welcoming one of our puppies.",
    faqTitle: "Frequently asked questions",
    faqIntro:
      "Our priority is the health, well-being and happiness of our dogs. Discover more about our daily life and our ethical breeding philosophy. Feel free to contact us with any question you may have.",
    faqs: [
      ["How often do you have litters?", "We breed very occasionally and selectively. We have few litters a year to fully respect the natural cycles and rest of our females, always putting their health and happiness first."],
      ["How do the puppies grow up and socialise?", "Our puppies are born and raised inside our home, surrounded by nature. They enjoy constant attention 24 hours a day, living with us, hearing everyday sounds and receiving daily affection to ensure a balanced, sociable character."],
      ["How do you choose your breeding dogs?", "We always seek the highest morphological and genetic quality. We carefully choose each breeding dog, making sure they complement each other and share a sweet, healthy and lively temperament."],
      ["What is the adoption price and how can I ask about upcoming dates?", "Exact prices and estimated dates of upcoming litters are given individually on direct enquiry. Please get in touch with us to learn the specific details."],
      ["Where can I learn more about how you raise your dogs?", "You can discover all the values and daily care we offer our dogs in the Philosophy and family breeding section."],
      ["How can I see if puppies are currently available?", "We regularly update information about planned births and current litters in the Available litters section."],
    ],
    contactTitle: "Contact information",
    phone: "Phone for calls and WhatsApp",
    partners: "Memberships",
    partnerList: [
      "RSCE : Real Sociedad Canina de España",
      "ACABE : Asociación de Criadores y Amigos del Bobtail, while it existed.",
      "CAPPIE : Club del Antiguo Perro de Pastor Inglés en España, while it existed.",
    ],
    ctaTitle: "Find your new companion",
    cta: "If you would like to know current availability or ask about our upcoming litters, we will be happy to guide you.",
    ctaBtn: "See available litters",
    litters: "cachorroshihtzuact-en",
  },
} as const;

function Faq({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-turquoise/30">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-xl text-turquoise md:text-2xl">{q}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-turquoise text-turquoise-foreground">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && <p className="pb-6 leading-relaxed text-muted-foreground">{a}</p>}
    </div>
  );
}

export function FaqPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  const left = t.faqs.slice(0, 3);
  const right = t.faqs.slice(3);
  return (
    <main>
      <section className="bg-turquoise/10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow text-accent">{t.eyebrow}</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-turquoise md:text-5xl">{t.introTitle}</h1>
            <div className="mt-6 h-px w-24 bg-accent" />
            <p className="mt-6 text-lg leading-relaxed text-foreground/85">{t.intro}</p>
          </div>
          <div className="relative">
            <img src={p1.url} alt="Shih Tzu Big-Foot de Thalek" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft" />
            <img src={p2.url} alt="" className="absolute -bottom-6 -left-6 hidden aspect-square w-36 rounded-2xl border-4 border-background object-cover shadow-soft md:block" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center font-display text-4xl font-semibold text-turquoise">{t.faqTitle}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-muted-foreground">{t.faqIntro}</p>
        <div className="mt-10 grid gap-x-12 md:grid-cols-2">
          <div>{left.map(([q, a], i) => <Faq key={q} q={q} a={a} defaultOpen={i === 0} />)}</div>
          <div>{right.map(([q, a]) => <Faq key={q} q={q} a={a} />)}</div>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4">
          {[p3, p4, p5].map((p) => (
            <img key={p.url} src={p.url} alt="Shih Tzu" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-soft" />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-center font-display text-2xl font-semibold text-turquoise">{t.contactTitle}</h2>
          <ul className="mt-6 space-y-4 text-foreground/85">
            <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-turquoise" /><span>{t.phone} : <a href="tel:+34676220896" className="font-semibold hover:text-turquoise">+34 676 22 08 96</a></span></li>
            <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-turquoise" /><span>E-mail : <a href="mailto:bfdt@hotmail.com" className="font-semibold hover:text-turquoise">bfdt@hotmail.com</a></span></li>
            <li className="flex items-center gap-3"><Globe className="h-5 w-5 text-turquoise" /><span>Web : www.thalek.es</span></li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-center font-display text-2xl font-semibold text-turquoise">{t.partners}</h2>
          <ul className="mt-6 space-y-3 text-foreground/85">
            {t.partnerList.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">{t.ctaTitle}</h2>
          <p className="mt-5 leading-relaxed opacity-90">{t.cta}</p>
          <Link to="/$slug" params={{ slug: t.litters }} className="mt-8 inline-block rounded-full bg-turquoise px-7 py-3 font-semibold text-turquoise-foreground shadow-soft hover:opacity-90">
            {t.ctaBtn}
          </Link>
        </div>
      </section>
    </main>
  );
}
