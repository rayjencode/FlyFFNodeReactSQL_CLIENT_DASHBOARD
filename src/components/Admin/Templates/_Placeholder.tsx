import { colors } from '@/constants/colors';
import IconsLib from '@/utils/IconsLib';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
   show: boolean;
   title: string;
   handleClose: () => void;
   children: React.ReactNode;
}

const _Placeholder = ({ show, title, handleClose, children }: Props) => {
   return (
      <Wrapper $show={show ? 'true' : 'false'}>
         <HeadingWrapper>
            <Heading>{title}</Heading>
            <CloseBtn onClick={handleClose}>
               <IconsLib icon="close-line" size="20px" color={colors.GRAY5} />
            </CloseBtn>
         </HeadingWrapper>
         {children}
      </Wrapper>
   );
};

const Wrapper = styled.div<{
   $show: string;
}>`
   background-color: white;
   visibility: ${({ $show }) => ($show === 'true' ? 'visible' : 'hidden')};
   opacity: ${({ $show }) => ($show === 'true' ? '1' : '0')};
   border-radius: 8px;
   padding: 1rem 1.5rem 1.5rem 1.5rem;
   min-width: 500px;
   animation: ${({ $show }) => ($show === 'true' ? popUp : popDown)} 0.3s
      ease-in-out forwards;

   @media (max-width: 768px) {
      height: 700px;
      width: 100%;
      overflow-y: scroll;
      min-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: ${({ $show }) => ($show === 'true' ? slideInUp : slideOutDown)}
         0.3s ease-in-out forwards;
      padding-bottom: 5rem;
   }
`;

const HeadingWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 0 10px 0;
   border-bottom: 1px solid ${colors.GRAY13};
`;

const Heading = styled.p`
   font-size: 16px;
   font-weight: 600;
   color: ${colors.GRAY1};
`;

const CloseBtn = styled.div`
   width: 30px;
   height: 30px;
   display: grid;
   place-items: center;
   border-radius: 4px;
   cursor: pointer;
   &:hover {
      background: ${colors.GRAY14};
   }
`;

const slideInUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOutDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const popUp = keyframes`
   0% {
     opacity: 0;
     transform: scale(0.6) translateY(20px);
   }
   50% {
     opacity: 1;
     transform: scale(1.05) translateY(0);
   }
   100% {
     transform: scale(1);
   }
 `;

const popDown = keyframes`
   0% {
     opacity: 1;
     transform: scale(1);
   }
   50% {
     transform: scale(1.05);
   }
   100% {
     opacity: 0;
     transform: scale(0.6) translateY(20px);
   }
 `;

export default _Placeholder;
