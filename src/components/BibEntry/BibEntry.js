// @flow strict
import React, {useState} from 'react';
//import styles from './BibEntry.module.scss';

const BibEntry = (data) => {
  const [showBibtex, setShowBibtex] = useState(false)
  const onClick = () => setShowBibtex(!showBibtex)
  return (
  <span>
    <span  >{data.authors.join(", ")}. </span>
    <span style={{fontWeight: 'bold'}}> {data.title}. </span>                
    In <span style={{fontStyle: 'italic'}} >{data.booktitle || data.journal || "UNKNOWN"},</span>
    <span> {data.year}. </span>
    {(data.hasPdf ? <span> [<a href={data.pdf}>pdf</a>] </span> : <span></span>)}
    [<a onClick={onClick} style={{cursor: 'pointer'}}>BibTex</a>]
    {showBibtex ? <div> <pre>{data.raw}</pre> </div> : null}

  </span>);
}

export default BibEntry;
