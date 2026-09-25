import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Info, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PrivacyNotice() {
  return (
    <Dialog>
      <DialogTrigger asChild><button type="button" className="rounded-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Aviso de privacidad</button></DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl p-7 sm:max-w-lg">
        <DialogHeader><DialogTitle className="font-editorial text-3xl font-normal">Tu privacidad, primero.</DialogTitle><DialogDescription>Borrador informativo · Versión 0.1 · Pendiente de revisión legal</DialogDescription></DialogHeader>
        <div className="space-y-4 text-sm leading-6 text-muted-foreground">
          <p>Nexus está en preparación. Este borrador no sustituye un aviso de privacidad integral aprobado. Antes del lanzamiento se identificarán el responsable, su domicilio, los medios de contacto y el procedimiento para ejercer tus derechos de acceso, rectificación, cancelación y oposición.</p>
          <p>La experiencia prevista utiliza tu correo para administrar tu cuenta y los datos financieros que decidas ingresar para elaborar estimaciones de retiro. No solicitaremos contraseñas de tu AFORE ni datos de tarjetas.</p>
          <p>Una conexión con proveedores requerirá una autorización independiente. Aún deben definirse los plazos de conservación, las transferencias aplicables y los mecanismos para revocar el consentimiento o eliminar tus datos.</p>
          <p className="rounded-xl bg-secondary p-4 text-primary">En esta pantalla no se envían ni guardan credenciales, información financiera o consentimientos. La autenticación está pendiente de configuración.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AccessForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState(false);
  return (
    <section aria-labelledby="access-title" className="rounded-[1.75rem] border border-border/80 bg-card p-6 shadow-[0_12px_45px_-25px_hsl(var(--primary)/0.2)] sm:p-9">
      <div className="mb-7 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1" aria-label="Tipo de acceso">
        {([['login', 'Iniciar sesión'], ['register', 'Crear cuenta']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => { setMode(value); setConsent(false); }} className={`rounded-lg px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${mode === value ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-primary'}`}>{label}</button>)}
      </div>
      <h2 id="access-title" className="font-editorial text-[2rem] leading-tight">{mode === "login" ? "Qué gusto tenerte aquí." : "Tu futuro empieza contigo."}</h2>
      <p className="mb-7 mt-2 text-sm leading-6 text-muted-foreground">{mode === "login" ? "Un paso más cerca del retiro que imaginas." : "Crea tu cuenta para comenzar a construir tu plan."}</p>
      <form onSubmit={(event) => event.preventDefault()} className="space-y-5">
        <div className="space-y-2"><Label htmlFor="email" className="text-sm font-medium">Correo electrónico</Label><div className="relative"><Mail aria-hidden="true" className="absolute left-4 top-4 h-[18px] w-[18px] text-muted-foreground"/><Input id="email" type="email" autoComplete="email" placeholder="tu@correo.com" className="h-12 rounded-xl bg-background/50 pl-11 text-base placeholder:text-muted-foreground/80" /></div></div>
        <div className="space-y-2"><div className="flex items-center justify-between gap-2"><Label htmlFor="password">Contraseña</Label>{mode === "login" && <Dialog><DialogTrigger asChild><button type="button" className="text-xs font-semibold text-primary underline-offset-4 hover:underline">¿La olvidaste?</button></DialogTrigger><DialogContent className="rounded-2xl"><DialogHeader><DialogTitle>Recuperación de contraseña</DialogTitle><DialogDescription className="pt-3 leading-6">La recuperación estará disponible cuando se configure la autenticación con Supabase. Por ahora no se puede enviar un correo de recuperación y no se ha realizado ninguna solicitud.</DialogDescription></DialogHeader></DialogContent></Dialog>}</div><div className="relative"><LockKeyhole aria-hidden="true" className="absolute left-4 top-4 h-[18px] w-[18px] text-muted-foreground"/><Input id="password" type={visible ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="Ingresa tu contraseña" className="h-12 rounded-xl bg-background/50 pl-11 pr-12 text-base placeholder:text-muted-foreground/80"/><button type="button" aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"} aria-pressed={visible} onClick={() => setVisible(!visible)} className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{visible ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></div>
        <div className="rounded-xl border border-border bg-background/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><ShieldCheck size={17} className="text-primary" aria-hidden="true"/> Tú decides sobre tus datos</div>
          <p className="mb-4 text-xs leading-5 text-muted-foreground">Usaremos los datos que compartas para ayudarte a planear tu retiro. No conectaremos tu AFORE sin una autorización adicional.</p>
          <div className="flex items-start gap-3"><Checkbox id="consent" checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-0.5 h-[18px] w-[18px] rounded-[5px]"/><div className="text-xs leading-5"><Label htmlFor="consent" className="cursor-pointer text-xs font-normal leading-5">He leído el aviso y acepto el tratamiento de mis datos para crear y administrar mi cuenta.</Label><div className="mt-1"><PrivacyNotice/></div></div></div>
        </div>
        <Button disabled type="submit" aria-describedby="setup-notice" className="h-12 w-full justify-between rounded-xl px-5 text-sm disabled:opacity-70"><span>{mode === "login" ? "Iniciar sesión segura" : "Crear mi cuenta"}</span><ArrowRight size={18}/></Button>
        <div id="setup-notice" role="status" className="flex gap-2.5 rounded-xl bg-[hsl(var(--warning))] p-3 text-xs leading-5 text-[hsl(var(--warning-foreground))]"><Info size={16} className="mt-0.5 shrink-0"/><p><strong className="font-semibold">Estamos preparando tu acceso.</strong> Es necesario conectar Supabase para habilitar cuentas. No se guardan datos ni consentimiento en esta vista.</p></div>
      </form>
      <p className="mt-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground"><LockKeyhole size={13} aria-hidden="true"/> Nunca te pediremos la contraseña de tu AFORE.</p>
    </section>
  );
}
