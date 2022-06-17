import daysOfTheWeek from '../../../constants/daysOfTheWeek'
import BarGraph from './BarChart'
import { BarGraphData } from './types'

export default {
  title: 'BarGraph',
  component: BarGraph,
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    )
  ]
}

const dummyData: BarGraphData[] = [
  {
    id: '1',
    date: new Date('2022-01-01').toISOString(),
    value: 2,
    unit: 'hrs'
  },
  {
    id: '2',
    date: new Date('2022-01-02').toISOString(),
    value: 4,
    unit: 'hrs'
  },
  {
    id: '3',
    date: new Date('2022-01-03').toISOString(),
    value: 3,
    unit: 'hrs'
  },
  {
    id: '4',
    date: new Date('2022-01-04').toISOString(),
    value: 6,
    unit: 'hrs'
  },
  {
    id: '5',
    date: new Date('2022-01-05').toISOString(),
    value: 3,
    unit: 'hrs'
  },
  {
    id: '6',
    date: new Date('2022-01-06').toISOString(),
    value: 5,
    unit: 'hrs'
  },
  {
    id: '8',
    date: new Date('2022-01-07').toISOString(),
    value: 3,
    unit: 'hrs'
  }
]

const getXAxisValue = ({ date }) => daysOfTheWeek[new Date(date).getDay()]
const getYAxisValue = ({ value, unit }) => `${value} ${unit}`

export const Basic = () => (
  <BarGraph
    data={dummyData}
    getXAxisValue={getXAxisValue}
    getYAxisValue={getYAxisValue}
  />
)

export const CustomPadding = () => (
  <BarGraph
    getYAxisValue={getYAxisValue}
    data={dummyData}
    paddingX={10}
    paddingY={12}
    getXAxisValue={getXAxisValue}
  />
)

export const CustomDimensions = () => (
  <BarGraph
    getYAxisValue={getYAxisValue}
    getXAxisValue={getXAxisValue}
    data={dummyData}
    paddingX={20}
    paddingY={10}
    height={125}
    width={250}
  />
)
