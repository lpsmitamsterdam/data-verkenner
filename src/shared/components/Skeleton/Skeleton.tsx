import styled from 'styled-components'
import { themeSpacing } from '@amsterdam/asc-ui'
import type { FunctionComponent } from 'react'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`

const Skeleton = styled.span`
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #dddbdd;
  margin-bottom: 0.75em;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`

const SkeletonWrapper = styled.div`
  margin-top: ${themeSpacing(4)};
`

export const LinkListSkeleton: FunctionComponent<{ limit?: number }> = ({ limit }) => {
  let sizes = [
    260, 250, 340, 310, 390, 270, 260, 250, 340, 310, 390, 270, 390, 270, 260, 250, 340, 310, 340,
    310,
  ]

  if (limit) {
    sizes = sizes.slice(0, limit)
  }

  return (
    <SkeletonWrapper>
      <Box>
        {sizes.map((size) => (
          <Skeleton style={{ width: `${size}px` }} />
        ))}
      </Box>
    </SkeletonWrapper>
  )
}

export const MultipleComponentsSkeleton = () => (
  <SkeletonWrapper>
    <Skeleton style={{ width: '400px', fontSize: '30px' }} />
    <Box>
      <Skeleton style={{ width: '200px' }} />
      <Skeleton style={{ width: '180px' }} />
      <Skeleton style={{ width: '340px' }} />
      <Skeleton style={{ width: '250px' }} />
      <Skeleton style={{ width: '160px' }} />
    </Box>
    <Skeleton style={{ width: '300px', fontSize: '30px' }} />
    <Box>
      <Skeleton style={{ width: '180px' }} />
      <Skeleton style={{ width: '160px' }} />
      <Skeleton style={{ width: '250px' }} />
      <Skeleton style={{ width: '200px' }} />
      <Skeleton style={{ width: '340px' }} />
    </Box>
    <Skeleton style={{ width: '500px', fontSize: '30px' }} />
    <Box>
      <Skeleton style={{ width: '250px' }} />
      <Skeleton style={{ width: '200px' }} />
      <Skeleton style={{ width: '340px' }} />
      <Skeleton style={{ width: '180px' }} />
      <Skeleton style={{ width: '160px' }} />
    </Box>
  </SkeletonWrapper>
)
