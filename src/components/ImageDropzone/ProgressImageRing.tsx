import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../lib/style-guide'

type ProgressImageRing = {
  value: number
  size: number
  stroke: number
  color: string
}

type Content = {
  size: number
}

const Content = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: ${(props: Content) => props.size}px;
  height: ${(props: Content) => props.size}px;
`

const ProgressPreviewRing: FC<ProgressImageRing> = ({
  value,
  size,
  stroke,
  children,
  color
}) => {
  const radius = size / 2
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        margin: 'auto'
      }}
    >
      <svg height={size} width={size} style={{ position: 'absolute' }}>
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
      <svg height={size} width={size}>
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
      <Content size={size}>{children}</Content>
    </div>
  )
}

export default ProgressPreviewRing
