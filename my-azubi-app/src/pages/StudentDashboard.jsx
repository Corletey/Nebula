import React, { useState, useEffect } from 'react';
import { UserOutlined, FileDoneOutlined, TeamOutlined, LineChartOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb, Typography,message, Select, Card, Row, Col, Statistic, Button, Divider } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const StudentDashboard = () => {

    // check if backend url is saved in localstorage, if not, redirect to configuration page
    useEffect(() => {
        if (!localStorage.getItem('backendUrl')) {
            message.error('Please configure the backend URL');

            setTimeout(() => {
                window.location.href = '/config';
            }
                , 3000);


        }

    }, []);
    
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedStudentData, setSelectedStudentData] = useState({});
    const [allStudentsData, setAllStudentsData] = useState([]);
    const [cohortStats, setCohortStats] = useState({});
    const [cohortGraphStats, setCohortGraphStats] = useState({});
    const [selectedCohort, setSelectedCohort] = useState(null); // default cohort is 'Cohort2
    
    const [selectedRange, setSelectedRange] = useState('1-4');

    // Function to get filtered data based on selected range
    const getFilteredData = () => {
        const [start, end] = selectedRange.split('-').map(Number);

    if (!selectedStudentData.weeklyAttendance) return [];
    // return the filtered data
    return selectedStudentData.weeklyAttendance.filter((item, index) => index >= start - 1 && index <= end - 1);
    };

    const weekRanges = ['1-4', '5-8', '9-12', '13-16', '17-20', '21-24'];


    // Mock data for the PieChart
    const pieData = [
        { name: 'Completed', value: selectedStudentData.assignment_completion || 0 },
        { name: 'Pending', value: 24 - (selectedStudentData.assignment_completion || 0) },
    ];
    const COLORS = ['#0088FE', '#FFBB28'];

    // Mock function to simulate fetching all students data
    const fetchAllStudentsData = () => {

        const backendUrl = localStorage.getItem('backendUrl');
        axios.get(`${backendUrl}/api/students`)
            .then(response =>{
                console.log(response.data);
                setAllStudentsData(response.data);
            }
            )
            .catch(error => console.log(error));

    };

    const fetchStudentData = (studentEmail) => {
        const student = allStudentsData.find(s => s.email === studentEmail);
        setSelectedStudentData(student || {});
    };

    // Mock function to simulate fetching cohort stats
    const fetchCohortStats = (value) => {
        const backendUrl = localStorage.getItem('backendUrl');

        // /api/cohort/stats
        
        axios.get(`${backendUrl}/api/cohort/stats/${value}`)

            .then(
                response => {
                    console.log("cohort stats",response.data);
                    setCohortStats(response.data);
                }
            )
            .catch(error => console.log(error));
    };

    const fetchcohortPerformanceData = (value) => {
        const backendUrl = localStorage.getItem('backendUrl');
        console.log(value)
    
        axios.get(`${backendUrl}/api/cohort/attendance/${value}`)
            .then(response => {
                console.log("cohort graph stats",response.data);
                const formattedData = response.data.map(item => ({
                    ...item,
                    attendanceAverage: parseFloat(item.attendanceAverage) // Parse to float
                }));
                setCohortGraphStats(formattedData);
            })
            .catch(error => console.log(error));
    };


    useEffect(() => {
        fetchCohortStats('Cohort2');
        fetchcohortPerformanceData('Cohort2');
        fetchAllStudentsData();
    }, []);
    const clearSelection = () => {
        setSelectedStudent(null);
    };

    const handleStudentChange = (value) => {
        setSelectedStudent(value);
        fetchStudentData(value);
    };

    const handlecohortChange = (value) => {
        setSelectedCohort(value);
        fetchCohortStats(value);
        fetchcohortPerformanceData(value);
    };


    // Function to compute compliance state
    const getComplianceState = (score) => {
        if (score > 80) return "High Compliance";
        if (score >= 60) return "Good Compliance";
        if (score >= 30) return "Medium Compliance";
        return "Low Compliance";
    };

    const getAdvisoryMessage = (score) => {
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
    
        if (score > 80) {
            return getRandomMessage(highAttendanceMessages);
        } else if (score >= 60) {
            return getRandomMessage(goodAttendanceMessages);
        } else if (score >= 30) {
            return getRandomMessage(averageAttendanceMessages);
        } else {
            return getRandomMessage(lowAttendanceMessages);
        }
    };
    

