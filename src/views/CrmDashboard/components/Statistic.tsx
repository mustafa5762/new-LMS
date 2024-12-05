import classNames from 'classnames'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import {
    HiUserCircle,
    HiBookOpen,
    HiUsers,
    HiClipboardCheck,
    HiOutlineTrendingUp,
    HiOutlineTrendingDown,
} from 'react-icons/hi'

const GrowShrink = ({ value }: { value: number }) => {
    return (
        <span className="flex items-center rounded-full gap-1">
            <span
                className={classNames(
                    'rounded-full p-1',
                    value > 0 &&
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
                    value < 0 &&
                        'text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20'
                )}
            >
                {value > 0 && <HiOutlineTrendingUp />}
                {value < 0 && <HiOutlineTrendingDown />}
            </span>
            <span
                className={classNames(
                    'font-semibold',
                    value > 0 && 'text-emerald-600',
                    value < 0 && 'text-red-600'
                )}
            >
                {value > 0 && <>+ </>}
                {value}
            </span>
        </span>
    )
}

const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'newStudents':
            return (
                <Avatar
                    size={55}
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                    icon={<HiUsers />}
                />
            )
        case 'coursesCompleted':
            return (
                <Avatar
                    size={55}
                    className="bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100"
                    icon={<HiClipboardCheck />}
                />
            )
        case 'newEnrollments':
            return (
                <Avatar
                    size={55}
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={<HiBookOpen />}
                />
            )
        case 'activeUsers':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiUserCircle />}
                />
            )
        default:
            return <div></div>
    }
}

const StatisticCard = ({ data = {} }: { data: { key: string; value: number; label: string; growShrink: number } }) => {
    return (
        <Card>
            <div className="flex items-center gap-4">
                <StatisticIcon type={data.key} />
                <div>
                    <div className="flex gap-1.5 items-end mb-2">
                        <h3 className="font-bold leading-none">{data.value}</h3>
                        <p className="font-semibold">{data.label}</p>
                    </div>
                    <p className="flex items-center gap-1">
                        <GrowShrink value={data.growShrink || 0} />
                        <span>this month</span>
                    </p>
                </div>
            </div>
        </Card>
    )
}

const Statistic = () => {
    // Static data for LMS statistics
    const staticData = [
        { key: 'newStudents', value: 250, label: 'New Students', growShrink: 20 },
        { key: 'coursesCompleted', value: 120, label: 'Courses Completed', growShrink: 15 },
        { key: 'newEnrollments', value: 300, label: 'New Enrollments', growShrink: 30 },
        { key: 'activeUsers', value: 450, label: 'Active Users', growShrink: 10 },
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {staticData.map((card) => (
                <StatisticCard key={card.key} data={card} />
            ))}
        </div>
    )
}

export default Statistic
