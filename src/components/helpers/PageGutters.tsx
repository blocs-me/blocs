import { WithChildren } from '@/utils/tsUtils'
import Box from './Box'
import { IBox } from './Box/Box.types'

const PageGutters = (props: WithChildren<IBox>) => (
  <Box
    {...props}
    width="min(100%, 1600px)"
    mx="auto"
    px={['sm', 'sm', '5%']}
    overflowX="hidden"
  >
    {props.children}
  </Box>
)

export default PageGutters
