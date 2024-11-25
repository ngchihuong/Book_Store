import { Card, Row, Col, Typography } from 'antd';
import { FaUserFriends, FaBook, FaDollarSign, FaCartArrowDown } from 'react-icons/fa';
import { Line } from '@ant-design/charts'; // Sử dụng thư viện biểu đồ
import { useQuery } from 'react-query';
import * as userApiClient from "@/api/userApiClient"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const AdminDashboard = () => {
    // Dữ liệu giả cho biểu đồ
    const data = [
        { month: 'Jan', value: 30 },
        { month: 'Feb', value: 40 },
        { month: 'Mar', value: 35 },
        { month: 'Apr', value: 50 },
        { month: 'May', value: 55 },
    ];

    // Cấu hình biểu đồ
    const chartConfig = {
        data,
        xField: 'month',
        yField: 'value',
        smooth: true,
        color: '#4CAF50',
        height: 200,
    };
    const { data: userData } = useQuery(
        "fetchAllAccounts",
        userApiClient.fetchAllAccounts
    );
    if (!userData) {
        return (
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        )
    }

    const totalUser = userData.length;
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Tiêu đề */}
            <Title level={2} className="text-center mb-6">
                Welcome to Admin Dashboard
            </Title>

            {/* Thông tin tổng quan */}
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="shadow-lg"
                        bordered={false}
                        style={{ borderRadius: 10 }}
                    >
                        <Link to='/list-users'>
                            <FaUserFriends size={40} className="text-blue-500" />
                            <Title level={4}>Users</Title>
                            <Text>{totalUser} Registered Users</Text>
                        </Link>

                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="shadow-lg"
                        bordered={false}
                        style={{ borderRadius: 10 }}
                    >
                        <FaBook size={40} className="text-green-500" />
                        <Title level={4}>Books</Title>
                        <Text>560 Books Available</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="shadow-lg"
                        bordered={false}
                        style={{ borderRadius: 10 }}
                    >
                        <FaCartArrowDown size={40} className="text-red-500" />
                        <Title level={4}>Orders</Title>
                        <Text>320 Orders This Month</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="shadow-lg"
                        bordered={false}
                        style={{ borderRadius: 10 }}
                    >
                        <FaDollarSign size={40} className="text-yellow-500" />
                        <Title level={4}>Revenue</Title>
                        <Text>$12,400 This Month</Text>
                    </Card>
                </Col>
            </Row>

            {/* Biểu đồ */}
            <Row justify="center" className="mt-8">
                <Col xs={24} lg={16}>
                    <Card
                        title="Monthly Revenue Trend"
                        bordered={false}
                        className="shadow-lg"
                        style={{ borderRadius: 10 }}
                    >
                        <Line {...chartConfig} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard;
