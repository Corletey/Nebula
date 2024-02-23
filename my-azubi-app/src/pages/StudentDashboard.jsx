import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Typography, message, Select, Card, Row, Col, Statistic, Button, Divider, Avatar, List, Spin,} from 'antd';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell,} from 'recharts';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const StudentDashboard = () => {
  const theme = useTheme();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedStudentData, setSelectedStudentData] = useState({});
  const [allStudentsData, setAllStudentsData] = useState([]);
  const [cohortStats, setCohortStats] = useState({});
  const [cohortGraphStats, setCohortGraphStats] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState('Cohort2');
  const [weekRanges, setWeekRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState('1-4');
  const [isLoading, setIsLoading] = useState(false);

  const useStyles = makeStyles({
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 16,
    },
    listItem: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  });

  const classes = useStyles();

  // Function to get filtered data based on selected range
  const getFilteredData = () => {
    const [start, end] = selectedRange.split('-').map(Number);

    if (!selectedStudentData.weeklyAttendance) return [];
    // return the filtered data
    return selectedStudentData.weeklyAttendance.filter(
      (item, index) => index >= start - 1 && index <= end - 1
    );
  };

  // Mock data for the PieChart
  const pieData = [
    { name: 'Completed', value: selectedStudentData.assignment_completion || 0 },
    { name: 'Pending', value: 24 - (selectedStudentData.assignment_completion || 0) },
  ];
  const COLORS = ['#0088FE', '#FFBB28'];

  // Mock function to simulate fetching all students data
  const fetchAllStudentsData = () => {
    axios
      .get('https://azubiafrica.sharepoint.com/sites/L22022/api/students')
      .then((response) => {
        console.log(response.data);
        setAllStudentsData(response.data);
        setWeekRanges(
          Array.from({ length: response.data[0].weeklyAttendance.length / 4 }, (_, i) => `${i * 4 + 1}-${i * 4 + 4}`)
        );
      })
      .catch((error) => console.log(error));
  };

  // Function to fetch student data based on selected student
  const fetchStudentData = (studentEmail) => {
    axios
      .get(`https://azubiafrica.sharepoint.com/sites/L22022/api/students/${studentEmail}`)
      .then((response) => {
        console.log(response.data);
        setSelectedStudentData(response.data);
      })
      .catch((error) => console.log(error));
  };

  // Function to fetch cohort stats
  const fetchCohortStats = () => {
    axios
      .get(`https://azubiafrica.sharepoint.com/sites/L22022/api/cohort/${selectedCohort}/stats`)
      .then((response) => {
        console.log(response.data);
        setCohortStats(response.data);
      })
      .catch((error) => console.log(error));
  };

  // Function to fetch cohort graph stats
  const fetchCohortGraphStats = () => {
    axios
      .get(`https://azubiafrica.sharepoint.com/sites/L22022/api/cohort/${selectedCohort}/stats/graph`)
      .then((response) => {
        console.log(response.data);
        setCohortGraphStats(response.data);
      })
      .catch((error) => console.log(error));
  };

  // Function to handle cohort change
  const handleCohortChange = (value) => {
    setSelectedCohort(value);
    fetchStudentData(value);
    fetchCohortStats();
    fetchCohortGraphStats();
  };

  // Function to handle student selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    fetchStudentData(student.email);
  };

  // Function to handle range selection
  const handleRangeSelect = (value) => {
    setSelectedRange(value);
  };

  // UseEffect to fetch all students data on component mount
  useEffect(() => {
    fetchAllStudentsData();
  }, []);

  // UseEffect to fetch cohort stats and graph stats on cohort change
  useEffect(() => {
    fetchCohortStats();
    fetchCohortGraphStats();
  }, [selectedCohort]);

  return (
    <Layout className="layout">
      <Content style={{ padding: '0 20px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Student Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Title level={2}>Student Dashboard</Title>

          <Row gutter={16}>
            <Col span={6}>
              <Card title="Select Cohort" className={classes.card}>
                <Select
                  value={selectedCohort}
                  onChange={handleCohortChange}
                  style={{ width: '100%' }}
                >
                  <Option value="Cohort1">Cohort1</Option>
                  <Option value="Cohort2">Cohort2</Option>
                  <Option value="Cohort3">Cohort3</Option>
                </Select>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Select Student" className={classes.card}>
                <List
                  itemLayout="horizontal"
                  dataSource={allStudentsData}
                  renderItem={(student) => (
                    <List.Item onClick={() => handleStudentSelect(student)}>
                      <List.Item.Meta
                        avatar={<Avatar src={student.avatar} className={classes.avatar} />}
                        title={student.name}
                        description={student.email}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Select Range" className={classes.card}>
                <Select
                  value={selectedRange}
                  onChange={handleRangeSelect}
                  style={{ width: '100%' }}
                >
                  {weekRanges.map((range) => (
                    <Option key={range}>{range}</Option>
                    ))}
                    </Select>
                </Card>
                </Col>
            </Row>
    
            {selectedStudent && (
                <>
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={8}>
                    <Card title="Student Details" className={classes.card}>
                        <p>
                        <strong>Name:</strong> {selectedStudent.name}
                        </p>
                        <p>
                        <strong>Email:</strong> {selectedStudent.email}
                        </p>
                        <p>
                        <strong>Cohort:</strong> {selectedStudent.cohort}
                        </p>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Weekly Attendance" className={classes.card}>
                        <BarChart
                        width={500}
                        height={300}
                        data={getFilteredData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="present" fill="#4caf50" />
                        <Bar dataKey="absent" fill="#f44336" />
                        </BarChart>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card title="Assignment Completion" className={classes.card}>
                        <PieChart width={300} height={300}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        </PieChart>
                    </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={12}>
                    <Card title="Cohort Stats" className={classes.card}>
                        <p>
                        <strong>Attendance Average:</strong> {cohortStats.attendance_average}%
                        </p>
                        <p>
                        <strong>Assignment Completion:</strong> {cohortStats.assignment_completion}%
                        </p>
                        <p>
                        <strong>Total Students:</strong> {cohortStats.total_students}
                        </p>
                    </Card>
                    </Col>
                    <Col span={12}>
                    <Card title="Cohort Performance Over Time" className={classes.card}>
                        <LineChart
                        width={800}
                        height={300}
                        data={cohortGraphStats}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="attendanceAverage" stroke="#4caf50" />
                        </LineChart>
                    </Card>
                    </Col>
                </Row>
                </>
            )}
            </div>
        </Content>
        </Layout>
    );
    }
                      
    export default StudentDashboard;
