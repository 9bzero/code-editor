import{useState}from'react'
  const LANGS=[{id:'js',label:'JavaScript',comment:'// JavaScript',sample:'// Fibonacci sequence\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nfor (let i = 0; i < 10; i++) {\n  console.log(fibonacci(i));\n}'},
  {id:'ts',label:'TypeScript',comment:'// TypeScript',sample:'// Generic Stack implementation\nclass Stack<T> {\n  private items: T[] = [];\n\n  push(item: T): void {\n    this.items.push(item);\n  }\n\n  pop(): T | undefined {\n    return this.items.pop();\n  }\n\n  peek(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  get size(): number {\n    return this.items.length;\n  }\n}'},
  {id:'py',label:'Python',comment:'# Python',sample:'# Binary search implementation\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nnums = [1, 3, 5, 7, 9, 11, 13]\nprint(binary_search(nums, 7))'},
  {id:'html',label:'HTML',comment:'<!-- HTML -->',sample:'<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8"/>\n  <title>My App</title>\n  <style>\n    body { font-family: system-ui; background: #0f172a; color: #e2e8f0; }\n    .card { padding: 2rem; border: 1px solid #334155; border-radius: 12px; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h1>Hello, World!</h1>\n    <p>Start editing this file.</p>\n  </div>\n</body>\n</html>'}]
  const THEMES=[{id:'dark',bg:'#0d1117',text:'#c9d1d9',label:'Dark (GitHub)'},{id:'ocean',bg:'#1a2332',text:'#abb2bf',label:'Ocean Blue'},{id:'forest',bg:'#1a2f1a',text:'#a8d5a8',label:'Forest Green'}]
  export default function App(){
    const[lang,setLang]=useState(LANGS[0])
    const[theme,setTheme]=useState(THEMES[0])
    const[code,setCode]=useState(LANGS[0].sample)
    const[copied,setCopied]=useState(false)
    const copy=()=>{navigator.clipboard.writeText(code);setCopied(true);setTimeout(()=>setCopied(false),2000)}
    const lineCount=code.split('\n').length
    return(
      <div style={{display:'flex',flexDirection:'column',height:'100vh',fontFamily:'system-ui',background:'#0f172a',color:'#e2e8f0'}}>
        <header style={{padding:'0 1.5rem',height:56,borderBottom:'1px solid #1e293b',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#111827',flexShrink:0}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <span style={{fontWeight:700,color:'#38bdf8',fontFamily:'monospace',fontSize:'1.1rem'}}>&lt;CodeEditor/&gt;</span>
            <div style={{display:'flex',gap:6}}>
              {LANGS.map(l=><button key={l.id} onClick={()=>{setLang(l);setCode(l.sample)}} style={{padding:'0.3rem 0.8rem',background:lang.id===l.id?'#1e40af':'#1e293b',color:lang.id===l.id?'#93c5fd':'#94a3b8',border:'none',borderRadius:6,cursor:'pointer',fontSize:'0.8rem',fontWeight:500}}>{l.label}</button>)}
            </div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <select value={theme.id} onChange={e=>setTheme(THEMES.find(t=>t.id===e.target.value)||THEMES[0])} style={{background:'#1e293b',color:'#e2e8f0',border:'1px solid #334155',borderRadius:6,padding:'0.3rem 0.6rem',fontSize:'0.8rem'}}>
              {THEMES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <button onClick={copy} style={{padding:'0.3rem 0.9rem',background:copied?'#16a34a':'#1e293b',color:copied?'#bbf7d0':'#94a3b8',border:'1px solid #334155',borderRadius:6,cursor:'pointer',fontSize:'0.8rem'}}>
              {copied?'✓ Copied':'Copy'}
            </button>
          </div>
        </header>
        <div style={{display:'flex',flex:1,overflow:'hidden'}}>
          <div style={{width:48,background:theme.bg,borderRight:'1px solid #1e293b',paddingTop:'0.75rem',textAlign:'right',paddingRight:'0.5rem',fontSize:'0.75rem',color:'#4b5563',fontFamily:'JetBrains Mono,monospace',lineHeight:'1.6rem',userSelect:'none',flexShrink:0,overflowY:'hidden'}}>
            {Array.from({length:lineCount},(_, i)=><div key={i}>{i+1}</div>)}
          </div>
          <textarea value={code} onChange={e=>setCode(e.target.value)} spellCheck={false}
            style={{flex:1,background:theme.bg,color:theme.text,border:'none',outline:'none',padding:'0.75rem 1rem',fontFamily:'JetBrains Mono,monospace',fontSize:'0.875rem',lineHeight:'1.6rem',resize:'none',tabSize:2}}/>
        </div>
        <footer style={{padding:'0.4rem 1.5rem',background:'#111827',borderTop:'1px solid #1e293b',display:'flex',gap:'2rem',fontSize:'0.75rem',color:'#4b5563'}}>
          <span>{lang.label}</span><span>{lineCount} lines</span><span>{code.length} chars</span><span>UTF-8</span>
        </footer>
      </div>
    )
  }