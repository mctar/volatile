export type KitchenComponent = { role: string; title: string; instruction: string; ingredients: string[] };
export type KitchenConcept = {
  id: string; themeId: string; title: string; subtitle: string; pairId: string;
  technique: string; plantBased: boolean; components: KitchenComponent[];
  method: string; experiment: string;
  reference?: {tradition:string; title:string; url:string};
};
export type KitchenTheme = {
  id: string; label: string; title: string; accent: string; description: string;
  collectionNote: string; countCaption: string; searchPlaceholder: string;
  roles: {name:string; prompt:string}[];
  techniques: string[];
  concepts: KitchenConcept[];
};

const component=(role:string,title:string,instruction:string,ingredients:string[]=[]):KitchenComponent=>({role,title,instruction,ingredients});
const wrapper=(instruction:string)=>component('Wrapper','Wheat & water',instruction,['wheat-flour']);

const dumplingConcepts:KitchenConcept[]=[
  {
    id:'dumpling-pork-napa-jiaozi',themeId:'dumpling',title:'Pork & napa jiaozi',
    subtitle:'Pork × napa cabbage',pairId:'napa-cabbage:pork',technique:'Boil',plantBased:false,
    reference:{tradition:'Chinese jiaozi',title:'King Arthur Baking · Pork and Cabbage Dumplings',url:'https://www.kingarthurbaking.com/recipes/pork-and-cabbage-dumplings-recipe'},
    components:[
      component('Wrapper','Wheat & water','Use a rested wheat-flour dough, rolled thinner at the rim for a secure seal.',['wheat-flour']),
      component('Filling','Pork & napa cabbage','Salt and squeeze finely chopped napa. Mix chilled raw minced pork with ginger, scallion, light soy, a little Shaoxing wine, sesame oil and white pepper; fold in the cabbage.',['pork','napa-cabbage','ginger','scallion','soy-sauce','shaoxing-wine','sesame-oil','white-pepper']),
      component('Sauce','Black vinegar','Serve vinegar separately so each tasting can begin with the filling alone.',['black-vinegar']),
      component('Finish','Fresh ginger','Offer a few fine ginger threads alongside the dip.',['ginger']),
    ],
    method:'Keep the filling chilled during assembly. Seal small half-moons, expelling trapped air. Boil until both dough and pork are fully cooked, then drain and serve. Cook a small filling sample fully when checking seasoning.',
    experiment:'Compare two cabbage-to-pork proportions with the same wrapper and seasoning. Record the squeezed cabbage weight and compare juiciness, cohesion and leakage.',
  },
  {
    id:'dumpling-pork-garlic-chive',themeId:'dumpling',title:'Pork & garlic-chive jiaozi',
    subtitle:'Pork × Chinese garlic chives',pairId:'garlic-chive:pork',technique:'Pan-fry & steam',plantBased:false,
    reference:{tradition:'Chinese jiaozi',title:'The Woks of Life · Pork and Chive Dumplings',url:'https://thewoksoflife.com/pork-chive-dumplings/'},
    components:[
      component('Wrapper','Wheat & water','Use a supple wheat wrapper with a thin rim and a slightly stronger centre.',['wheat-flour']),
      component('Filling','Pork & garlic chives','Work ginger-scallion water gradually into chilled raw minced pork until cohesive. Season with light soy, oyster sauce, sesame oil and white pepper. Fold in finely chopped Chinese garlic chives.',['pork','garlic-chive','ginger','scallion','soy-sauce','oyster-sauce','sesame-oil','white-pepper']),
      component('Sauce','Black vinegar & chilli oil','Offer a restrained vinegar dip with chilli oil on the side.',['black-vinegar','chilli-oil']),
      component('Finish','Crisp base','Uncover at the end of cooking so the base becomes crisp again.'),
    ],
    method:'Keep the filling chilled, fill and seal crescents. Brown the bases in neutral oil, add water and cover to steam until the pork and dough are fully cooked. Uncover to evaporate remaining water. Taste only fully cooked samples.',
    experiment:'Hold the chive amount constant and vary the added aromatic water between two small batches. Compare a juicy, cohesive centre with filling that releases loose liquid.',
  },
  {
    id:'dumpling-har-gow',themeId:'dumpling',title:'Har gow',
    subtitle:'Prawn × bamboo shoots',pairId:'bamboo-shoot:prawn',technique:'Steam',plantBased:false,
    reference:{tradition:'Cantonese dim sum',title:'The Woks of Life · Har Gow',url:'https://thewoksoflife.com/har-gow/'},
    components:[
      component('Wrapper','Wheat starch & tapioca','Use a tested crystal-wrapper formula with boiling water and a little oil. Keep the dough covered; wheat flour behaves differently.',['wheat-starch','tapioca-starch']),
      component('Filling','Prawn & bamboo','Mix chilled raw prawns until tacky while retaining some pieces. Add finely chopped commercially cooked bamboo shoots, a little oyster sauce, sesame oil, ginger and white pepper.',['prawn','bamboo-shoot','oyster-sauce','sesame-oil','ginger','white-pepper']),
      component('Sauce','Optional light soy','Taste the dumpling plain first; offer a little light soy separately.',['soy-sauce']),
      component('Finish','Immediate service','Steam on a lined tray with space between parcels and serve promptly.'),
    ],
    method:'Follow the linked reference for a complete dough formula. Press thin rounds, fill modestly and pleat gently. Steam until the wrapper is cooked and the prawns are fully cooked through. Assess the wrapper and filling together while hot.',
    experiment:'Keep filling weight fixed and compare two wrapper thicknesses. Record sealing failures, cooked bite and how clearly the prawn remains the centre of the dish.',
  },
  {
    id:'dumpling-siu-mai',themeId:'dumpling',title:'Pork & prawn siu mai',
    subtitle:'Pork × prawn',pairId:'pork:prawn',technique:'Steam',plantBased:false,
    reference:{tradition:'Cantonese dim sum',title:'Made With Lau · Chef Lau’s Siu Mai',url:'https://www.madewithlau.com/recipes/siu-mai'},
    components:[
      component('Wrapper','Thin siu mai skin','Choose thin yellow siu mai wrappers; cup them around the filling with the top open.',['wheat-flour','egg']),
      component('Filling','Pork, prawn & shiitake','Mix chilled raw minced pork and chopped raw prawns with finely chopped prepared shiitake. Season with oyster sauce, light soy, white pepper and sesame oil; mix to a cohesive filling.',['pork','prawn','mushroom','oyster-sauce','soy-sauce','white-pepper','sesame-oil']),
      component('Sauce','Optional chilli oil','Offer separately after a plain tasting to judge the filling on its own.',['chilli-oil']),
      component('Finish','Carrot dice','Top with a few fine carrot dice before steaming.',['carrot']),
    ],
    method:'Use the linked recipe for a complete filling formula and binding method. Keep the mixture chilled, form evenly sized open cups and flatten the bases. Steam on a lined tray until pork and prawns are fully cooked through.',
    experiment:'Use the same pork-to-prawn ratio in both batches. Vary only how finely the prawns are chopped, then compare cohesion, spring and distinct seafood bites.',
  },

  {
    id:'dumpling-shiitake-chestnut',themeId:'dumpling',title:'Woodland potstickers',
    subtitle:'Shiitake × chestnut',pairId:'chestnut:mushroom',technique:'Pan-fry & steam',plantBased:true,
    components:[
      wrapper('Use a thin, egg-free wheat wrapper; keep the sealing edge free of filling.'),
      component('Filling','Shiitake & chestnut','Sauté finely chopped shiitake until dry. Fold in crumbled cooked chestnut and cool.',['mushroom','chestnut']),
      component('Sauce','Soy & lemon','Loosen soy sauce with water and a little lemon juice; serve alongside.',['soy-sauce','lemon']),
      component('Finish','Chive','Snip chives over the dumplings just before serving.',['chive']),
    ],
    method:'Seal small half-moons. Brown their bases in a little neutral oil, add a splash of water and cover to steam until the wrapper is cooked. Uncover to re-crisp the base.',
    experiment:'Keep the mushroom weight fixed. Compare a little chestnut with twice that amount: does extra sweetness soften the woodland character?',
  },
  {
    id:'dumpling-prawn-ginger',themeId:'dumpling',title:'Ginger prawn parcels',
    subtitle:'Prawn × ginger',pairId:'ginger:prawn',technique:'Steam',plantBased:false,
    components:[
      wrapper('Choose a thin wheat wrapper suitable for steaming. Pleat loosely around a small filling.'),
      component('Filling','Prawn & ginger','Chop cooked, cooled prawns and fold through a little finely grated ginger.',['prawn','ginger']),
      component('Sauce','Lime & soy','Mix lime juice, soy sauce and water for a light, sharp dip.',['lime','soy-sauce']),
      component('Finish','Coriander','Add a few small leaves after steaming.',['coriander']),
    ],
    method:'Seal the parcels and place on a lined steamer with space between them. Steam until the dough is cooked and the filling is hot through; serve immediately with the dip.',
    experiment:'Split one filling batch. Use half as much ginger in one half and taste both without sauce first: where does the prawn sweetness disappear?',
  },
  {
    id:'dumpling-pork-apple',themeId:'dumpling',title:'Pork & apple crescents',
    subtitle:'Pork × apple',pairId:'apple:pork',technique:'Pan-fry & steam',plantBased:false,
    components:[
      wrapper('Use a medium wheat wrapper with enough strength for a juicy filling.'),
      component('Filling','Pork & apple','Combine finely chopped cooked pork with small apple dice, sautéed until their excess moisture evaporates. Cool before filling.',['pork','apple']),
      component('Sauce','Mustard & lemon','Whisk prepared mustard with lemon juice, water and a little neutral oil.',['mustard-seed','lemon']),
      component('Finish','Fennel fronds','Use a few tender fronds for a fresh anise note.',['fennel']),
    ],
    method:'Seal in crescents. Brown in a lightly oiled pan, add water and cover to steam until the wrapper is cooked and the filling is hot through. Uncover to crisp.',
    experiment:'Compare finely diced apple with grated, squeezed apple at the same weight. Track juiciness, distinct fruit bursts and whether the seam stays intact.',
  },
  {
    id:'dumpling-pumpkin-sage',themeId:'dumpling',title:'Pumpkin & sage pillows',
    subtitle:'Pumpkin × sage',pairId:'pumpkin:sage',technique:'Boil',plantBased:false,
    components:[
      component('Wrapper','Egg pasta','Roll a thin sheet of your usual egg pasta dough and seal into small pillows.',['egg']),
      component('Filling','Roasted pumpkin','Roast pumpkin until concentrated, mash and cool. Avoid a loose, watery purée.',['pumpkin']),
      component('Sauce','Sage butter','Warm sage leaves in butter until fragrant; loosen with a little cooking water.',['sage','butter']),
      component('Finish','Hazelnut','Scatter finely chopped toasted hazelnuts at the pass.',['hazelnut']),
    ],
    method:'Seal small spoonfuls between pasta sheets, pressing out air. Boil gently until the pasta is tender, then transfer to the sage butter and coat lightly.',
    experiment:'Serve identical pillows with briefly infused sage butter and a longer infusion. Look for the point where herbal aroma starts to obscure pumpkin sweetness.',
  },
  {
    id:'dumpling-potato-miso',themeId:'dumpling',title:'Miso potato half-moons',
    subtitle:'Potato × miso',pairId:'miso:potato',technique:'Boil',plantBased:true,
    components:[
      wrapper('Use a supple, egg-free wheat dough and roll a little thicker than a wonton wrapper.'),
      component('Filling','Potato & white miso','Mash cooked potatoes, steam off excess moisture, then season with a little plant-based white miso. Cool.',['potato','miso']),
      component('Sauce','Leek & olive oil','Soften sliced leek in olive oil and loosen with a little cooking water.',['leek','olive']),
      component('Finish','Chive','Finish with fresh chive and a few drops of lemon.',['chive','lemon']),
    ],
    method:'Cut dough rounds, add small spoonfuls of filling and seal as half-moons. Boil gently until the dough is cooked, then lift into the warm leek dressing.',
    experiment:'Make one batch with a trace of miso and another with twice the miso. Keep final saltiness comparable and test whether fermentation adds depth or dominates.',
  },
  {
    id:'dumpling-aubergine-sesame',themeId:'dumpling',title:'Smoky sesame parcels',
    subtitle:'Aubergine × sesame',pairId:'aubergine:sesame',technique:'Steam',plantBased:true,
    components:[
      wrapper('Use thin, egg-free wheat wrappers. Keep the filling compact enough to hold its shape.'),
      component('Filling','Roasted aubergine','Roast aubergine, drain the flesh thoroughly and chop. Fold in a small spoonful of tahini.',['aubergine','tahini']),
      component('Sauce','Lemon tahini','Whisk tahini with lemon juice and water until it pours lightly.',['tahini','lemon']),
      component('Finish','Toasted sesame','Add toasted sesame and a few coriander leaves.',['sesame','coriander']),
    ],
    method:'Cool the filling before folding into sealed parcels. Steam on a lined tray until the dough is cooked and the filling is hot through. Spoon sauce around, rather than over, the parcels.',
    experiment:'Compare ordinary roast aubergine with a more deeply charred batch. Hold tahini constant and taste for a pleasant smoky finish versus lingering bitterness.',
  },
  {
    id:'dumpling-lamb-apricot',themeId:'dumpling',title:'Lamb & apricot bundles',
    subtitle:'Lamb × apricot',pairId:'apricot:lamb',technique:'Steam',plantBased:false,
    components:[
      wrapper('Roll wheat dough into small rounds with a slightly thicker centre to support the filling.'),
      component('Filling','Lamb & apricot','Finely chop cooked braised lamb. Fold in a few small pieces of cooked apricot; reduce any braising juices before adding. Cool.',['lamb','apricot']),
      component('Sauce','Mint yoghurt','Stir chopped mint into plain yoghurt with a little lemon.',['mint','yoghurt','lemon']),
      component('Finish','Sumac','Add a small pinch of sumac immediately before serving.',['sumac']),
    ],
    method:'Gather and seal the rounds into small bundles. Steam until the wrapper is cooked and the filling is hot through. Serve on a spoonful of mint yoghurt.',
    experiment:'Test two apricot proportions against the same lamb base. Aim for occasional fruit brightness before the filling reads as sweet.',
  },
  {
    id:'dumpling-beetroot-ricotta',themeId:'dumpling',title:'Beetroot & ricotta ravioli',
    subtitle:'Beetroot × ricotta',pairId:'beetroot:ricotta',technique:'Boil',plantBased:false,
    components:[
      component('Wrapper','Egg pasta','Roll thin sheets of egg pasta and leave a generous border for sealing.',['egg']),
      component('Filling','Beetroot & ricotta','Finely chop roasted beetroot and combine with well-drained ricotta. Keep the mixture firm.',['beetroot','ricotta']),
      component('Sauce','Lemon butter','Emulsify butter with a little pasta water and lemon juice.',['butter','lemon']),
      component('Finish','Dill','Tear small fronds over the warm ravioli.',['dill']),
    ],
    method:'Seal small portions between pasta sheets, expelling trapped air. Boil gently until tender and lift into the lemon butter, taking care not to break the parcels.',
    experiment:'Compare beetroot folded into the ricotta with a small beetroot core inside it. Taste how the same ingredients change when their textures stay separate.',
  },
  {
    id:'dumpling-corn-miso',themeId:'dumpling',title:'Sweetcorn miso potstickers',
    subtitle:'Sweetcorn × miso',pairId:'corn:miso',technique:'Pan-fry & steam',plantBased:true,
    components:[
      wrapper('Use thin, egg-free wheat wrappers for a crisp base.'),
      component('Filling','Sweetcorn, tofu & miso','Mix chopped cooked corn with pressed, crumbled tofu and a little plant-based miso. Sauté to remove moisture, then cool.',['corn','tofu','miso']),
      component('Sauce','Lime & chilli','Mix lime juice, finely chopped chilli, water and a little neutral oil.',['lime','chilli']),
      component('Finish','Toasted nori','Add finely crumbled toasted nori just before serving.',['nori']),
    ],
    method:'Seal the filling in small pleated crescents. Brown the bases, add a splash of water and steam covered until cooked through. Uncover to restore the crisp base.',
    experiment:'Use the same corn weight in both batches: leave one chunky and finely crush the other. Compare sweetness release and the contrast with the crisp wrapper.',
  },
  {
    id:'dumpling-shiitake-tea',themeId:'dumpling',title:'Shiitake in a tea broth',
    subtitle:'Shiitake × green tea',pairId:'green-tea:mushroom',technique:'Steam',plantBased:true,
    components:[
      wrapper('Choose thin, egg-free wheat wrappers; keep the dumplings small for spoon service.'),
      component('Filling','Shiitake & shallot','Sauté finely chopped shiitake and shallot until their moisture evaporates. Cool before folding.',['mushroom','shallot']),
      component('Sauce','Green tea broth','Make a light vegetable and mushroom broth. Off the heat, briefly infuse green tea and strain.',['green-tea','mushroom']),
      component('Finish','Lemon zest','Add a few fine strands at the last moment.',['lemon']),
    ],
    method:'Steam the sealed dumplings until the dough is cooked and the filling is hot through. Place in warm bowls and pour a little freshly infused broth around each portion.',
    experiment:'Split the broth before adding tea. Infuse one portion lightly and the other longer, then compare bitterness and how clearly the mushroom still comes through.',
  },
  {
    id:'dumpling-pear-blue-cheese',themeId:'dumpling',title:'Pear & blue cheese parcels',
    subtitle:'Pear × blue cheese',pairId:'blue-cheese:pear',technique:'Boil',plantBased:false,
    components:[
      component('Wrapper','Egg pasta','Roll thin pasta sheets and seal into small parcels.',['egg']),
      component('Filling','Pear & blue cheese','Sauté small pear dice until excess juice evaporates. Cool and fold through a restrained amount of blue cheese.',['pear','blue-cheese']),
      component('Sauce','Light butter emulsion','Loosen melted butter with cooking water; keep the coating light.',['butter']),
      component('Finish','Walnut & black pepper','Add finely chopped toasted walnuts and freshly cracked pepper.',['walnut','pepper']),
    ],
    method:'Keep each parcel small and seal firmly around the cooled filling. Boil gently until the pasta is tender, then lift into the butter emulsion and finish immediately.',
    experiment:'Change only the blue cheese amount between two batches. Find the lowest level that leaves a clear savoury finish while the pear remains recognisable.',
  },
  {
    id:'dumpling-cherry-pepper',themeId:'dumpling',title:'Cherry & black pepper pockets',
    subtitle:'Cherry × black pepper',pairId:'cherry:pepper',technique:'Boil',plantBased:true,
    components:[
      wrapper('Use a supple, egg-free wheat dough; roll thick enough to contain fruit juice.'),
      component('Filling','Reduced cherry','Pit cherries, cook with a little sugar and reduce their juice until the mixture holds together. Cool fully.',['cherry']),
      component('Sauce','Peppered cherry juice','Reserve a little cherry juice and warm with a trace of cracked black pepper.',['cherry','pepper']),
      component('Finish','Toasted almond','Add finely chopped toasted almond after saucing.',['almond']),
    ],
    method:'Fill and firmly seal small pockets, keeping juice off the edges. Boil gently until the dough is cooked, then lift carefully and serve with a little peppered juice.',
    experiment:'Divide the sauce and compare a trace of pepper with twice as much. Taste warm: look for aromatic lift before pepper heat overwhelms the fruit.',
  },
];

