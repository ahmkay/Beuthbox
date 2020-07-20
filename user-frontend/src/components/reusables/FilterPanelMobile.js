// import React, { useState, useEffect, useLayoutEffect, useReducer, useContext } from 'react';
// import { compareDates, compareDuration } from '../../utils';
// import CategoryIcon from './CategoryIcon';
// import CategoryCheckbutton from './CategoryCheckbutton';
// import CloseIcon from '@material-ui/icons/Close';
// import { DataContext } from '../../api/DataContext';

// const FilterPanelMobile = ({ videoResult, children }) => {
//     const [sort, setSort] = useState("date-downwards");
//     const [categoryBreakpoint, setCategoryBreakpoint] = useState(window.innerWidth < 1380)
//     const [isTablet, setIsTablet] = useState(window.innerWidth <= 768)
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 576)

//     const { sortedvideoResult, setSortedVideoResult } = useContext(DataContext)

//     const selectSortType = (event) => {
//         setSort(event.target.value);
//         const { value } = event.target;
//         switch (value) {
//             case "date-downwards":
//                 console.log("downwards inside");
//                 dispatch({ type: "date-downwards" });
//                 break;
//             case "date-upwards":
//                 console.log("upwards inside");
//                 dispatch({ type: "date-upwards" });
//                 break;
//             case "duration-downwards":
//                 dispatch({ type: "duration-downwards" });
//                 break;
//             case "duration-upwards":
//                 dispatch({ type: "duration-upwards" });
//                 break;
//             default:
//                 return;
//         }
//     };

//     const getScreenWidth = () => {
//         setCategoryBreakpoint(window.innerWidth <= 1380)
//         setIsTablet(window.innerWidth <= 768)
//         setIsMobile(window.innerWidth <= 576)
//     }

//     useEffect(() => {
//         getScreenWidth()
//     }, [])

//     useLayoutEffect(() => {
//         window.addEventListener('resize', getScreenWidth)

//         return () => {
//             window.removeEventListener('resize', getScreenWidth,

//             )
//         }
//     }, [window.innerWidth])

//     const initialState = {
//         sortedvideoResult: videoResult
//     };
//     const [state, dispatch] = useReducer(reducer, initialState);

//     function reducer(state, action) {
//         switch (action.type) {
//             case "date-downwards":
//                 const videoDateDownwards = videoResult.sort(compareDates);
                
//                 console.log({sortedvideoResult})
//                 return {
//                     ...state,
//                     sortedvideoResult: videoDateDownwards,
//                 };
//             case "date-upwards":
//                 const videoDateUpwards = videoResult.sort(compareDates).reverse();
               
//                 return {
//                     ...state,
//                     sortedvideoResult: videoDateUpwards,
//                 };
//             case "duration-downwards":
//                 const durationDownwards = videoResult.sort(compareDuration);
             
//                 return {
//                     ...state,
//                     sortedvideoResult: durationDownwards,
//                 };
//             case "duration-upwards":
//                 const durationUpwards = videoResult.sort(compareDuration).reverse();
        
//                 return {
//                     ...state,
//                     sortedvideoResult: durationUpwards,
//                 };
//             default:
//                 return state;
//         }
//     }

//     useEffect(() => {
//         setSortedVideoResult(state.sortedvideoResult)
//      },[state])


//     const renderFilterPanel = () => {
//         return (
//             !isTablet ?
//                 <>
//                     <div className="filter-panel">
//                         <div className="filter-panel__filter-playlist filter-panel__filter-playlist--short">
//                             <h4 className="filter-panel__title">Sortieren</h4>
//                             <select
//                                 name="video-type"
//                                 id="video-type"
//                                 className="filter-panel-select"
//                                 onChange={selectSortType}
//                             >
//                                 <option value="date-downwards">
//                                     Veröffentlichungsdatum &#x25BC;
//                     </option>
//                                 <option value="date-upwards">
//                                     Veröffentlichungsdatum &#x25B2;
//                     </option>
//                                 <option value="duration-downwards">Länge &#x25BC;</option>
//                                 <option value="duration-upwards">Länge &#x25B2;</option>
//                             </select>
//                         </div>

