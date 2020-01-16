import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../lib/style-guide'

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
        position: 'relative',
        margin: 'auto',
        backgroundImage: `url(${image})`
      }}
    >
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
