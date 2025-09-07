import Btn from '@/components/Admin/UI/Btn';
import { colors } from '@/constants/colors';
import IconsLib from '@/utils/IconsLib';
import React from 'react';
import styled from 'styled-components';

interface Props {
   data: {
      _id: string;
      servername: string;
      domain: string;
      logo: string;
   }[];
   onSelect: (id: string) => void;
}

const ServersCard = ({ data, onSelect }: Props) => {
   // console.log(data);

   const handleSelect = (id: string) => {
      // console.log(id);
      onSelect(id);
   };

   return (
      <Wrapper>
         <Top>
            <TopMain>
               <Title>Websites</Title>
               <Desc>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Animi blanditiis doloremque.
               </Desc>
            </TopMain>
            <TopAction>
               <Btn
                  title="Create a website"
                  type="normal"
                  bgcolor={colors.BLUE_LIGHT}
                  size="medium"
                  textcolor="white"
                  hasIcon={true}
                  icon="add-circle-line"
                  iconPosition="left"
               />
            </TopAction>
         </Top>
         <ServerList>
            {data.map((item, index) => (
               <ServerItem key={index}>
                  <ServerItemContentMain>
                     <ServerLogoWrapper>
                        <ServerLogo src={item.logo} />
                     </ServerLogoWrapper>
                     <ServerItemContent>
                        <ServerItemTitle>{item.servername}</ServerItemTitle>
                        <ServerDomainWrapper>
                           <ServerDomainIcon>
                              <IconsLib
                                 icon="global-line"
                                 size="20px"
                                 color={colors.BLUE_LIGHT}
                              />
                           </ServerDomainIcon>
                           <ServerDomain
                              href={item.domain}
                              target="_blank"
                              rel="noreferrer"
                           >
                              {item.domain}
                           </ServerDomain>
                        </ServerDomainWrapper>
                     </ServerItemContent>
                  </ServerItemContentMain>
                  <ServerItemAction onClick={() => handleSelect(item._id)}>
                     <Btn
                        title="Edit settings"
                        type="normal"
                        bgcolor={colors.TEAL}
                        size="small"
                        textcolor="white"
                        hasIcon={true}
                        icon="settings-line"
                        iconPosition="left"
                     />
                  </ServerItemAction>
               </ServerItem>
            ))}
         </ServerList>
      </Wrapper>
   );
};

const Wrapper = styled.div`
   margin-top: 2rem;
   padding: 1rem;
   border-radius: 6px;
   background-color: #ffffff;
   border: 1px solid ${colors.GRAY14};
`;

const ServerList = styled.div`
   margin-top: 1rem;
`;

const ServerItem = styled.div`
   border-top: 1px solid ${colors.GRAY14};
   display: grid;
   grid-template-columns: 1fr auto;
   align-items: center;
   gap: 1rem;
   padding-top: 1rem;
   /* padding: 1rem 1rem 0 1rem; */
   /* justify-items: center; */
`;

// Top
// TopMain
// Title
// Desc
// TopAction

const Top = styled.div`
   display: grid;
   grid-template-columns: 2fr 1fr;
   gap: 1rem;
   align-items: center;
`;
const TopMain = styled.div``;
const Title = styled.p`
   font-size: 21px;
   font-weight: 700;
`;
const Desc = styled.p`
   font-size: 14px;
   color: ${colors.GRAY2};
`;
const TopAction = styled.div`
   display: flex;
   justify-content: flex-end;
`;

const ServerLogoWrapper = styled.div`
   width: 78px;
   height: 78px;
   overflow: hidden;
   padding: 5px;
   border: 1px solid #ebebeb;
   border-radius: 5px;
   display: flex;
   justify-content: center;
`;

const ServerItemContentMain = styled.div`
   display: flex;
   gap: 1rem;
   align-items: center;
`;

const ServerItemAction = styled.div`
   display: flex;
   justify-content: flex-end;
`;
const ServerLogo = styled.img`
   object-fit: contain;
   width: auto;
   height: auto;
   max-width: 100%;
   max-height: 100%;
`;
const ServerItemContent = styled.div``;
const ServerItemTitle = styled.p`
   font-size: 15px;
   font-weight: 700;
   display: flex;
   align-items: center;
`;
const ServerDomainWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 0.5rem;
`;
const ServerDomainIcon = styled.div``;
const ServerDomain = styled.a`
   font-size: 14px;
   color: ${colors.BLUE_LIGHT};
`;

export default ServersCard;
