import BarGraph from './BarGraph'
import { BarGraphData } from './types'

export default {
  title: 'BarGraph',
  component: BarGraph
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
    date: new Date('2022-01-05').toISOString(),
    value: 3,
    unit: 'hrs'
  },
  {
    id: '9',
    date: new Date('2022-01-06').toISOString(),
    value: 5,
    unit: 'hrs'
  }
]

export const Basic = () => (
  <div style={{ width: '500px' }}>
    <BarGraph data={dummyData} />
  </div>
)
