import { Layout } from "antd";
import { Link } from "react-router-dom";

export default function HeaderAdmin() {
    const { Header } = Layout;
    // const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    //     key,
    //     label: `nav ${key}`,
    // }));
    return (
        <>
            <Header className='flex items-center justify-between'>
                <div className="demo-logo text-white font-bold text-xl italic pr-10">
                    <Link to='/admin' className="text-2xl">MoonBook</Link></div>
                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                /> */}
            </Header>
        </>
    )
}