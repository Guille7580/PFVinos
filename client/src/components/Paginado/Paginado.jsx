import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ productPerPage, allProduct, pagination }) {
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(allProduct / productPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  console.log(pageNumbers)
  console.log(productPerPage)
  return(
    <nav>
        <ul className={styles.crumbs} >
            {
            pageNumbers?.map(number => (
                <li className={styles.crumbss} key={number} >
                    <div  onClick={() => pagination(number)}>{number}</div>
                </li>
            ))
            }
        </ul>
    </nav>
)
  // return (
  //   <nav className={styles.nav} aria-label="Page navigation example">
  //     <ul className="pagination justify-content-center">
  //       <ul className={styles.paginado}>
  //         {pageNumbers &&
  //           pageNumbers.map((number) => {
  //             return (
  //               <div key={number}>
  //                 <ul className={styles.number} key={number}>
  //                 <button className={page === number ? styles.pagBoton : styles.boton} onClick={()=>pagination(number)}>{number}</button>
  //                 </ul>
  //               </div>
  //             );
  //           })}
  //       </ul>
  //     </ul>
  //   </nav>
  // );
}