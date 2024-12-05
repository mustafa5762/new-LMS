import {
    HiOutlineBookOpen,
    HiOutlineClipboard,
    HiOutlineClock,
    HiOutlineHome,
    HiOutlineLibrary,
    HiOutlineShoppingBag,
    HiOutlineUser,
    HiOutlineUserGroup,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    profile: <HiOutlineUser />,
    employees: <HiOutlineUserGroup />,
    class: <HiOutlineLibrary />,
    subjects: <HiOutlineBookOpen />,
    timetable: <HiOutlineClock />,
    attendance: <HiOutlineClipboard />,
    canteen: <HiOutlineShoppingBag /> ,
}

export default navigationIcon
