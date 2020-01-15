import React from 'react'
import styled from 'styled-components'
import Title from './Title'
import SubTitle from './SubTitle'
import { Colors } from '../../lib/style-guide'
import ImageDropZone from '../ImageDropzone'

type LogoUploader = {
  value?: string
  onChange?: (url: string) => void
}

const Header = styled.div`
  padding: 21px 24px 17px 29px;
  border-bottom: 1px solid ${Colors.BG2};
`
const DropZone = styled(ImageDropZone)`
  flex-grow: 1;
  margin: 19px 20px 21px 20px;
`

const LogoUploader: FC<LogoUploader> = ({ value, onChange, className }) => {
  return (
    <div className={className}>
      <Header>
        <Title>Company Logo</Title>
        <SubTitle>
          Logo should be square, 100px size and in png, jpeg file format.
        </SubTitle>
      </Header>
      <DropZone value={value} onChange={onChange} />
    </div>
  )
}

const StyledLogoUploader = styled(LogoUploader)`
  width: 400px;
  height: 590px;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 0 auto;
  background: ${Colors.PureWhite};
  border: 1px solid ${Colors.BG2};
`

export default StyledLogoUploader
