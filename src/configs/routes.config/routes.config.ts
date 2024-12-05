import CrmDashboard from '@/views/CrmDashboard/Index';
import InstituteProfile from '@/views/profile/InstituteProfile';
import BankProfile from '@/views/profile/BankProfile';
import Rules from '@/views/profile/Rules';
import AddEmployee from '@/views/employees/AddEmployee';
import AllEmployees from '@/views/employees/AllEmployees';
import AddStudent from '@/views/students/AddStudent';
import AllStudents from '@/views/students/AllStudents';
import AddClass from '@/views/classes/AddClass';
import AllClasses from '@/views/classes/AllClasses';
import AddSubject from '@/views/subjects/AddSubject';
import AllSubjects from '@/views/subjects/AllSubjects';
import CreateTimeTable from '@/views/timetable/CreateTimeTable';
import ViewTimeTables from '@/views/timetable/ViewTimeTables';
import MarkStudentAttendance from '@/views/attendance/Mark_Student_Attendance';
import ViewStudentAttendance from '@/views/attendance/View_Student_Attendance';
import AddCanteen from '@/views/canteen/Add_Canteen';
import ViewCanteen from '@/views/canteen/View_Canteen';
import MarkEmployeeAttendance from '@/views/attendance/Mark_Employee_Attendance';
import ViewEmployeeAttendance from '@/views/attendance/View_Employee_Attendance';
import StudentProfile from '@/views/student_profile/Profile';
import StudentTimetable from '@/views/student_timetable/Timetable';
import StudentAttendance from '@/views/student_attendance/Attendance';
import TeacherProfile from '@/views/teacher_profile/Profile';
import TeacherTimetable from '@/views/teacher_timetable/Timetable';
import TeacherAttendance from '@/views/teacher_attendance/Attendance';

import authRoute from './authRoute';
import type { Routes } from '@/@types/routes';

export const publicRoutes: Routes = [...authRoute];

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: CrmDashboard,
        authority: [],
    },
    {
        key: 'institute_profile',
        path: '/institute_profile',
        component: InstituteProfile,
        authority: [],
    },
    {
        key: 'bank_details',
        path: '/bank_details',
        component: BankProfile,
        authority: [],
    },
    {
        key: 'rules_regulations',
        path: '/rules_regulations',
        component: Rules,
        authority: [],
    },
    {
        key: 'add_employees',
        path: '/add_employees',
        component: AddEmployee,
        authority: [],
    },
    {
        key: 'all_employees',
        path: '/all_employees',
        component: AllEmployees,
        authority: [],
    },
    {
        key: 'add_students',
        path: '/add_students',
        component: AddStudent,
        authority: [],
    },
    {
        key: 'all_students',
        path: '/all_students',
        component: AllStudents,
        authority: [],
    },
    {
        key: 'add_classes',
        path: '/add_classes',
        component: AddClass,
        authority: [],
    },
    {
        key: 'all_classes',
        path: '/all_classes',
        component: AllClasses,
        authority: [],
    },
    {
        key: 'add_subjects',
        path: '/add_subjects',
        component: AddSubject,
        authority: [],
    },
    {
        key: 'all_subjects',
        path: '/all_subjects',
        component: AllSubjects,
        authority: [],
    },
    {
        key: 'create_timetable',
        path: '/create_timetable',
        component: CreateTimeTable,
        authority: [],
    },
    {
        key: 'view_timetables',
        path: '/view_timetables',
        component: ViewTimeTables,
        authority: [],
    },
    {
        key: 'mark_student_attendance',
        path: '/mark_student_attendance',
        component: MarkStudentAttendance,
        authority: [],
    },
    {
        key: 'view_student_attendance',
        path: '/view_student_attendance',
        component: ViewStudentAttendance,
        authority: [],
    },
    {
        key: 'add_canteen',
        path: '/add_canteen',
        component: AddCanteen,
        authority: [],
    },
    {
        key: 'view_canteen',
        path: '/view_canteen',
        component: ViewCanteen,
        authority: [],
    },
    {
        key: 'mark_employee_attendance',
        path: '/mark_employee_attendance',
        component: MarkEmployeeAttendance,
        authority: [],
    },
    {
        key: 'view_employee_attendance',
        path: '/view_employee_attendance',
        component: ViewEmployeeAttendance,
        authority: [],
    },
    {
        key: 'student_profile',
        path: '/student_profile',
        component: StudentProfile,
        authority: [],
    },
    {
        key: 'student_timetable',
        path: '/student_timetable',
        component: StudentTimetable,
        authority: [],
    },
    {
        key: 'student_attendance_record',
        path: '/student_attendance_record',
        component: StudentAttendance,
        authority: [],
    },
    {
        key: 'teacher_profile',
        path: '/teacher_profile',
        component: TeacherProfile,
        authority: [],
    },
    {
        key: 'teacher_timetable',
        path: '/teacher_timetable',
        component: TeacherTimetable,
        authority: [],
    },
    {
        key: 'teacher_attendance_record',
        path: '/teacher_attendance_record',
        component: TeacherAttendance,
        authority: [],
    },
];
