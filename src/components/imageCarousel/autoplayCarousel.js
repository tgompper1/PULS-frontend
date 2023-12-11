import React from "react";
import "./autoplayCarousel.css";
import { cardDetails } from "./carousel-config";
import CarouselItem from "./carouselItem";

export default function AutoplayCarousel(){
    return(
        <div>
            <div className="carousel-container">
                <div className="carousel-track">
                    {Object.keys(cardDetails).map((detailKey) => {
                        return(
                            <CarouselItem 
                                imgUrl={cardDetails[detailKey].imgUrl}
                                imgTitle={cardDetails[detailKey].title}>
                            </CarouselItem>
                        );
                    })}
                    {Object.keys(cardDetails).map((detailKey) => {
                        return(
                            <CarouselItem 
                                imgUrl={cardDetails[detailKey].imgUrl}
                                imgTitle={cardDetails[detailKey].title}>
                            </CarouselItem>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
