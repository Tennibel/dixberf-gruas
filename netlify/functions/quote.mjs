const response=(statusCode,message)=>({statusCode,headers:{'Content-Type':'application/json','Cache-Control':'no-store'},body:JSON.stringify({message})});
const services=new Set(['Grúas industriales','Grúas telescópicas','Grúa HIAB','Maniobras industriales','Transporte de maquinaria pesada','Montacargas','Necesito asesoría']);
export function validateQuote(data){
 if(!data||typeof data!=='object'||Array.isArray(data))return false;
 const bounds={name:[2,100],phone:[10,20],service:[1,80],message:[10,2000],location:[2,200],date:[10,10]};
 for(const [key,[min,max]] of Object.entries(bounds)){if(typeof data[key]!=='string'||data[key].trim().length<min||data[key].length>max)return false;}
 for(const [key,max] of Object.entries({company:150,weight:80,page:300,website:200})){if(data[key]!==undefined&&(typeof data[key]!=='string'||data[key].length>max))return false;}
 return /^[+0-9 ()-]{10,20}$/.test(data.phone)&&data.phone.replace(/\D/g,'').length>=10&&data.phone.replace(/\D/g,'').length<=15&&/^\d{4}-\d{2}-\d{2}$/.test(data.date)&&!Number.isNaN(Date.parse(data.date))&&new Date(data.date).toISOString().slice(0,10)===data.date&&services.has(data.service)&&data.privacy==='on'&&typeof data['cf-turnstile-response']==='string'&&data['cf-turnstile-response'].length>0&&data['cf-turnstile-response'].length<=2048;
}
export async function handler(event){
 if(event.httpMethod!=='POST')return response(405,'Método no permitido.');
 const origin=process.env.SITE_ORIGIN||'https://dixberfgruas.com.mx';
 if(event.headers.origin!==origin)return response(403,'Origen no permitido.');
 if(!event.headers['content-type']?.includes('application/json'))return response(415,'Formato no permitido.');
 if(!event.body||Buffer.byteLength(event.body)>12000)return response(413,'Solicitud demasiado grande.');
 let data;try{data=JSON.parse(event.body);}catch{return response(400,'Solicitud no válida.');}
 if(data?.website)return response(400,'Solicitud no válida.');
 if(!validateQuote(data))return response(400,'Revisa los campos y la verificación.');
 const {TURNSTILE_SECRET_KEY,RESEND_API_KEY,QUOTE_FROM_EMAIL,QUOTE_TO_EMAIL}=process.env;
 if(!TURNSTILE_SECRET_KEY||!RESEND_API_KEY||!QUOTE_FROM_EMAIL||!QUOTE_TO_EMAIL)return response(503,'Envío no configurado. Contacta por teléfono o WhatsApp.');
 try{
  const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:TURNSTILE_SECRET_KEY,response:data['cf-turnstile-response']}),signal:AbortSignal.timeout(7000)});
  const check=await verification.json();
  if(!verification.ok||!check.success||check.hostname!==new URL(origin).hostname||check.action!=='quote')return response(403,'No fue posible validar la solicitud.');
  const fields={Nombre:data.name,Teléfono:data.phone,Empresa:data.company||'No indicada',Servicio:data.service,Descripción:data.message,Ubicación:data.location,Fecha:data.date,Peso:data.weight||'Por definir',Página:data.page||'/contacto/','Consentimiento de privacidad':'Aceptado','Fecha de solicitud':new Date().toISOString()};
  const delivered=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:QUOTE_FROM_EMAIL,to:[QUOTE_TO_EMAIL],subject:'Nueva solicitud de cotización · DIXBERF',text:Object.entries(fields).map(([k,v])=>`${k}: ${v}`).join('\n\n')}),signal:AbortSignal.timeout(8000)});
  if(!delivered.ok)return response(502,'No fue posible entregar la solicitud.');
  return response(200,'Solicitud recibida.');
 }catch{return response(502,'No fue posible enviar la solicitud. Inténtalo de nuevo.');}
}
