import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePlanningPreview } from "@/contexts/PlanningPreview";
import { ArrowLeft, ArrowRight, Building2, Wallet, ShieldCheck, Sprout, PencilLine, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const moneyFields = [
  ["balance", "Saldo de tu AFORE", "Lo que aparece en tu último estado de cuenta."],
  ["income", "Ingreso mensual neto", "El dinero que recibes después de impuestos."],
  ["expenses", "Gastos esenciales al mes", "Vivienda, alimentación, transporte y servicios."],
  ["debts", "Pagos de deudas al mes", "Pagos mínimos y mensualidades comprometidas."],
  ["buffer", "Reserva mensual para emergencias", "Dinero que quieres mantener disponible."],
] as const;
const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

export default function Onboarding() {
  const [review, setReview] = useState(false);
  const { values, setValues } = usePlanningPreview();
  const navigate = useNavigate();
  const update = (key: string, value: string) => { setValues(previous => ({ ...previous, [key]: value })); setReview(false); };
  const capacity = Number(values.income) - Number(values.expenses) - Number(values.debts) - Number(values.buffer);
  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return (
    <div className="min-h-screen pb-8">
      <header className="border-b bg-background"><div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 sm:px-8"><Link to="/" className="inline-flex min-h-11 items-center gap-2 text-primary" aria-label="Nexus, volver al acceso"><Sprout size={28}/><span className="text-2xl font-semibold tracking-tight">nexus.</span></Link><span className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck size={16}/> Tú tienes el control</span></div></header>
      <main className="mx-auto max-w-5xl px-5 pt-6 sm:px-8 sm:pt-10">
        <div className="mb-6 flex items-center justify-between"><Link to="/" className="flex min-h-11 items-center gap-2 text-sm font-medium text-primary"><ArrowLeft size={17}/> Volver al acceso</Link><span className="text-xs text-muted-foreground">Paso 02 de 03</span></div>
        <div aria-label="Paso 2 de 3: datos para tu plan" className="mb-8 flex gap-2"><span className="h-1 flex-1 rounded-full bg-primary/30"/><span className="h-1 flex-1 rounded-full bg-primary"/><span className="h-1 flex-1 rounded-full bg-border"/></div>
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <section><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Conexión de datos</span><h1 className="mt-3 font-editorial text-4xl leading-tight sm:text-5xl">Conoce tu presente.<br/><span className="italic text-primary">Planea tu futuro.</span></h1><p className="mt-4 text-sm leading-6 text-muted-foreground">Reúne tu ahorro y tus ingresos en un solo lugar. El primer paso para un plan que tenga sentido para ti.</p>
            <div className="mt-6 rounded-2xl border bg-card p-5"><div className="flex items-start gap-3"><span className="rounded-xl bg-secondary p-3 text-primary"><Building2 size={24}/></span><div className="min-w-0"><h2 className="font-semibold">Conectar mi AFORE</h2><span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">Próximamente</span></div></div><p className="mt-4 text-xs leading-5 text-muted-foreground">La conexión directa aún no está disponible. No solicitamos contraseñas de AFORE ni verificamos saldos o ingresos con proveedores.</p><Button disabled variant="outline" className="mt-4 h-11 w-full rounded-xl">Conexión no disponible</Button></div>
            <div className="mt-4 flex gap-3 rounded-xl bg-[hsl(var(--warning))] p-4 text-xs leading-5 text-[hsl(var(--warning-foreground))]"><Info size={18} className="shrink-0"/><p><strong>Vista previa sin guardar.</strong> No necesitas iniciar sesión para explorar este formulario. Tus datos solo permanecen en memoria durante esta vista previa y se pierden al recargar o cerrar la pestaña.</p></div>
          </section>
          <section className="min-w-0 rounded-3xl border bg-card p-5 sm:p-7" aria-labelledby="manual-title"><div className="mb-6 flex items-center gap-3"><span className="rounded-xl bg-secondary p-3 text-primary"><PencilLine size={21}/></span><div><h2 id="manual-title" className="text-lg font-semibold">Ingresa tus datos</h2><p className="text-xs text-muted-foreground">A tu ritmo. Sin conectar cuentas.</p></div></div>
            <form onSubmit={event => { event.preventDefault(); if (Number(values.retirementAge) <= Number(values.age)) return; setReview(true); }} className="space-y-5">
              <div className="space-y-2"><Label htmlFor="afore">Nombre de tu AFORE</Label><Input id="afore" required maxLength={80} value={values.afore || ""} onChange={e => update("afore", e.target.value)} placeholder="Escribe el nombre de tu AFORE" className="h-12 rounded-xl text-base"/></div>
              {moneyFields.map(([key, label, hint], index) => <div key={key} className="space-y-2">{index === 1 && <div className="mb-5 flex items-center gap-2 border-t pt-6 font-semibold"><Wallet size={19} className="text-primary"/> Tus ingresos y gastos</div>}<Label htmlFor={key}>{label}</Label><div className="relative"><span className="absolute left-4 top-3 text-muted-foreground" aria-hidden="true">$</span><Input id={key} type="number" inputMode="decimal" min="0" max="1000000000" step="0.01" required value={values[key] || ""} onChange={e => update(key, e.target.value)} placeholder="0.00" aria-describedby={`${key}-hint`} className="h-12 rounded-xl pl-8 pr-14 text-base"/><span className="absolute right-4 top-4 text-xs text-muted-foreground">MXN</span></div><p id={`${key}-hint`} className="text-xs leading-5 text-muted-foreground">{hint}</p>{index === 0 && <div className="space-y-2 pt-3"><Label htmlFor="balance-date">Fecha del saldo</Label><Input id="balance-date" type="date" min="1900-01-01" max={maxDate} required value={values.date || ""} onChange={e => update("date", e.target.value)} className="block h-12 w-full min-w-0 rounded-xl text-base"/></div>}</div>)}
              <fieldset className="space-y-4 border-t pt-5"><legend className="px-1 font-semibold">Tu horizonte de retiro</legend><p className="text-xs leading-5 text-muted-foreground">Estos datos permiten estimar tu meta y la distancia por recorrer.</p><div className="grid grid-cols-2 gap-3">{([["age", "Edad actual", 18, 89], ["retirementAge", "Edad de retiro", Number(values.age || 18) + 1, 90]] as const).map(([key, label, min, max]) => <div key={key} className="space-y-2"><Label htmlFor={key}>{label}</Label><Input id={key} type="number" inputMode="numeric" required min={min} max={max} step="1" value={values[key] || ""} onChange={event => update(key, event.target.value)} className="h-12 rounded-xl text-base"/></div>)}</div><div className="space-y-2"><Label htmlFor="desiredIncome">Ingreso mensual deseado al retirarte (MXN)</Label><Input id="desiredIncome" type="number" inputMode="decimal" required min="1" max="1000000000" step="0.01" value={values.desiredIncome || ""} onChange={event => update("desiredIncome", event.target.value)} placeholder="En pesos de hoy" className="h-12 rounded-xl text-base"/></div></fieldset>
              <p className="flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs leading-5 text-primary"><ShieldCheck size={17} className="mt-0.5 shrink-0"/>Datos ingresados por ti · No verificados por un proveedor.</p>
              <Button type="submit" className="h-12 w-full justify-between rounded-xl px-4">Revisar mis datos <ArrowRight size={18}/></Button>
              {review && <div role="status" className="space-y-3 rounded-xl border border-primary/20 bg-secondary/40 p-4 text-sm"><h3 className="font-semibold">Revisión de tus datos</h3><dl className="space-y-2 text-xs"><div className="flex flex-wrap justify-between gap-2"><dt>AFORE reportada</dt><dd className="break-all font-medium">{values.afore}</dd></div><div className="flex flex-wrap justify-between gap-2"><dt>Saldo reportado · {values.date}</dt><dd className="font-medium">{currency.format(Number(values.balance))}</dd></div><div className="flex flex-wrap justify-between gap-2"><dt>Disponible mensual estimado</dt><dd className="font-medium">{currency.format(capacity)}</dd></div></dl><p className="text-xs leading-5 text-muted-foreground">{capacity <= 0 ? "No hay capacidad disponible con estos datos. Revisa tu presupuesto antes de considerar aportaciones." : "Es el ingreso menos gastos, deudas y reserva. No es una recomendación de aportación."}</p><p className="text-xs leading-5 text-muted-foreground">No se ha guardado ni verificado información. Para guardar y continuar con un plan se requiere configurar Supabase e iniciar sesión.</p></div>}
              {review && <Button type="button" onClick={() => navigate("/inicio")} className="h-12 w-full justify-between rounded-xl">Ver mi panorama <ArrowRight size={18}/></Button>}
              <p className="text-center text-[11px] leading-5 text-muted-foreground">No se moverá dinero ni se modificará tu saldo AFORE.</p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
