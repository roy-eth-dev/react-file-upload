import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../lib/style-guide'
import defaultImage from './default-image.svg'

type ProgressImageRing = {
  value: number
  size: number
  stroke: number
  color: string
  image: string
}

type Content = {
  size: number
}

const Content = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin: auto;
  background-size: cover;
`

const DefaultImage = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`

const ProgressPreviewRing: FC<ProgressImageRing> = ({
  value,
  size,
  stroke,
  image,
  color
}) => {
  const radius = size / 2
  const normalizedRadius = radius
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <Content
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${image})`
      }}
    >
      {!image && <DefaultImage src={defaultImage} />}
      <svg height={size} width={size} style={{ position: 'absolute' }}>
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <svg height={size} width={size}>
        <circle
          stroke={Colors.Border}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: 0 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </Content>
  )
}

export default ProgressPreviewRing