const totalAssignments = 24; // Total number of assignments
const completedAssignments = selectedStudentData.assignment_completion; // Number of completed assignments

// Calculate ratios
const attendanceRatio = selectedStudentData.attendance_average / 100; // Convert percentage to a decimal
const assignmentCompletionRatio = completedAssignments / totalAssignments;

// Calculate weighted score
const weightedScore = (attendanceRatio * 70) + (assignmentCompletionRatio * 30);



    return (
        <Layout className="layout">
            <Content style={{ padding: '0 20px' }}>
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

                    {/* cohort selector */}
                    {!selectedStudent && (<Select
                        showSearch
                        style={{ width: 400, marginLeft: 16 }}
                        placeholder="Select/search a cohort"
                        optionFilterProp="children"
                        onChange={handlecohortChange}
                        value={selectedCohort}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {/* pick cohort name from student data */}
                        {allStudentsData.map(student => student.cohort).filter((value, index, self) => self.indexOf(value) === index).map(cohort => (
                            <Option key={cohort} value={cohort}>{cohort}</Option>
                        ))}

                    </Select>
                    )}

                    
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
                                <p>Attendance Average: <strong><span  style={{fontSize:'1.4rem',padding:10}}>{selectedStudentData.attendance_average||'N/A'}%</span></strong> </p>
                                <p>Assignment Completion:<strong> <span  style={{fontSize:'1.4rem',padding:5}}>{(assignmentCompletionRatio*100).toFixed(2) ||'N/A'}%</span></strong></p>
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
                                    backgroundColor: getComplianceState(weightedScore||'N/A')==='High Compliance'?'#a8ff78':getComplianceState(weightedScore||'N/A')==='Good Compliance'?'#fffc00':getComplianceState(weightedScore||'N/A')==='Medium Compliance'?'#ffd200':'#ff416c'}}
                            >
                                {
                                getComplianceState(weightedScore ||'N/A')
                                }
                            </Button>
                            } 
                            >
                                
                                <p><strong>Advisory Message:</strong> 
                                <br/>
                                {getAdvisoryMessage(weightedScore)}
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

                <Divider/>

                {/* cohort selector */}
                {selectedStudent && (<Select
                        showSearch
                        style={{ width: 400, marginLeft: 16 }}
                        placeholder="Select/search a cohort"
                        optionFilterProp="children"
                        onChange={handlecohortChange}
                        value={selectedCohort}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {/* pick cohort name from student data */}
                        {allStudentsData.map(student => student.cohort).filter((value, index, self) => self.indexOf(value) === index).map(cohort => (
                            <Option key={cohort} value={cohort}>{cohort}</Option>
                        ))}

                    </Select>
                    )}

                    {/* Cohort Statistics */}
                    <Row gutter={16} style={{ marginTop: 16 }}>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="attendance_average (avg)"
                                    value={cohortStats.attendance_average||'N/A'}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<UserOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="assignment_completion (avg)"
                                    value={cohortStats.assignment_completion||'N/A'}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<FileDoneOutlined />}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card>
                                <Statistic
                                    title="total_students"
                                    value={cohortStats.total_students||'N/A'}
                                    prefix={<TeamOutlined />}
                                />
                            </Card>
                        </Col>
                    </Row>

                    <Divider/>
                    <Card title="Cohort Performance Over Time">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={cohortGraphStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis dataKey="attendanceAverage" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="attendanceAverage" stroke="blue" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>

                </div>
            </Content>
        </Layout>
    );
};

export default StudentDashboard;
