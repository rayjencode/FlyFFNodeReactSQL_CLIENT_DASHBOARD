import React, { useEffect } from 'react';

// import { Post } from '@/types/post';
import styled from 'styled-components';
// import SideNav from '@/components/Admin/SideNav';
// import { colors } from '@/constants/colors';
// import PromptWrapper from '@/components/Admin/Templates/PromptWrapper';
// import { useUIStore } from '@/store/useUIStore';
import { ToastContainer } from 'react-toastify';

// } from '@/api/transaction';
// import { TransactionResponse } from '@/api/transaction';
// import { fetchStores } from '@/api/store';
// import Dropdown from '@/components/Admin/UI/Dropdown';
// import { DropdownActionType } from '@/types/shared';
// import { TableStore } from './Stores';
// import { useAuth } from '@/hooks/useAuth';
// import SaveChangesModal from '@/components/Admin/SaveChangesModal';
// import useSaveChangesStore from '@/store/useSaveChangesStore';
// import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import type { DropdownActionType } from '@/types/shared';
import { useUIStore } from '@/store/useUIStore';
import useAuthStore from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import PromptWrapper from '@/components/Admin/Templates/PromptWrapper';
import SaveChangesModal from '@/components/Admin/SaveChangesModal';
import SideNav from '@/components/Admin/SideNav';
import Dropdown from '@/components/Admin/Dropdown';
import { colors } from '@/constants/colors';
import useSaveChangesStore from '@/store/useSaveChangesStore';
// import Dropdown from '@/components/Admin/Dropdown';
// import { useUIStore } from '@/store/useUIStore';
// import type { DropdownActionType } from '@/types/shared';
// import useSaveChangesStore from '@/store/useSaveChangesStore';
// import PromptWrapper from '@/components/Admin/Templates/PromptWrapper';
// import SaveChangesModal from '@/components/Admin/SaveChangesModal';
type Props = {
   active: string;
   children: React.ReactNode;
};

const DashboardLayout = ({ active, children }: Props) => {
   const { outsideClickId } = useUIStore();
   const { user } = useAuthStore();
   const navigate = useNavigate();

   const {
      show,
      template,
      title,
      data: uiData,
      handleOutsideClick,
      actions,
   } = useUIStore();

   const { clearAuthWithCache } = useAuth();
   const { showSave, handleShowSave, handleCloseSave, handleSave } =
      useSaveChangesStore();

   const handleClickOutside = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
   ) => {
      const target = e.target as HTMLElement;
      handleOutsideClick(target.id);
   };

   const dropdownData: DropdownActionType<null>[] = [
      {
         icon: 'logout',
         label: 'Logout',
         onClick: () => {
            clearAuthWithCache();
            navigate('/', { replace: true });
            // localStorage.removeItem('x-token');
            // const { clearAuthWithCache } = useAuth();
            // navigate('/');
         },
      },
   ];

   useEffect(() => {
      if (show) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'auto';
      }
      return () => {
         document.body.style.overflow = 'auto';
      };
   }, [show]);

   // const xxxx = JSON.parse(localStorage.getItem('x-user') || '{}');

   // console.log(`xxxx--`, xxxx);

   return (
      <div>
         <ToastContainer />
         <Wrapper onClick={handleClickOutside}>
            <PromptWrapper
               show={show}
               template={template ?? ''}
               title={title ?? ''}
               data={uiData}
               actions={actions}
            />
            <SaveChangesModal show={showSave} />
            <Content>
               <SideNav active={active} />
               <Main>
                  <TopHeader>
                     <TopHeaderTitle>Dashboard</TopHeaderTitle>
                     <ProfileWrapper id="profile">
                        <ProfileContent id="profile">
                           <ProfileName id="profile">
                              {user?.name || 'Guest'}
                           </ProfileName>
                           <ProfileInitial id="profile">
                              {user?.name
                                 ? user.name.charAt(0).toUpperCase()
                                 : 'G'}
                           </ProfileInitial>
                        </ProfileContent>

                        {outsideClickId === 'profile' && (
                           <Dropdown
                              active={outsideClickId === `profile`}
                              actions={dropdownData}
                              width="150px"
                              textdecoration="normal"
                              top="40px"
                              right="0"
                              // selected={selected}
                              // selected={isValidNormalTextValue(value) ? value : ''}
                           />
                        )}
                     </ProfileWrapper>
                  </TopHeader>
                  <div className="container">{children}</div>
               </Main>
            </Content>
         </Wrapper>
      </div>
   );
};

const Wrapper = styled.div``;
const Content = styled.div`
   display: grid;
   grid-template-columns: 300px 1fr;
   height: 100vh;
   @media (max-width: 768px) {
      grid-template-columns: 1fr;
   }
`;
const Main = styled.div`
   /* background-color: ${colors.GRAY14}; */
   position: relative;
`;

const TopHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 5px 1rem;
   background-color: white;
   border-bottom: 1px solid ${colors.GRAY14};
`;
const TopHeaderTitle = styled.p`
   font-size: 16px;
   font-weight: 700;
`;
const ProfileWrapper = styled.div`
   position: relative;
   border-radius: 5px;
   cursor: pointer;
   :hover {
      border-radius: 5px;
      background-color: ${colors.GRAY13};
   }
`;
const ProfileContent = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
   padding: 5px;
`;
const ProfileName = styled.p`
   font-size: 15px;
   font-weight: 600;
`;
const ProfileInitial = styled.div`
   width: 30px;
   height: 30px;
   background-color: ${colors.PRIMARY};
   color: white;
   border-radius: 50%;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 15px;
   font-weight: 600;
`;

export default DashboardLayout;
