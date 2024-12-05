import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'

const { Tr, Td, TBody, THead, Th } = Table

// Static attendance data for students
const staticAttendanceData = [
    {
        name: 'John Doe',
        className: 'Grade 4',
        attendance: [
            { date: '27/11/2024', status: 'Present' },
            { date: '28/11/2024', status: 'Absent' },
            { date: '29/11/2024', status: 'Present' },
            { date: '30/11/2024', status: 'Present' },
        ],
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Alice Johnson',
        className: 'Grade 5',
        attendance: [
            { date: '27/11/2024', status: 'Absent' },
            { date: '28/11/2024', status: 'Absent' },
            { date: '29/11/2024', status: 'Present' },
            { date: '30/11/2024', status: 'Present' },
        ],
        avatar: 'https://via.placeholder.com/150',
    },
    {
        name: 'Bob Brown',
        className: 'Grade 3',
        attendance: [
            { date: '27/11/2024', status: 'Present' },
            { date: '28/11/2024', status: 'Present' },
            { date: '29/11/2024', status: 'Present' },
            { date: '30/11/2024', status: 'Absent' },
        ],
        avatar: 'https://via.placeholder.com/150',
    },
]

const Leads = () => {
    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <h4>Student Attendance Records (Past Week)</h4>
            </div>
            <Table>
                <THead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Class</Th>
                        <Th>Attendance (Past Week)</Th>
                    </Tr>
                </THead>
                <TBody>
                    {staticAttendanceData.map((record, index) => (
                        <Tr key={index}>
                            <Td>
                                <div className="flex items-center gap-2">
                                    <Avatar shape="circle" size={25} src={record.avatar} />
                                    <span className="font-semibold">{record.name}</span>
                                </div>
                            </Td>
                            <Td>{record.className}</Td>
                            <Td>
                                {record.attendance.map((day, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-1">
                                        <span className="text-gray-500 text-sm">{day.date}</span>
                                        <Tag
                                            className={
                                                day.status === 'Present'
                                                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded'
                                                    : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded'
                                            }
                                        >
                                            {day.status}
                                        </Tag>
                                    </div>
                                ))}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    )
}

export default Leads
