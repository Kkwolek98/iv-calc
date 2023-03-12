import { MutableRefObject, useRef, useState } from 'react'
import './App.css'
import { findIvCombinations } from './lib/iv-distribution';

function App() {
  const [parts, setParts] = useState<[number, number, number][]>();
  const [searchString, setSearchString] = useState<string>();
  const percentageRef = useRef<HTMLInputElement>(null);

  function generateSearchString() {
    const iv = percentageRef.current!.valueAsNumber / 100;
    const newParts = findIvCombinations(iv);

    const searchResultArray: string[] = [];

    newParts.forEach(([att, def, hp]) => searchResultArray.push(`(${att}Attack & ${def}Defense & ${hp}HP)`));

    const newSearchString = `(${searchResultArray.join(',')})`;
    
    setSearchString(newSearchString);
    setParts(newParts);
  }

  return (
    <div className="App">
      <div style={ { position: 'sticky', top: 0, background: '#242424' } }>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="percentage">IV%</label>
          <input type="number" name="percentage" ref={percentageRef} inputMode="numeric"/>
        </div>
        <button style={{ marginBottom: 16 }} onClick={generateSearchString}>Generate search string</button>
        <div style={{ marginBottom: 32 }}>
          <textarea value={searchString} cols={70}/>
        </div>
      </div>
      {
        parts && <div>
          {parts.map(([att, def, hp]) => <div> Att: {att}, Def: {def}, HP: {hp} </div>)}
        </div>
      }
    </div>
  )
}

export default App
