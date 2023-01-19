import React, {useState} from "react";
import {AntdLayout, Grid, Icons, Menu,} from "@pankod/refine-antd";
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useMenu,
  useRefineContext,
  useRouterContext,
  useTitle,
  useTranslate,
} from "@pankod/refine-core";

import {Title as DefaultTitle} from "../title";

import {antLayoutSider, antLayoutSiderMobile} from "./styles";
import {RefineLayoutSiderPropsCustom} from "../../../interfaces";

const {UnorderedListOutlined, LogoutOutlined} = Icons;
const {SubMenu} = Menu;

export const Sider: React.FC<RefineLayoutSiderPropsCustom> = ({render}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isExistAuthentication = useIsExistAuthentication();
    const {Link} = useRouterContext();
    const {mutate: mutateLogout} = useLogout();
    const Title = useTitle();
    const translate = useTranslate();
    const {menuItems, selectedKey, defaultOpenKeys} = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const {hasDashboard} = useRefineContext();

    const isMobile =
        typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

    const RenderToTitle = Title ?? DefaultTitle;

    const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
        return tree.map((item: ITreeMenu) => {
            const {icon, label, route, name, children, parentName} = item;

            if (children.length > 0) {
                return (
                    <CanAccess
                        key={route}
                        resource={name.toLowerCase()}
                        action="list"
                        params={{
                            resource: item,
                        }}
                    >
                        <SubMenu
                            key={route}
                            icon={icon ?? <UnorderedListOutlined/>}
                            title={label}
                        >
                            {renderTreeView(children, selectedKey)}
                        </SubMenu>
                    </CanAccess>
                );
            }
            const isSelected = route === selectedKey;
            const isRoute = !(parentName !== undefined && children.length === 0);
            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Menu.Item
                        key={route}
                        style={{
                            fontWeight: isSelected ? "bold" : "normal",
                        }}
                        icon={icon ?? (isRoute && <UnorderedListOutlined/>)}
                    >
                        <Link to={route}>{label}</Link>
                        {!collapsed && isSelected && (
                            <div className="ant-menu-tree-arrow"/>
                        )}
                    </Menu.Item>
                </CanAccess>
            );
        });
    };
    const profile = isExistAuthentication && (
        <Menu.Item
            key="profile"
            style={{
                fontWeight: selectedKey === "/profile" ? "bold" : "normal",
            }}
            icon={<Icons.UserOutlined/>}
        >
            <Link href="/profile">{translate("profile.title", "Profile")}</Link>
        </Menu.Item>
    );
    const logout = isExistAuthentication && (
        <Menu.Item
            key="logout"
            onClick={() => mutateLogout()}
            icon={<LogoutOutlined/>}
        >
            {translate("buttons.logout", "Logout")}
        </Menu.Item>
    );

    const dashboard = hasDashboard && (
        <Menu.Item
            key="dashboard"
            style={{
                fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
            icon={<Icons.DashboardOutlined/>}
        >
            <Link href="/">{translate("dashboard.title", "Scoreboard")}</Link>
            {!collapsed && selectedKey === "/" && (
                <div className="ant-menu-tree-arrow"/>
            )}
        </Menu.Item>
    );

    const items = renderTreeView(menuItems, selectedKey);

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                items,
                logout,
                profile,
                collapsed,
            });
        }
        return (
            <>
                {dashboard}
                {items}
                {profile}
                {logout}
            </>
        );
    };

    return (
        <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            collapsedWidth={isMobile ? 0 : 80}
            breakpoint="lg"
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <RenderToTitle collapsed={collapsed}/>
            <Menu
                selectedKeys={[selectedKey]}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                onClick={() => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }
                }}
            >
                {renderSider()}
            </Menu>
        </AntdLayout.Sider>
    );
};
