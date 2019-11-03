import React from "react"
import ContentLoader from "react-content-loader"

export default () => (
    Array.from({length: 5})
        .map((item, index) => (
            <ContentLoader height={200} uniquekey={index} width={1200} speed={4} primaryColor="#cacacd"
                           secondaryColor="#ecebeb">
                <rect x="63" y="20" rx="0" ry="0" width="167" height="141"/>
                <rect x="270" y="20" rx="0" ry="0" width="127" height="31"/>
                <rect x="270" y="57" rx="0" ry="0" width="83" height="7"/>
                <rect x="197" y="51" rx="0" ry="0" width="0" height="0"/>
                <rect x="269" y="76" rx="0" ry="0" width="493" height="17"/>
                <circle cx="286" cy="127" r="19"/>
                <circle cx="335" cy="127" r="19"/>
            </ContentLoader>)
        )
);

