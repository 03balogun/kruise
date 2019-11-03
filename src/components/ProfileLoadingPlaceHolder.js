import React from "react"
import ContentLoader from "react-content-loader"

export default () => (
    <ContentLoader
        height={500}
        width={300}
        speed={4}
        primaryColor="#cacacd"
        secondaryColor="#ecebeb"
    >
        <rect x="93" y="192" rx="0" ry="0" width="127" height="16"/>
        <rect x="69" y="223" rx="0" ry="0" width="166" height="14"/>
        <rect x="197" y="51" rx="0" ry="0" width="0" height="0"/>
        <circle cx="89" cy="70" r="1"/>
        <circle cx="159" cy="92" r="80"/>
    </ContentLoader>
);

