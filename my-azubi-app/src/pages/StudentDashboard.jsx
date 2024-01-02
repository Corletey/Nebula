import React, { useState, useEffect } from 'react';
import { UserOutlined, FileDoneOutlined, TeamOutlined, LineChartOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Typography, Select, Card, Row, Col, Statistic, Button, Divider } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const StudentDashboard = () => {
    
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedStudentData, setSelectedStudentData] = useState({});
    const [allStudentsData, setAllStudentsData] = useState([]);
    const [cohortStats, setCohortStats] = useState({});
    
    const [selectedRange, setSelectedRange] = useState('1-4');

    // Function to get filtered data based on selected range
    const getFilteredData = () => {
        const [start, end] = selectedRange.split('-').map(Number);
        // return fullAttendanceData.filter((item, index) => index >= start - 1 && index <= end - 1);
        // return selectedStudentData.weeklyAttendance.filter((item, index) => index >= start - 1 && index <= end - 1);
    // if no data is available, return an empty array
    if (!selectedStudentData.weeklyAttendance) return [];
    // return the filtered data
    return selectedStudentData.weeklyAttendance.filter((item, index) => index >= start - 1 && index <= end - 1);
    };

    const weekRanges = ['1-4', '5-8', '9-12', '13-16', '17-20', '21-24'];


    // Mock data for the PieChart
    const pieData = [
        { name: 'Completed', value: selectedStudentData.assignmentCompletion || 0 },
        { name: 'Pending', value: 24 - (selectedStudentData.assignmentCompletion || 0) },
    ];
    const COLORS = ['#0088FE', '#FFBB28'];

    // Mock function to simulate fetching all students data
    const fetchAllStudentsData = () => {
        // Replace with actual API call
        setAllStudentsData([
            {
                name: "John Doe",
                email: "johndoe@example.com",
                attendanceAverage: 90,
                assignmentCompletion: 10,
                ranking: 5,
                weeklyAttendance: [
                    { week: 'Week 1', present: 4, absent: 1 },
                    { week: 'Week 2', present: 5, absent: 0 },
                    { week: 'Week 3', present: 4, absent: 1 },
                    { week: 'Week 4', present: 5, absent: 0 },
                    { week: 'Week 5', present: 4, absent: 1 },
                    { week: 'Week 6', present: 5, absent: 0 },
                    { week: 'Week 7', present: 4, absent: 1 },
                    { week: 'Week 8', present: 5, absent: 0 },
                    { week: 'Week 9', present: 4, absent: 1 },
                    { week: 'Week 10', present: 5, absent: 0 },
                    { week: 'Week 11', present: 4, absent: 1 },
                    { week: 'Week 12', present: 5, absent: 0 },
                ],
                cohort: 'Cohort 1',
            },
            {
                name: "Jane Smith",
                email: "janesmith@example.com",
                attendanceAverage: 80,
                assignmentCompletion: 5,
                ranking: 10,weeklyAttendance: [
                    { week: 'Week 1', present: 3, absent: 2 },
                    { week: 'Week 2', present: 2, absent: 3 },
                    { week: 'Week 3', present: 3, absent: 2 },
                    { week: 'Week 4', present: 2, absent: 3 },
                    { week: 'Week 5', present: 3, absent: 2 },
                    { week: 'Week 6', present: 2, absent: 3 },
                    { week: 'Week 7', present: 3, absent: 2 },
                    { week: 'Week 8', present: 2, absent: 3 },
                    { week: 'Week 9', present: 3, absent: 2 },
                    { week: 'Week 10', present: 2, absent: 3 },
                    { week: 'Week 11', present: 3, absent: 2 },
                    { week: 'Week 12', present: 2, absent: 3 },

                ],
                cohort: 'Cohort 2',
            },
            // average complaince
            {
                name: "Mike Tyson",
                email: "miketyson@email.com",
                attendanceAverage: 30,
                assignmentCompletion: 12,
                ranking: 15,
            },
            {
                name: "John Cena",
                email: "johncena@email.com",
                attendanceAverage: 20,
                assignmentCompletion: 20,
                ranking: 20,
            },
        ]);
    };

    const fetchStudentData = (studentEmail) => {
        const student = allStudentsData.find(s => s.email === studentEmail);
        setSelectedStudentData(student || {});
    };

    // Mock function to simulate fetching cohort stats
    const fetchCohortStats = () => {
        // Example: axios.get('/api/cohort/stats').then(response => setCohortStats(response.data));
        setCohortStats({
            averageAttendance: 85,
            averageAssignmentCompletion: 80,
            totalStudents: 50,
            name: "Cohort 1",
        }
        );
    };

    const cohortPerformanceData = [
        { date: 'Week 1', averageScore: 70, averageAttendance: 80 },
        { date: 'Week 2', averageScore: 75, averageAttendance: 85 },
    ];

    useEffect(() => {
        fetchCohortStats();
        fetchAllStudentsData();
    }, []);
    const clearSelection = () => {
        setSelectedStudent(null);
    };

    const handleStudentChange = (value) => {
        setSelectedStudent(value);
        fetchStudentData(value);
    };

    // Function to compute compliance state
    const getComplianceState = (attendanceAverage) => {
        if (attendanceAverage > 80) return "High Compliance";
        if (attendanceAverage >= 60) return "Good Compliance";
        if (attendanceAverage >= 30) return "Medium Compliance";
        return "Low Compliance";
    };

    const getAdvisoryMessage = (attendanceAverage) => {
        // Helper function to randomly select a message
        const getRandomMessage = (messages) => {
            return messages[Math.floor(Math.random() * messages.length)];
        };
    
        const highAttendanceMessages = [
            "Outstanding commitment! Remember, 'Success is the sum of small efforts, repeated day in and day out.' – Robert Collier",
            "You're excelling remarkably! As Aristotle said, 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'"
        ];
    
        const goodAttendanceMessages = [
            "You're on the right track! Remember, 'The secret of your success is determined by your daily agenda.' – John C. Maxwell",
            "Consistency is key, and you're showing it! 'Success is not final, failure is not fatal: It is the courage to continue that counts.' – Winston Churchill"
        ];
    
        const averageAttendanceMessages = [
            "You're doing okay, but there's room to grow. 'The difference between ordinary and extraordinary is that little extra.' – Jimmy Johnson",
            "Keep pushing forward! 'Success isn’t always about greatness. It’s about consistency. Consistent hard work leads to success.' – Dwayne Johnson"
        ];
    
        const lowAttendanceMessages = [
            "Let's strive for improvement. 'Don't watch the clock; do what it does. Keep going.' – Sam Levenson",
            "This is a chance to turn things around! 'The way to get started is to quit talking and begin doing.' – Walt Disney"
        ];
    
        if (attendanceAverage > 80) {
            return getRandomMessage(highAttendanceMessages);
        } else if (attendanceAverage >= 60) {
            return getRandomMessage(goodAttendanceMessages);
        } else if (attendanceAverage >= 30) {
            return getRandomMessage(averageAttendanceMessages);
        } else {
            return getRandomMessage(lowAttendanceMessages);
        }
    };
    


    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    {/* Breadcrumb items */}
                </Breadcrumb>
                <div className="site-layout-content">
                    <Title level={2}>Student Dashboard</Title>


                    {/* Student Selector */}
                    <Select
                        showSearch
                        style={{ width: 400 }}
                        placeholder="Select/search a student"
                        optionFilterProp="children"
                        onChange={handleStudentChange}
                        value={selectedStudent}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {allStudentsData.map(student => (
                            <Option key={student.email} value={student.email}>{student.name}</Option>
                        ))}
                        

                    </Select>
                    
                    {selectedStudent && (
                        <Button
                            style={{ marginLeft: 16 }}
                            icon={<CloseCircleOutlined />}
                            onClick={clearSelection}
                        >
                            Clear Selection
                        </Button>
                    )}


                    {/* Individual Student Data */}
                    {selectedStudent && ([
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={12}>
                            <Card title="Student Performance">
                                <p><strong>Name:</strong> {selectedStudentData.name||'N/A'}, <strong>Cohort:</strong> {selectedStudentData.cohort||'N/A'}</p>
                                <p><strong>Email:</strong> {selectedStudentData.email||'N/A'}</p>
                                <p>Attendance Average: <strong><span  style={{fontSize:'1.4rem',padding:10}}>{selectedStudentData.attendanceAverage||'N/A'}%</span></strong> </p>
                                <p>Assignment Completion:<strong> <span  style={{fontSize:'1.4rem',padding:5}}>{selectedStudentData.assignmentCompletion||'N/A'}%</span></strong></p>
                            </Card>
                        </Col>
                        <Col span={12}>
                            {/* display an adivsory mesage based on the students compliance state, what they can imporvoe on or stop */}

                            <Card 
                            // background color based on compliance state
                            style={{textAlign:'right'}}
                            title={<Button disabled
                                style={{
                                    cursor: 'default',
                                    // disabled color based on compliance state
                                    color: 'black',
                                    backgroundColor: getComplianceState(selectedStudentData.attendanceAverage||'N/A')==='High Compliance'?'#a8ff78':getComplianceState(selectedStudentData.attendanceAverage||'N/A')==='Good Compliance'?'#fffc00':getComplianceState(selectedStudentData.attendanceAverage||'N/A')==='Medium Compliance'?'#ffd200':'#ff416c'}}
                            >
                                {
                                getComplianceState(selectedStudentData.attendanceAverage||'N/A')
                                }
                            </Button>
                            } 
                            >
                                
                                <p><strong>Advisory Message:</strong> 
                                <br/>
                                {getAdvisoryMessage(selectedStudentData.attendanceAverage)}
                                </p>
                                
                                <p style={{fontSize:'2rem',padding:0}}><strong>Ranking:</strong> {selectedStudentData.ranking || 'N/A'}</p>
                            </Card>

                            
                        </Col>
                    </Row>,
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        
                        <Col span={12}>
                        <Card title="Weekly Attendance">
                            <Select defaultValue="1-4" style={{ width: 150, marginBottom: 20 }} onChange={setSelectedRange}>
                                {weekRanges.map(range => (
                                    <Option key={range} value={range}>{range} weeks</Option>
                                ))}
                            </Select>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={getFilteredData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="week" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="present" fill="#82ca9d" />
                                    <Bar dataKey="absent" fill="#ff416c" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                        </Col>
                        <Col span={12}>

                        <Card title="Assignment Completion">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie dataKey="value" isAnimationActive={false} data={pieData} outerRadius={80} fill="#8884d8" label>
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>

                                </ResponsiveContainer>
                            </Card>
                        </Col>
                            </Row>
                ])}

                    {/* Cohort Statistics */}
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Average Attendance"
                                    value={cohortStats.averageAttendance||'N/A'}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<UserOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Average Assignment Completion"
                                    value={cohortStats.averageAssignmentCompletion||'N/A'}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<FileDoneOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="Total Students"
                                    value={cohortStats.totalStudents||'N/A'}
                                    prefix={<TeamOutlined />}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Divider/>
                    <Card title="Cohort Performance Over Time">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={cohortPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="averageScore" stroke="#8884d8" />
                                <Line type="monotone" dataKey="averageAttendance" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </div>
            </Content>
        </Layout>
    );
};

export default StudentDashboard;
