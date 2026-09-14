import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logoAsset from "@/assets/DC_Logo.png.asset.json";
import { gallery, services } from "@/lib/site-data";

function NavLinks({onClick}:{onClick?:()=>void}) { return <><Link to="/" onClick={onClick}>Home</Link><Link to="/about" onClick={onClick}>About</Link><Link to="/services" onClick={onClick}>Services</Link><Link to="/portfolio" onClick={onClick}>Portfolio</Link><Link to="/contact" search={{eventType:""}} onClick={onClick}>Contact</Link></>; }

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
    <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-24 lg:grid-cols-[auto_1fr_auto]">
      <Link to="/" className="brand-lockup" aria-label="Dream Corner home"><img src={logoAsset.url} alt="Dream Corner — Creating Infinite Memories" /></Link>
      <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Main navigation">
        <Link to="/" className="nav-link" activeProps={{className:"nav-link nav-link-active"}}>Home</Link><Link to="/about" className="nav-link" activeProps={{className:"nav-link nav-link-active"}}>About</Link><Link to="/services" className="nav-link" activeProps={{className:"nav-link nav-link-active"}}>Services</Link><Link to="/portfolio" className="nav-link" activeProps={{className:"nav-link nav-link-active"}}>Portfolio</Link><Link to="/contact" search={{eventType:""}} className="nav-link" activeProps={{className:"nav-link nav-link-active"}}>Contact</Link>
      </nav>
      <Link to="/contact" search={{eventType:""}} className="button-primary hidden lg:inline-flex">Plan Your Event <ArrowRight size={16}/></Link>
      <button className="icon-button lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="mobile-menu lg:hidden" aria-label="Mobile navigation">
      <NavLinks onClick={() => setOpen(false)}/>
      <Link to="/contact" search={{eventType:""}} onClick={() => setOpen(false)} className="button-gold">Plan Your Event <ArrowRight size={16}/></Link>
    </nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="bg-ink text-ivory">
    <div className="site-container grid gap-12 py-16 md:grid-cols-12">
      <div className="md:col-span-5"><img className="footer-logo" src={logoAsset.url} alt="Dream Corner logo"/><p className="mt-5 max-w-md text-sm leading-7 text-ivory-muted">A women-led event company creating thoughtful celebrations with premium quality, personal attention and respect for every budget.</p></div>
      <div className="grid grid-cols-2 gap-8 text-sm md:col-span-7 md:grid-cols-3">
        <div><FooterTitle>Explore</FooterTitle><Link to="/about" className="footer-link">About</Link><Link to="/services" className="footer-link">Services</Link><Link to="/portfolio" className="footer-link">Portfolio</Link><Link to="/contact" search={{eventType:""}} className="footer-link">Contact</Link></div>
        <div><FooterTitle>Celebrations</FooterTitle>{services.slice(0,4).map(s => <Link key={s.slug} to="/services" hash={s.slug} className="footer-link">{s.title}</Link>)}</div>
        <div><FooterTitle>Begin</FooterTitle><Link to="/contact" search={{eventType:""}} className="footer-link text-gold">Plan Your Event</Link><span className="footer-link">Social links coming soon</span></div>
      </div>
    </div>
    <div className="border-t border-ivory-faint"><div className="site-container flex flex-col gap-3 py-6 text-xs text-ivory-muted sm:flex-row sm:justify-between"><span>© 2026 Dream Corner. Creating Infinite Memories.</span><span><Link to="/privacy" className="hover:text-ivory">Privacy Policy</Link> · <Link to="/terms" className="hover:text-ivory">Terms &amp; Conditions</Link></span></div></div>
  </footer>;
}
function FooterTitle({children}:{children:ReactNode}) { return <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gold">{children}</p>; }

export function SiteLayout({ children }: { children: ReactNode }) { return <div className="min-h-screen overflow-x-hidden bg-background"><SiteHeader/><main>{children}</main><SiteFooter/></div>; }

export function Eyebrow({ children, light=false }: { children: ReactNode; light?: boolean }) { return <p className={`eyebrow ${light ? "text-gold" : "text-gold"}`}>{children}</p>; }
export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <section className="page-intro"><div className="site-container grid gap-8 md:grid-cols-12"><div className="md:col-span-8"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1></div><p className="md:col-span-4 md:self-end">{copy}</p></div></section>; }

export function TemporaryImage({src, alt, className="", eager=false, width=1280, height=960}:{src:string; alt:string; className?:string; eager?:boolean; width?:number; height?:number}) {
  return <figure className={`temporary-image ${className}`}><img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"}/><figcaption>Temporary editorial image · replace with Dream Corner photography</figcaption></figure>;
}

export function GoldMotif({ className="" }: { className?: string }) { return <svg className={`gold-motif ${className}`} viewBox="0 0 220 90" fill="none" aria-hidden="true"><path d="M8 45c34-54 70-54 102 0s68 54 102 0M42 45c20-29 41-29 68 0s48 29 68 0" stroke="currentColor" strokeWidth="1.2"/><circle cx="110" cy="45" r="4" fill="currentColor"/></svg>; }

export function PortfolioGallery({ limit }: { limit?: number }) {
  const categories = ["All Events", "Themed Birthdays", "Traditional Events", "Weddings", "Corporate Events"];
  const [filter,setFilter]=useState("All Events"); const [active,setActive]=useState<number|null>(null);
  const items = gallery.filter(i => filter === "All Events" || i.category === filter).slice(0, limit);
  useEffect(() => { if(active===null) return; const key=(e:KeyboardEvent)=>{if(e.key==="Escape")setActive(null);if(e.key==="ArrowRight")setActive((active+1)%items.length);if(e.key==="ArrowLeft")setActive((active-1+items.length)%items.length)}; window.addEventListener("keydown",key); return()=>window.removeEventListener("keydown",key);},[active,items.length]);
  return <>
    {!limit && <div className="filter-row" role="group" aria-label="Filter portfolio">{categories.map(c=><button key={c} onClick={()=>{setFilter(c);setActive(null)}} className={filter===c?"filter-active":""}>{c}</button>)}</div>}
    <div className="gallery-grid">{items.map((item,index)=><button key={`${item.category}-${index}`} className="gallery-item" onClick={()=>setActive(index)}><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy"/><span>{item.category}</span><small>Temporary image</small></button>)}</div>
    {active!==null && items[active] && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Portfolio image preview"><button className="lightbox-close" onClick={()=>setActive(null)} aria-label="Close preview"><X/></button><button className="lightbox-prev" onClick={()=>setActive((active-1+items.length)%items.length)} aria-label="Previous image"><ChevronLeft/></button><img src={items[active].src} alt={items[active].alt}/><button className="lightbox-next" onClick={()=>setActive((active+1)%items.length)} aria-label="Next image"><ChevronRight/></button><p>{items[active].category} · Temporary editorial image</p></div>}
  </>;
}