import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import RegionMap from '@/components/shared/RegionMap'
import { theme } from 'twin.macro'
import type { LeadRegion } from '../store'

type LeadByCountriesProps = {
    className?: string
}

const twColor: Record<string, string> = theme`colors`

const mapColors = [
    twColor.indigo['600'],
    twColor.blue['500'],
    twColor.green['500'],
    twColor.yellow['500'],
    twColor.pink['500'],
    twColor.purple['500'],
]

const dotColor = [
    'bg-indigo-600',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-purple-500',
]

// Static data for primary school LMS
const staticData: LeadRegion[] = [
    { name: 'Pakistan', value: 40 },
    { name: 'Australia', value: 30 },
    { name: 'Germany', value: 15 },
    { name: 'Chile', value: 10 },
    { name: 'Turkey', value: 5 },
]

const getMapColors = (data: LeadRegion[] = []) => {
    return data.map((item, index) => ({
        ...item,
        color: mapColors[index % mapColors.length],
    }))
}

const LeadByCountries = ({ className }: LeadByCountriesProps) => {
    return (
        <Card className={className}>
            <h4>Lead By Regions</h4>
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Region Map Section */}
                <div className="lg:col-span-2 px-4">
                    <RegionMap data={getMapColors(staticData)} valueSuffix="%" />
                </div>
                {/* Region Details Section */}
                <div className="flex flex-col justify-center px-4">
                    {staticData.map((item, index) => (
                        <div
                            key={item.name}
                            className="mb-6 flex justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <Badge innerClass={dotColor[index % dotColor.length]} />
                                <div className="font-semibold">{item.name}</div>
                            </div>
                            <div>{item.value}%</div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default LeadByCountries
