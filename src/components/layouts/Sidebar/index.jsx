import { Link } from "react-router-dom";
import Sidebar, { SidebarItem } from "../../fragments/sidebar";

export default function SidebarLayout({type, userData}) {
    return (
        <>
        {type === "vi" && (
            <Sidebar session={userData} >
                <Link to={"/vi"}><SidebarItem text={"Assistant"} icon={"/assets/images/sidebar/nav.svg"}/></Link>
                <Link to={"/vi/sos"}><SidebarItem text={"sos"} icon={"/assets/images/sidebar/sos-guard.svg"}/></Link>
                <Link to={"/vi/read"}><SidebarItem text={"Read"} icon={"/assets/images/sidebar/read.svg"}/></Link>
                <Link to={"/vi/barcode"}><SidebarItem text={"barcode"} icon={"/assets/images/sidebar/barcode.svg"}/></Link>
                <Link to={"/vi/profile"}><SidebarItem text={"Profile"} icon={"/assets/images/sidebar/profile.svg"}/></Link>
            </Sidebar>
        )}
        {type === "guard" && (
            <Sidebar session={userData} >
                <Link to={"/guard"}><SidebarItem text={"Monitoring"} icon={"/assets/images/sidebar/monitoring.svg"}/></Link>
                <Link to={"/guard/sos"}><SidebarItem text={"SOS"} icon={"/assets/images/sidebar/sos-guard.svg"}/></Link>
                <Link to={"/guard/scan"}><SidebarItem text={"Scan"} icon={"/assets/images/sidebar/scan.svg"}/></Link>
                <Link to={"/guard/profile"}><SidebarItem text={"Profile"} icon={"/assets/images/sidebar/profile.svg"}/></Link>
            </Sidebar>
        )}
        </>
    )
}