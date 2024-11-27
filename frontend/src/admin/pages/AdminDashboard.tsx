import { Card, Row, Col, Typography } from 'antd';
import { FaUserFriends, FaBook, FaCartArrowDown } from 'react-icons/fa';
import { useQuery } from 'react-query';
import * as userApiClient from "@/api/userApiClient"
import * as bookApiClient from "@/api/bookApiClient"
import * as orderApiClient from "@/api/orderApiClient"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import adArt from "@/assets/public/ad1.png"

const { Title, Text } = Typography;

const AdminDashboard = () => {

    const { data: userData } = useQuery(
        "fetchAllAccounts",
        userApiClient.fetchAllAccounts
    );
    const { data: bookData } = useQuery(
        "fetchAllBook", bookApiClient.fetchAllBook
    )
    const { data: orderData } = useQuery(
        "fetchAllOrders", orderApiClient.fetchAllOrders
    )
    if (!userData) {
        return (
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        )
    }
    if (!bookData) {
        return (
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        )
    }
    if (!orderData) {
        return (
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        )
    }
    const totalUser = userData.length;
    const totalBook = bookData.length;
    const totalOrders = orderData.length;
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
                        <Link to='/list-books'>
                            <FaBook size={40} className="text-green-500" />
                            <Title level={4}>Books</Title>
                            <Text>{totalBook} Books Available</Text>
                        </Link>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="shadow-lg"
                        bordered={false}
                        style={{ borderRadius: 10 }}
                    >
                        <Link to='/list-orders'>
                            <FaCartArrowDown size={40} className="text-red-500" />
                            <Title level={4}>Orders</Title>
                            <Text>{totalOrders} Orders </Text>
                        </Link>
                    </Card>
                </Col>
            </Row>
            <div className="flex justify-center py-6" >
                <img src={adArt} className='opacity-80 relative lg:w-[800px] lg:h-[450px] border-2 rounded-xl' alt="" />
                <div className="absolute left-[12%] right-[50%] translate-x-[50%] translate-y-2">
                    <span className='hover:text-gray-500 font-serif text-2xl cursor-pointer
                    font-semibold md:text-3xl italic border-2 p-1 rounded-r-full rounded-l-lg bg-green-500'>
                        MoonBook
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
