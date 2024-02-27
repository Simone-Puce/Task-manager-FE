import Sider from "antd/es/layout/Sider"
import HomepageMenu from "../../menus/homepage/HomepageMenu";
import "./HomepageSider.css"

const HomepageSider = () => {
    return (
    <Sider className='sider-style'>
       <HomepageMenu/>
    </Sider>
    )
}

export default HomepageSider