import React from 'react';
import { colors } from '@/constants/colors';
import styled, { keyframes } from 'styled-components';
import { RiLoader4Line } from '@remixicon/react';

interface Props {
   title: string;
   isLoading?: boolean;
   color?: string;
}

interface WrapperProps {
   $isLoading?: boolean;
   $color?: string;
}

const ButtonSignInSignup = ({ title, isLoading = false, color }: Props) => {
   return (
      <Wrapper $isLoading={isLoading} $color={color}>
         {isLoading ? (
            <BtnWrapper>
               <Title>Loading...</Title>
               <LoadingIcon>
                  <RiLoader4Line
                     color={colors.WHITE}
                     size={24}
                     className="spinning-icon"
                  />
               </LoadingIcon>
            </BtnWrapper>
         ) : (
            <Title>{title}</Title>
         )}
      </Wrapper>
   );
};

const spin = keyframes`
   from {
      transform: rotate(0deg);
   }
   to {
      transform: rotate(360deg);
   }
`;

const LoadingIcon = styled.div`
   .spinning-icon {
      animation: ${spin} 1s linear infinite;
   }
`;

const Wrapper = styled.div<WrapperProps>`
   background: ${(props) => (props.$isLoading ? colors.GRAY3 : props.$color)};
   padding: 12px;
   border-radius: 4px;
   cursor: ${(props) => (props.$isLoading ? 'not-allowed' : 'pointer')};
   opacity: ${(props) => (props.$isLoading ? 0.8 : 1)};
   transition: all 0.2s ease;
`;
const Title = styled.p`
   font-weight: 600;
   font-size: 16px;
   text-align: center;
   color: white;
`;

const BtnWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 11px;
`;

export default ButtonSignInSignup;
