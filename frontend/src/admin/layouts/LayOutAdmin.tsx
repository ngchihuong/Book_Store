import { Layout, theme } from "antd";
import HeaderAdmin from "../components/HeaderAdmin";
import SiderAdmin from "../components/SiderAdmin";


type Props = {
    children: React.ReactNode;
}
export default function LayOutAdmin({ children }: Props) {
    const { Content } = Layout;

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Layout>
                {/* header */}
                <HeaderAdmin />

                <Layout>
                    {/* Sider */}
                    <SiderAdmin />

                    <Layout>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG
                            }}
                        >
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )

}