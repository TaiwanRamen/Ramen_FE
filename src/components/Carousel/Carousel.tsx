import {Carousel} from "react-bootstrap";

type Props = {
    imageUrls: string[]
}

const carouselImage = (url: string) => {
    return (
        <Carousel.Item className="my-1">
            <img
                className="carousel-image"
                src={url}
                alt=""
            />
        </Carousel.Item>
    )
}
const CarouselImage = (props:Props) => {
    const imageUrls:string[] = props.imageUrls;
    return (
        <Carousel>
            {imageUrls && imageUrls.map( imageUrl => carouselImage(imageUrl))}
        </Carousel>
    );
};

export default CarouselImage;
