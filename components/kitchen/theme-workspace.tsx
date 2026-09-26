'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Atom, Bookmark, BookOpen, Check, ChefHat, FlaskConical, Leaf, Link, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { getIngredient, matchesIngredient, noveltyLabel, pairings, type Pairing } from '@/lib/pairings';
import { filterKitchenConcepts, kitchenThemes, type KitchenConcept, type KitchenTheme } from '@/lib/kitchen-modes';
import { Food } from './food';

type SavedIdea={id:string;note:string};
const pairingFor=(c:KitchenConcept)=>pairings.find(p=>p.id===c.pairId)!;

export function ModeSwitch({mode,onChange}:{mode:string;onChange:(mode:string)=>void}){
  return <div className="kitchen-mode-switch"><span className="eyebrow">KITCHEN MODE</span><div role="group" aria-label="Kitchen mode"><button aria-pressed={mode==='explore'} onClick={()=>onChange('explore')}><Atom size={16}/>Open exploration</button>{kitchenThemes.map(t=><button key={t.id} aria-pressed={mode===t.id} onClick={()=>onChange(t.id)}><ChefHat size={16}/>{t.label}</button>)}</div></div>;
}

export function ConceptCard({concept,saved,onSave,onOpen}:{concept:KitchenConcept;saved:boolean;onSave:()=>void;onOpen:()=>void}){
  const pair=pairingFor(concept);
  return <article className="concept-card">
    <div className="concept-visual"><Food ingredient={getIngredient(pair.a)}/><span className="pair-plus">+</span><Food ingredient={getIngredient(pair.b)}/><button className={`save-icon ${saved?'saved':''}`} aria-label={`${saved?'Unsave':'Save'} ${concept.title}`} aria-pressed={saved} onClick={onSave}><Bookmark size={17} fill={saved?'currentColor':'none'}/></button><span className="concept-technique">{concept.technique}</span>{concept.plantBased&&<span className="concept-plant" aria-label="Plant-based concept"><Leaf size={15}/></span>}</div>
    <button className="concept-body" onClick={onOpen} aria-label={`Explore ${concept.title}`}>{concept.reference&&<span className="concept-reference-label">Reference · {concept.reference.tradition}</span>}<span className="concept-pair">{concept.subtitle} <span>· {noveltyLabel(pair.novelty)}</span></span><h2>{concept.title}</h2><div className="concept-roles">{concept.components.map(p=><div key={p.role}><span>{p.role}</span><strong>{p.title}</strong></div>)}</div><span className="concept-open">Open kitchen experiment <ArrowUpRight size={16}/></span></button>
  </article>;
}

export function ThemeWorkspace({theme,saved,onToggleSave,onOpen}:{theme:KitchenTheme;saved:SavedIdea[];onToggleSave:(id:string)=>void;onOpen:(c:KitchenConcept)=>void}){
  const [query,setQuery]=useState('');
  const [technique,setTechnique]=useState('all');
  const [plantOnly,setPlantOnly]=useState(false);
  const [novelty,setNovelty]=useState(1);
  const [collection,setCollection]=useState('all');
  const results=useMemo(()=>filterKitchenConcepts(theme,query,technique,plantOnly,novelty,id=>pairings.find(p=>p.id===id)!.novelty,(id,q)=>matchesIngredient(getIngredient(id),q),collection),[theme,query,technique,plantOnly,novelty,collection]);
  const reset=()=>{setQuery('');setTechnique('all');setPlantOnly(false);setNovelty(1);setCollection('all')};
  const copyLink=async()=>{const url=new URL(window.location.href);url.search='';url.searchParams.set('mode',theme.id);try{await navigator.clipboard.writeText(url.toString());toast.success('Link to this kitchen mode copied');}catch{toast.error('Copy the address from your browser to share this mode.');}};
  return <div className="theme-workspace"><section className="theme-heading"><div><span className="eyebrow"><ChefHat size={14}/> {theme.label.toUpperCase()} · VOL. 01</span><h1>{theme.title}<br/><em>{theme.accent}</em></h1><p>{theme.description}</p></div><aside className="theme-intro-note"><span className="theme-number">{theme.concepts.length}</span><div><strong>{theme.countCaption}</strong><p>{theme.collectionNote}</p><button className="text-link" onClick={copyLink}><Link size={14}/>Copy link to this mode</button></div></aside></section>
    <section className="theme-role-strip" aria-label="The dish components">{theme.roles.map((role,i)=><div key={role.name}><span>0{i+1}</span><div><strong>{role.name}</strong><small>{role.prompt}</small></div>{i<theme.roles.length-1&&<ArrowRight size={17}/>}</div>)}</section>
    <div className="theme-collections" role="group" aria-label="Kitchen collection">{[['all','All ideas'],['reference','Chinese references'],['experiment','Experiments']].map(([value,label])=><button key={value} aria-pressed={collection===value} onClick={()=>setCollection(value)}>{label}</button>)}</div><div className="theme-controls"><label className="theme-search"><Search size={17}/><input aria-label="Search kitchen ideas" placeholder={theme.searchPlaceholder} value={query} onChange={e=>setQuery(e.target.value)}/></label><label className="theme-select"><span>Cooking method</span><select aria-label="Kitchen cooking method" value={technique} onChange={e=>setTechnique(e.target.value)}><option value="all">All methods</option>{theme.techniques.map(t=><option key={t}>{t}</option>)}</select></label><label className="theme-select"><span>Show first</span><select aria-label="Kitchen adventurousness" value={novelty} onChange={e=>setNovelty(Number(e.target.value))}>{[1,2,3].map(n=><option key={n} value={n}>{noveltyLabel(n)}</option>)}</select></label><label className="theme-plant-filter"><input type="checkbox" checked={plantOnly} onChange={e=>setPlantOnly(e.target.checked)}/><Leaf size={15}/>Plant-based</label></div>
    <div className="theme-results-heading"><p aria-live="polite">{results.length} of {theme.concepts.length} kitchen ideas</p><span>Curated starting points · taste and adjust</span></div>
    <div className="concept-grid">{results.map(c=><ConceptCard key={c.id} concept={c} saved={saved.some(s=>s.id===c.id)} onSave={()=>onToggleSave(c.id)} onOpen={()=>onOpen(c)}/>)}</div>
    {results.length===0&&<div className="empty-state"><Search/><h2>No ideas in this view</h2><p>Try another ingredient or cooking method.</p><button className="button secondary" onClick={reset}>Reset kitchen filters</button></div>}
    <div className="theme-tasting-note"><FlaskConical size={20}/><div><strong>Make a small batch. Change one thing.</strong><p>Each concept includes a tasting experiment. Save the idea, record the result, and use what you learn in the next batch.</p></div></div>
  </div>;
}

