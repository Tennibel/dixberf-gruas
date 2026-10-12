export const site = {
 name:'DIXBERF', url:(import.meta.env.PUBLIC_SITE_URL||'https://dixberfgruas.com.mx').replace(/\/$/,''), phone:'722 474 7458', phoneHref:'tel:+527224747458', whatsapp:'525525194278', email:'cotizaciones@dixberfgruas.com.mx',
 google:import.meta.env.PUBLIC_GOOGLE_BUSINESS_URL || '',
};
export const whatsapp=(message='Hola, necesito cotizar una maniobra. ¿Me ayudan a elegir el equipo?')=>`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const equipment=[
 {name:'Grove TMS700E',type:'Grúa telescópica',image:'telescopica',spec:'Pluma de 11 a 33.5 m',description:'Pluma sincronizada de cuatro secciones. Altura de punta de 35.9 m y hasta 52.6 m con extensión de celosía.',slug:'gruas-telescopicas'},
 {name:'Grove TMS300LP',type:'Grúa telescópica',image:'grove35',spec:'35 toneladas',description:'Pluma trapezoidal con alta relación resistencia-peso para izajes y montajes industriales.',slug:'renta-gruas-industriales'},
 {name:'Simon RO TC4792',type:'Camión grúa',image:'titan',spec:'21 toneladas',description:'Radio máximo de 24 m. Cama de 6.4 × 2.4 m y cuatro estabilizadores hidráulicos.',slug:'grua-hiab'},
 {name:'HIAB 360E-3',type:'Grúa articulada',image:'hiab',spec:'15 toneladas',description:'Carga, traslada y coloca. Perfil bajo para trabajar en espacios restringidos.',slug:'grua-hiab'},
 {name:'Hyster',type:'Montacargas',image:'montacargas',spec:'5 toneladas',description:'Para interiores y exteriores con terreno irregular. Gas o combustible: sin paros por carga de baterías.',slug:'renta-montacargas'},
 {name:'Freightliner Columbia 120',type:'Transporte especializado',image:'transporte',spec:'Cobertura nacional',description:'Tractocamiones con plataformas, camas bajas y tortons para rutas largas y carga pesada.',slug:'transporte-maquinaria-pesada'},
];
export const projects=[{image:'puente',title:'Montaje de prefabricados',tag:'IZAJE Y MONTAJE'},{image:'maniobra',title:'Maniobras dentro de planta',tag:'MANIOBRAS INDUSTRIALES'},{image:'estructura',title:'Montaje de estructuras',tag:'CONSTRUCCIÓN'},{image:'hiab',title:'Colocación con grúa articulada',tag:'GRÚA HIAB'},{image:'transporte',title:'Traslado de carga pesada',tag:'TRANSPORTE'},{image:'montacargas',title:'Movimiento de maquinaria',tag:'REUBICACIÓN'}];