//                         <div className="filter-panel__filter-playlist filter-panel__filter-playlist--long">
//                             <h4 className="filter-panel__title">Kategorien</h4>
//                             <div className="filter-panel__controller">
//                                 {renderCategoryButtons()}
//                             </div>
//                         </div>
//                     </div>
//                 </>
//                 :
//                 <>
//                     <div className='filter-panel--tablet'>
//                         <div className='filter-panel--tablet__closeLayer'>
//                             <h2 className='filter-panel--tablet__closeLayer-title'>Filtern</h2>
//                             < CloseIcon className='filtr-panel--tablet__close-icon' />

//                         </div>
//                         <h4 className="filter-panel--tablet__title">Sortieren</h4>
//                         <select
//                             name="video-type"
//                             id="video-type"
//                             className="filter-panel--tablet__select"
//                             onChange={selectSortType}
//                         >
//                             <option value="date-downwards">
//                                 Veröffentlichungsdatum &#x25BC;
//                   </option>
//                             <option value="date-upwards">
//                                 Veröffentlichungsdatum &#x25B2;
//                   </option>
//                             <option value="duration-downwards">Länge &#x25BC;</option>
//                             <option value="duration-upwards">Länge &#x25B2;</option>
//                         </select>

//                         <h4 className="filter-panel--tablet__title">Kategorie</h4>
//                         <div className='filter-panel--tablet__category-container'>
//                             {renderCategoryButtons()}
//                         </div>



//                     </div>
//                 </>
//         );
//     };


//     const renderCategoryButtons = () => {
//         if (categoryBreakpoint && !isMobile) {
//             return (
//                 <>
//                     <div className='filter-panel__category-container--mobile'>
//                         <div className="filter-panel__category-option">
//                             <CategoryCheckbutton category="study" />
//                         </div>
//                         <div className="filter-panel__category-option">
//                             <CategoryCheckbutton category="class" />
//                         </div>
//                     </div>
//                     <div className='filter-panel__category-container--mobile'>
//                         <div className="filter-panel__category-option">
//                             <CategoryCheckbutton category="campus" />
//                         </div>
//                         <div className="filter-panel__category-option">
//                             <CategoryCheckbutton category="research" />
//                         </div>
//                     </div>
//                 </>
//             )
//         } else if (isMobile) {
//             return (
//                 <>
//                     <CategoryIcon category="research" isActive type="labeled" />
//                     <CategoryIcon category="campus" isActive type="labeled" />
//                     <CategoryIcon category="study" isActive type="labeled" />
//                     <CategoryIcon category="class" isActive type="labeled" />
//                 </>
//             )
//         }

//         else {
//             return (
//                 <>
//                     <div className="filter-panel__category-option">
//                         <CategoryCheckbutton category="study" />
//                     </div>
//                     <div className="filter-panel__category-option">
//                         <CategoryCheckbutton category="class" />
//                     </div>


//                     <div className="filter-panel__category-option">
//                         <CategoryCheckbutton category="campus" />
//                     </div>
//                     <div className="filter-panel__category-option">
//                         <CategoryCheckbutton category="research" />
//                     </div>
//                 </>
//             )
//         }

//     }

//     // const renderResults = () => {
//     //     if (videoResult.length  > 0) {
//     //         return (
//     //           <>
//     //          {children}
//     //           </>
//     //         );

//     //     }
//     //     else {
//     //        return <div>Keine Videos gefunden</div>
//     //     }
//     //   };


//     return (
//         <>
//       {renderFilterPanel()}
//       {/* {renderResults()} */}
//     </>
//     )
// }

// export default FilterPanelMobile