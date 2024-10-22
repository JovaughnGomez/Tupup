"use client"
import React, { useEffect } from 'react'
import styles from '@/public/css/SearchBar.module.css'
import Image from 'next/image'
import { useState } from 'react'

function SearchBar({ OnSelect}) {
    let denounceTimeout;
    let isHoveringResults = false;
    const [results, setResults] = useState([]);

    useEffect(() => {
    
      return () => {

    }
    }, [results])
    
    function OnMouseEnter()
    {
        isHoveringResults = true;
    }
    
    function OnMouseLeave()
    {
        isHoveringResults = false;
    }

    function ToggleSearchResults(visible, force)
    {
        if(isHoveringResults && !force)
            return;
        
        const results = document.getElementById("search_list");
        if(visible)
            results.classList.remove("hide");
        else
            results.classList.add("hide");
    }

    function OnChange(e)
    {
        const value = e.currentTarget.value;
        if(denounceTimeout)
            clearTimeout(denounceTimeout);
        
        const timeout = setTimeout(async () => {
            const response = await SearchCategory(value)
            setResults(response);
            ToggleSearchResults(response.length > 0);
        }, 300)
        
        denounceTimeout = timeout;
    }

    function Select(e, result)
    {
        OnSelect(e, result);
        ToggleSearchResults(false, true);
    }
    
    async function SearchCategory(value)
    {
        const res = await fetch(`/api/search?name=${value}`,{
            method:"GET",
        })

        const response = await res.json();
        if(res.status == 200)
            return response.categories;
        else
            return [];
    }

  return (
    <div className={styles.searchWrp}>
        <input type="search" className={styles.search} onChange={OnChange} onBlur={(e) => ToggleSearchResults()} onClick={(e) => ToggleSearchResults(results.length > 0)}/>
        <ul id='search_list' className={`hide ${styles.searchResults}`} onMouseEnter={OnMouseEnter} onMouseLeave={OnMouseLeave}>
            {results.map((result, index) => 
                <li key={index} className={`${styles.searchResult}`} onClick={(e) => Select(e, result)}>
                    <div className={styles.resultInfo}>
                        <Image 
                            width={40}
                            height={40}
                            src={result.icon}
                            className={styles.icon}
                        />
                        <span>{result.name}</span>
                    </div>
                </li>
            )}
        </ul>
    </div>
  )
}

export default SearchBar