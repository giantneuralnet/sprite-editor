const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const storage=new Map();const els=new Map();const c={clearRect(){},drawImage(){},putImageData(){},fillRect(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},strokeRect(){}};
function el(){return {style:{setProperty(k,v){this[k]=v}},dataset:{},value:'',open:false,hidden:false,children:[],listeners:{},classList:{toggle(){}},setAttribute(k,v){this[k]=v},replaceChildren(){this.children=[]},append(b){this.children.push(b)},addEventListener(t,f){this.listeners[t]=f},getContext:()=>c,getBoundingClientRect:()=>({left:0,top:0,width:1024,height:1024}),setPointerCapture(){},showModal(){this.open=true},close(){this.open=false;this.listeners.close?.()},focus(){},click(){this.onclick?.()}}}
const document={getElementById:id=>{if(!els.has(id))els.set(id,el());return els.get(id)},createElement:()=>el(),querySelector:()=>el(),querySelectorAll:()=>[],activeElement:{tagName:'BODY'},addEventListener(){}};
const env={document,window:{addEventListener(){}},navigator:{},location:{protocol:'file:'},localStorage:{getItem(k){return storage.get(k)||null},setItem(k,v){storage.set(k,v)}},ImageData:class{constructor(data,w,h){assert.equal(data.length,w*h*4)}},Uint32Array,Uint8ClampedArray,console,setTimeout:()=>0,clearTimeout(){},requestAnimationFrame:()=>1,cancelAnimationFrame(){},performance:{now:()=>100}};vm.createContext(env);
vm.runInContext(fs.readFileSync('public/editor.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],env);
vm.runInContext(`
const e=(x,y)=>({clientX:x,clientY:y,pointerId:1,button:0,preventDefault(){}});
const sheetEvent=(x,y)=>e((x+.2)*256,(y+.2)*256);
function drag(a,b){canvas.onpointerdown(a);canvas.onpointermove(b);canvas.onpointerup(b)}
const red=packed('#ff0000'),green=packed('#00ff00');pixels[0]=red;pixels[size]=green;pixels[w+1]=0x80112233;
$('sheetSelect').click();drag(sheetEvent(0,0),sheetEvent(1,0));if(sheetSelection.tw!==2||sheetSelection.th!==1||tile)throw Error('Box tiles');
const original=pixels.slice();drag(sheetEvent(0,0),sheetEvent(1,0));if(pixels[0]!==0||pixels[size]!==red||pixels[size*2]!==green||pixels[w+size+1]!==0x80112233)throw Error('Overlapping move/alpha');
$('undo').click();if(pixels.some((v,i)=>v!==original[i]))throw Error('Move undo');$('redo').click();if(pixels[size*2]!==green)throw Error('Move redo');
canvas.onpointerdown(sheetEvent(1,0));canvas.onpointermove(sheetEvent(2,2));const preserved=pixels.slice();canvas.onpointercancel(sheetEvent(2,2));if(pixels.some((v,i)=>v!==preserved[i]))throw Error('Cancel move');
$('sheetCopy').click();if(spriteClipboard.tw!==2||spriteClipboard.pixels.length!==512)throw Error('Group copy');sheetSelection={x:0,y:2};$('sheetPaste').click();if(pixels[32*w]!==red||pixels[32*w+16]!==green)throw Error('Group paste');
$('sheetEdit').click();if(editWidth()!==32||editHeight()!==16)throw Error('Group editing extent');tool='pencil';color='#ffffff';dot(31,15);if(pixels[47*w+31]!==packed(color))throw Error('Edit second sprite');
$('spriteAdjust').click();if(adjustment.width!==32||adjustment.height!==16)throw Error('Group adjust extent');$('adjustHue').value='120';$('adjustHue').oninput();$('doneAdjust').click();if(pixels[32*w]!==green||pixels[32*w+16]!==packed('#0000ff'))throw Error('Adjust all tiles');$('undo').click();
pixels[32*w]=red;pixels[32*w+1]=green;tool='select';pixelSelection=null;
const pixelEvent=(x,y)=>e((x+.2)*1024/32,(y+.2)*1024/16);
drag(pixelEvent(0,0),pixelEvent(1,0));if(pixelSelection.tw!==2||pixelSelection.th!==1)throw Error('Pixel box');
drag(pixelEvent(0,0),pixelEvent(1,0));if(pixels[32*w]!==0||pixels[32*w+1]!==red||pixels[32*w+2]!==green)throw Error('Pixel overlap move');$('undo').click();if(pixels[32*w]!==red||pixels[32*w+1]!==green||!tile)throw Error('Pixel undo');
$('back').click();sheetSelection={x:0,y:0,tw:2,th:2};$('playFps').value='8';$('sheetPlay').click();if(animationFrames.length!==4||animationFrames[2].x!==0||animationFrames[2].y!==1)throw Error('Animation ordering');animationTick(0);animationTick(125);if(animationFrame!==1)throw Error('8fps');$('playPause').click();animationTick(250);if(animationFrame!==1||animationRunning)throw Error('Pause');$('playStart').click();if(!animationRunning)throw Error('Resume');$('playFps').value='16';$('playFps').oninput();animationTick(300);animationTick(362.5);if(animationFrame!==2)throw Error('FPS change');$('playClose').click();if(animationRunning||animationFrames.length)throw Error('Close cleanup');
`,env);
console.log('PASS: multi-tile box/move, overlap and alpha, undo/redo, cancel, group copy/paste/edit/adjust, pixel box/move/undo, animation order, 8 FPS, pause/resume, FPS changes, close cleanup');
