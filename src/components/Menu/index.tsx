import { useState } from 'react'
import { MoreVertical } from 'react-feather'
import { StyledMenuButton } from '../Button'
import styled from 'styled-components'
import { IonPopover } from '@ionic/react'
import { Info, Settings } from 'react-feather'
import { NavLink } from 'react-router-dom'

const MenuContainer = styled.span`
  background-color: ${({ theme }) => theme.bg3};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`

const MenuItem = styled(NavLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  outline: none;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

let setShowPopoverRef: React.Dispatch<React.SetStateAction<{
  showPopover: boolean
  event: undefined
}>>

const dismissMenu = () => {
  setShowPopoverRef({ showPopover: false, event: undefined })
}

const MenuContent = () => {
  return (
    <>
      <MenuContainer>
        <MenuItem id={'menu-setting'} to={'/setting'} onClick={dismissMenu}>
          <Settings size={14} />
          Setting
        </MenuItem>

        <MenuItem id={'menu-about'} to={'/about'}>
          <Info size={14} />
          About
        </MenuItem>
      </MenuContainer>
    </>
  )
}

export default function Menu() {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  })
  setShowPopoverRef = setShowPopover

  return (
    <>
      <IonPopover
        animated={false}
        showBackdrop={false}
        cssClass="basic-popover menu-popover"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <MenuContent />
      </IonPopover>
      <StyledMenuButton
        onClick={(e: any) => {
          setShowPopover({ showPopover: true, event: e })
        }}
      >
        <MoreVertical size={20} />
      </StyledMenuButton>
    </>
  )
}
