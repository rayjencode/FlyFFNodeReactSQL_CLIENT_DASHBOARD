import React from 'react';
// import Btn from './UI/Btn';
import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import useSaveChangesStore from '@/store/useSaveChangesStore';
import Btn from '@/components/Admin/UI/Btn';

interface Props {
   show: boolean;
}

const SaveChangesModal = ({ show }: Props) => {
   const { handleSave, isLoading, handleDiscard } = useSaveChangesStore();
   return (
      <Wrapper $show={show}>
         <Content>
            <Label>Unsaved changes</Label>
            <Actions>
               <div
                  onClick={() => {
                     handleDiscard();
                  }}
               >
                  <Btn title="Discard" type="outline" size="small" />
               </div>

               <div
                  onClick={() => {
                     // console.log(`trigger save modal`);
                     handleSave();
                     // executeSave();
                  }}
               >
                  <Btn
                     title="Save"
                     type="normal"
                     size="small"
                     textcolor="white"
                     bgcolor={colors.SUCCESS}
                     hasIcon={isLoading}
                     icon="loader"
                     iconPosition="right"
                  />
               </div>
            </Actions>
         </Content>
      </Wrapper>
   );
};

const Wrapper = styled.div<{ $show: boolean }>`
   position: fixed;
   top: ${({ $show }) => ($show ? '0' : '-100%')};
   left: 0;
   width: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   z-index: 13;
   transition: top 0.3s ease-in-out;
`;

const Content = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1rem;
   background-color: white;
   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
   @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
   }
`;

const Label = styled.p`
   font-size: 16px;
   font-weight: 600;
   color: ${colors.PRIMARY};
`;

const Actions = styled.div`
   display: flex;
   gap: 10px;
   @media (max-width: 768px) {
      /* justify-content: flex-end; */
      justify-content: space-between;
   }
`;

export default SaveChangesModal;
