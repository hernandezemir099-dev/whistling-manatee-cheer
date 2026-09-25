import { ArrowUpRight, Check, Fingerprint, Leaf, ShieldCheck, Sprout } from "lucide-react";
import AccessForm, { PrivacyNotice } from "@/components/auth/AccessForm";

const steps = ["Acceso y consentimiento", "Datos para tu plan", "Tu futuro, en perspectiva"];

export default function Index() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/70">
        <div className="mx-auto flex h-24 max-w-[1280px] items-center justify-between px-6 sm:px-10 lg:px-14">
          <a href="/" aria-label="Nexus, inicio" className="flex items-center gap-2.5 text-primary"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sprout size={25} strokeWidth={1.6}/></span><span className="text-[30px] font-semibold tracking-[-1.5px]">nexus<span className="text-lg">.</span></span></a>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><ShieldCheck size={17} className="text-primary"/><span className="hidden sm:inline">Tu futuro comienza con confianza</span><span className="sm:hidden">Tu espacio de retiro</span></div>
        </div>
      </header>
      <main className="mx-auto max-w-[1280px] px-6 pb-12 pt-8 sm:px-10 lg:px-14 lg:pt-10">
        <nav aria-label="Pasos para comenzar" className="mb-10 flex items-center gap-3 text-xs sm:gap-5 lg:mb-14">
          {steps.map((step, index) => <div key={step} className={`flex items-center gap-3 ${index > 0 ? 'hidden sm:flex' : ''}`} aria-current={index === 0 ? 'step' : undefined}>{index > 0 && <span className="mr-2 h-px w-8 bg-border lg:w-14"/>}<span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${index === 0 ? 'bg-primary text-white' : 'border border-border text-muted-foreground'}`}>{String(index + 1).padStart(2, '0')}</span><span className={index === 0 ? 'font-semibold text-primary' : 'text-muted-foreground'}>{step}</span></div>)}
        </nav>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <section className="pt-1 lg:pt-5">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-secondary/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary"><Leaf size={13}/> El mañana se construye hoy</div>
            <h1 className="max-w-lg font-editorial text-[44px] leading-[1.1] tracking-[-1.6px] sm:text-[56px] lg:text-[60px]">Tu próximo capítulo,<br/><span className="italic text-primary">a tu manera.</span></h1>
            <p className="mt-5 max-w-[400px] text-[15px] leading-7 text-muted-foreground">Dale claridad a tu retiro. Conoce dónde estás, descubre tus posibilidades y construye un plan que se adapte a ti.</p>
            <div className="relative mt-8 max-w-[470px]">
              <img src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=85" alt="Un bosque tranquilo bañado por la luz del sol" className="h-56 w-full rounded-[1.4rem] object-cover sm:h-64"/>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/70 bg-card/95 p-4 shadow-sm backdrop-blur-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><Sprout size={22}/></span><div><p className="font-editorial text-lg">Pequeños pasos. Más posibilidades.</p><p className="mt-0.5 text-[11px] text-muted-foreground">Un plan para disfrutar lo que viene.</p></div><ArrowUpRight className="ml-auto hidden shrink-0 text-primary sm:block" size={20}/></div>
            </div>
            <div className="mt-7 flex max-w-[470px] flex-wrap gap-x-7 gap-y-3 text-xs text-muted-foreground"><span className="flex items-center gap-2"><Check size={15} className="text-primary"/> Sin conectar tu AFORE</span><span className="flex items-center gap-2"><Check size={15} className="text-primary"/> A tu ritmo, sin presión</span></div>
          </section>
          <AccessForm/>
        </div>
        <aside className="mt-12 flex flex-col gap-4 rounded-2xl border border-border/70 bg-secondary/35 px-6 py-5 sm:flex-row sm:items-center lg:mt-16"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Fingerprint size={23}/></span><div><h2 className="text-sm font-semibold">Primero tu confianza. Después, tu plan.</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">Tú eliges qué información compartir. Las conexiones financieras y las aportaciones reales aún no están disponibles.</p></div><span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary sm:ml-auto">Siempre en tus manos</span></aside>
      </main>
      <footer className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 pb-7 text-[11px] text-muted-foreground sm:flex-row sm:px-10 lg:px-14"><p>© {new Date().getFullYear()} Nexus · Más claridad para tu futuro.</p><div className="flex items-center gap-5"><PrivacyNotice/><span className="h-3 w-px bg-border"/><span>Hecho para tu retiro en México</span></div></footer>
    </div>
  );
}
