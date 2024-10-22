"use client"
import React, { useState } from 'react'
import styles from './AdminGiftcard.module.css'
import SearchBar from '@/app/components/SearchBar'
import InputBox from '@/app/components/InputBox'
import Icon from '@mdi/react'
import { mdiPlus, mdiTrashCan } from '@mdi/js'
import ErrorText from '@/app/components/ErrorText'

function AdminGiftcardPage({ category }) {
  const [cards, setCards] = useState([''])
  const [fieldCount, setFieldCount] = useState(1);
  const [error, setError] = useState("");
  const [rejected, setRejected] = useState(-1);
  

  function OnChangeText(e, index)
  {
    const value = e.currentTarget.value;
    cards[index] = value.trim();
  }

  function SetFieldCount(e)
  {
    let value = e.currentTarget.value;
    if(!isNaN(value))
    {
      if(value < 1)
        value = 1;

      setFieldCount(parseInt(value));
    } else {
      setFieldCount(1);
    }
  }

  function AddField()
  {
    const newArray = cards.map((card) => card);
    for (let index = 0; index < fieldCount; index++) {
      newArray.push('');
    }
    setCards(newArray);
  }


  function DeleteCard(deletedIndex)
  {
    if(cards.length == 1) 
    {
      setCards([""])
    } else {
      const newArray = cards.filter((card, index) => index != deletedIndex);
      setCards(newArray);
    }
  }

  async function SubmitGiftCards(e)
  {
    e.preventDefault();
    if(cards.length < 1)
      return;
    
    const form = document.getElementById("add_giftcards");
    const formData = new FormData(form);
    const codesAsJson = JSON.stringify(cards);
    formData.set("codes", codesAsJson);
    
    const res = await fetch("/api/admin/giftcards/add", {
      method: "POST",
      body: formData,
    });

    const response = await res.json();
    if(response.success)
    {
      if(response.rejectedCodes.length == 0) 
        setCards([""]);
      else
        setCards(response.rejectedCodes);
      
      setRejected(response.rejectedCodes.length > 0 ? response.rejectedCodes.length : 0 );
    }

    setError(response.message ? response.message : "");
  }

  function SelectCategory(e, category)
  {
    window.location.href = `/admin/products/giftcard?category=${category.actualName}`;
  }

  return (
    <div className={styles.addGiftcardWrp}>
      <input type='hidden' name='id' value={category ? category.id : ""}/>
      <label className={styles.searchCategoryWrp}>
          <h2 className={styles.header}>Search Category</h2>
          <SearchBar OnSelect={SelectCategory}/>
      </label>
      { category &&
        <>
          <div className={styles.nameWrp}>
            <span className={styles.label}>Name: </span>
            <span className={styles.name}>{category ? category.name : ""}</span>
          </div>
          <InputBox placeholder={"Denomination"} label='Denomination' name={"denomination"} type='number'/>
          <div className={styles.listWrp}>
            <h2 className={styles.listTitle}>Add Giftcards</h2>
            <ul className={styles.cardList}>
              {cards.map((card, index) => 
                <li key={index} className={styles.listItem}>
                  <input className={styles.listInput} type="text" onChange={(e) => OnChangeText(e, index)}/>
                  <span><Icon className={styles.listItemIcon} path={mdiTrashCan} size={1} onClick={(e) => DeleteCard(index)} /> </span>
                </li>
              )}
            </ul>
            <div className={styles.iconsWrp}>
              <input className={`${styles.fieldCount}`} type="number" onChange={(e) => SetFieldCount(e)}/>
              <span><Icon className={styles.listIcon} path={mdiPlus} size={1} onClick={(e) => AddField()}/> </span>
            </div>
          </div>
          <div className={styles.submitWrp} onClick={SubmitGiftCards}>
            <span>SUBMIT</span>
          </div>

          { error && <ErrorText text={error} />}
          { rejected > -1 && <ErrorText text={`Codes Rejected: ${rejected}`} successful={rejected == 0} />}
        </>
      }
    </div>
  )
}

export default AdminGiftcardPage