import { faAngleRight, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import "./AccordionItem.scss";

function AccordionItem({ startPos, editInnerAdd, navigate, setCategoryIndex, setSelectedCategory, item, editInner, deleteInner, deletes2, modalvisible }) {
   const [isOpen, setIsOpen] = useState(false)
   const paddingLeft = (startPos - 2) * 30 + 16
   return (
      <li className='accordion-item' key={item.id}>
         <input checked={isOpen} onChange={e => {
            if (!modalvisible && !deletes2) {
               setIsOpen(e.target.checked)
            }
         }} id={item.id} type="checkbox" hidden />
         <label style={{ paddingLeft }} htmlFor={item.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <div className="buttons mr-1">
                  <button
                     className="more-btn"
                     onClick={() => {
                        setSelectedCategory(item)
                        setCategoryIndex(startPos)
                        navigate(`/main/${item.id}/content`)
                     }}
                  >
                     Kontentlar
                  </button>
                  <button
                     className="more-btn"
                     onClick={() => editInnerAdd(item, startPos + 1)}
                  >
                     + Qo'shish{" "}
                  </button>
               </div>
               <div>
                  <FontAwesomeIcon icon={faPen} className="icon icon-hover mr-1" onClick={() => editInner(item)} />
                  <FontAwesomeIcon icon={faTrash} className="icon icon-hover mr-2" onClick={() => deleteInner(item.id)} />
               </div>
            </div>
            <span>
               {item.innerCategories?.length > 0 && <FontAwesomeIcon className="rotatible-icon" icon={faAngleRight} />}
               {item.name}
            </span>
         </label>

         {item.innerCategories?.length > 0 && (
            <ul className="group-list">
               {item.innerCategories.map(itemChild =>
                  <AccordionItem
                     setSelectedCategory={setSelectedCategory}
                     setCategoryIndex={setCategoryIndex}
                     deleteInner={deleteInner}
                     editInner={editInner}
                     item={itemChild}
                     navigate={navigate}
                     editInnerAdd={editInnerAdd}
                     key={itemChild.id}
                     modalvisible={modalvisible}
                     deletes2={deletes2}
                     startPos={startPos + 1}
                  />
               )}
            </ul>
         )}
      </li>
   )
}

export default AccordionItem