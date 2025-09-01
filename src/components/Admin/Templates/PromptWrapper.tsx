import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import CreateStore from '../Prompt/CreateStore';
import { useUIStore } from '@/store/useUIStore';
import _Placeholder from './_Placeholder';
// import UpdateStore from '../Prompt/UpdateStore';
// import { TableStore } from '@/pages/Admin/Stores';
// import ImportVoucher from '../Prompt/ImportVoucher';
// import Verification from '../Prompt/Verification';
// import CreateVoucher from '../Prompt/CreateVoucher';
// import SubscribeStore from '../Prompt/SubscribeStore';
// import { SelectedStore } from '@/pages/Admin/Subscription';
// import Payout from '@/pages/Admin/Payout';
// import PayoutForm from '../Prompt/PayoutForm';

interface Props<T = unknown> {
   show: boolean;
   template: string;
   title: string;
   data: T;
   actions?: {
      onConfirm?: (data: T) => void;
      onCancel?: () => void;
   };
}

const PromptWrapper = <T,>({
   show,
   template,
   title,
   data,
   actions,
}: Props<T>) => {
   const { handleClose } = useUIStore();
   const [formKey, setFormKey] = useState(0);

   // Reset form key when the form is opened
   useEffect(() => {
      if (show && template === 'create-voucher') {
         setFormKey((prev) => prev + 1);
      }
   }, [show, template]);

   if (!show) return null;

   return (
      <Wrapper>
         <Overlay onClick={() => handleClose()} />
         <Content>
            {template === 'create-server' && (
               <_Placeholder
                  show={show}
                  title={title}
                  handleClose={handleClose}
               >
                  {/* <CreateStore /> */}
                  <div>Placeholder</div>
               </_Placeholder>
            )}
         </Content>
      </Wrapper>
   );
};

const Wrapper = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   z-index: 15;
`;
const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 15;
`;
const Content = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 16;

   @media (max-width: 768px) {
      top: auto;
      bottom: 0;
      left: 0;
      transform: none;
      width: 100%;
   }
`;

export default PromptWrapper;