export const kitchenThemes:KitchenTheme[]=[{
  id:'dumpling',label:'Dumpling mode',title:'A world inside',accent:'a wrapper.',
  description:'Start with a flavour connection. Give it a filling, a wrapper and a reason to take another bite.',
  collectionNote:'Four Chinese reference dishes, plus twelve experiments. Explore the foundations, then change one thing.',
  countCaption:'ideas to fold, taste & refine',searchPlaceholder:'Try mushroom, shrimp, sesame…',
  roles:[{name:'Wrapper',prompt:'Structure & bite'},{name:'Filling',prompt:'The heart of it'},{name:'Sauce',prompt:'Balance & contrast'},{name:'Finish',prompt:'The last aromatic note'}],
  techniques:['Steam','Pan-fry & steam','Boil'],concepts:dumplingConcepts,
}];
export const kitchenConcepts=kitchenThemes.flatMap(t=>t.concepts);
export const getKitchenConcept=(id:string)=>kitchenConcepts.find(c=>c.id===id);
export function filterKitchenConcepts(theme:KitchenTheme,query:string,technique:string,plantOnly:boolean,novelty:number,pairNovelty:(id:string)=>number,ingredientMatches:(id:string,query:string)=>boolean,collection='all'){
  const words=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return theme.concepts.filter(c=>(collection==='all'||(collection==='reference'?!!c.reference:!c.reference))&&(technique==='all'||c.technique===technique)&&(!plantOnly||c.plantBased)&&words.every(word=>[c.title,c.subtitle,c.reference?.tradition||'',...c.components.flatMap(p=>[p.title,p.instruction])].join(' ').toLowerCase().includes(word)||c.components.some(p=>p.ingredients.some(id=>ingredientMatches(id,word))))).sort((a,b)=>Math.abs(pairNovelty(a.pairId)-novelty)-Math.abs(pairNovelty(b.pairId)-novelty));
}
export function formatKitchenConcept(c:KitchenConcept){
  return `${c.title} — ${kitchenThemes.find(t=>t.id===c.themeId)!.label}\n${c.subtitle} · ${c.technique}\n\n${c.components.map(p=>`${p.role}: ${p.title}\n${p.instruction}`).join('\n\n')}\n\nMethod: ${c.method}\n\nTasting experiment: ${c.experiment}${c.reference?`\n\nCulinary reference: ${c.reference.title}\n${c.reference.url}`:''}`;
}
