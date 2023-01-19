import React from "react";
import { Link } from "@pankod/refine-nextjs-router";

import { TitleProps } from "@pankod/refine-core";
import {Typography} from "@pankod/refine-antd";
const {Text} = Typography;

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link href="/">
    {collapsed ? (<center><Text style={{fontSize: 30,color:"#fff",fontWeight:"bold"}}>CTF</Text></center>) : (<center><Text style={{color:"#fff",fontSize: 42,fontWeight:"bold"}}>CTF</Text></center>) }
  </Link>
);