function ConceptDetailBody({concept,saved,onSave,onExplorePair}:{concept:KitchenConcept;saved:SavedIdea|undefined;onSave:(id:string,note:string)=>void;onExplorePair:(p:Pairing)=>void}){
  const [note,setNote]=useState(saved?.note||'');
  const pair=pairingFor(concept);
  return <><SheetHeader className="detail-header"><span className="eyebrow">{kitchenThemes.find(t=>t.id===concept.themeId)!.label.toUpperCase()} · {concept.technique.toUpperCase()}</span><SheetTitle>{concept.title}</SheetTitle><SheetDescription>{concept.subtitle} · {noveltyLabel(pair.novelty)}{concept.plantBased?' · Plant-based':''}</SheetDescription></SheetHeader><div className="detail-images"><Food ingredient={getIngredient(pair.a)}/><span>+</span><Food ingredient={getIngredient(pair.b)}/></div><div className="detail-content concept-detail-content"><div className={`connection-chip ${pair.type}`}><Atom size={15}/>{pair.type==='bridge'?'Aroma bridge':'Culinary contrast'} · {pair.connection}</div><h3>The flavour connection</h3><p>{pair.why}</p><button className="text-link" onClick={()=>onExplorePair(pair)}>Explore the original pairing <ArrowUpRight size={14}/></button>{concept.reference&&<aside className="concept-source"><span className="eyebrow">{concept.reference.tradition}</span><p>A reference dish with a tasting variable to explore. Follow the source for the complete recipe and proportions.</p><a href={concept.reference.url} target="_blank" rel="noreferrer">{concept.reference.title}<ArrowUpRight size={14}/></a></aside>}<div className="concept-recipe">{concept.components.map((p,i)=><section key={p.role}><span className="concept-step">0{i+1}</span><div><span className="eyebrow">{p.role}</span><h3>{p.title}</h3><p>{p.instruction}</p></div></section>)}</div><div className="dish-idea"><span className="eyebrow"><ChefHat size={14}/>AT THE STOVE</span><p>{concept.method}</p></div><div className="concept-experiment"><span className="eyebrow"><FlaskConical size={14}/>ONE THING TO TEST</span><p>{concept.experiment}</p></div><label className="notes-label" htmlFor="concept-tasting-notes"><BookOpen size={15}/>Your tasting notes</label><textarea id="concept-tasting-notes" maxLength={4000} placeholder="Batch A / batch B · proportions · texture · what changed…" value={note} onChange={e=>setNote(e.target.value)}/><button className="button primary save-detail" onClick={()=>onSave(concept.id,note)}>{saved?<Check size={17}/>:<Bookmark size={17}/>} {saved?'Update notebook':'Save to notebook'}</button><p className="detail-disclaimer">{concept.reference?'These notes adapt a reference dish for comparison; follow the linked recipe for a complete formula.':'A kitchen experiment, not a tested recipe. Adapt it to your dough and service.'} {concept.plantBased?'Plant-based applies to all suggested components; choose suitable wrappers, miso and other prepared products. ':''}Ingredient images show the featured pairing.</p></div></>;
}

export function ConceptDetail({concept,saved,onClose,onSave,onExplorePair}:{concept:KitchenConcept|null;saved:SavedIdea[];onClose:()=>void;onSave:(id:string,note:string)=>void;onExplorePair:(p:Pairing)=>void}){
  return <Sheet open={!!concept} onOpenChange={open=>{if(!open)onClose()}}><SheetContent className="pairing-detail" side="right">{concept&&<ConceptDetailBody key={concept.id} concept={concept} saved={saved.find(s=>s.id===concept.id)} onSave={onSave} onExplorePair={onExplorePair}/>}</SheetContent></Sheet>;
}
