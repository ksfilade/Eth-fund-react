import React from 'react';
import './donate-modal.styles.scss'
class DonateModal extends React.Component {
   constructor() {
      super();

   }
   componentDidMount() {

   }



   render() {
      return (
         <div id="myModal" class="modal">
            <div class="modal-content">
               <span class="close">&times;</span>
               <div className='modal-content__title'>
                  <h1>Donate</h1>
               </div>
               <div className='modal-content__donation'>
                  <input type="text"/>
               </div>
            </div>
         </div>
      )
   }

}
export default DonateModal;

