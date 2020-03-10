import React from 'react';
import Coverflow from "react-coverflow";

const Carousel = (props) => {
    return (
        <Coverflow
        width="960"
        height="450"
        displayQuantityOfSide={2}
        navigation={false}
        enableScroll={true}
        clickable={true}
        active={0}
        >
        <div
            onClick={() => {}}
            onKeyDown={() => {}}
            role="menuitem"
            tabIndex="0"
        >
            {/* suggest, forEach loop to render each image in a component that holds the below image tags and their attributes. */}
            <img
            src={props.veganProducts.image_link}
            alt={props.veganProducts.name}
            style={{
                display: "block",
                width: "100%"
            }}
            />
        </div>
        <img
            src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/989/original/open-uri20171224-4-1gh72x0?1514082779"
            alt="title or description"
            data-action="http://andyyou.github.io/react-coverflow/"
        />
        <img
            src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/048/original/open-uri20180708-4-13okqci?1531093614"
            alt="title or description"
            data-action="http://andyyou.github.io/react-coverflow/"
        />
        <img
            src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/042/original/open-uri20180706-4-1e74943?1530916234"
            alt="title or description"
            data-action="http://andyyou.github.io/react-coverflow/"
        />
        <img
            src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/035/original/open-uri20180630-4-n6wb0y?1530390383"
            alt="title or description"
            data-action="http://andyyou.github.io/react-coverflow/"
        />
        <img
            src="https://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/021/original/open-uri20180630-4-10sgmvz?1530390373"
            alt="title or description"
            data-action="http://andyyou.github.io/react-coverflow/"
        />
        </Coverflow>
    )
}

export default Carousel;