import { NextPage } from "next";
import Image from "next/image";
import slice1 from "../../public/images/bg-cocktail1.jpg";
import slice2 from "../../public/images/bg-cocktail2.jpg";
import slice3 from "../../public/images/bg-cocktail3.jpg";
import slice4 from "../../public/images/bg-cocktail4.jpg";
import slice5 from "../../public/images/bg-cocktail5.jpg";
import { Carousel } from "antd";
import { ApplicationWrapper } from "../components/layout/ApplicationWrapper";

const Home: NextPage = () => {
  const titleMessage = "Home";
  const descriptionMessage = "Home of the cocktails website";

  return (
    <ApplicationWrapper title={titleMessage} description={descriptionMessage}>
      <Carousel
        autoplay
        effect="fade"
        lazyLoad="ondemand"
        pauseOnHover={false}
        centerMode
        centerPadding="350px"
      >
        <Image
          src={slice1}
          alt="Slice 1"
          width={2000}
          height={1333}
          placeholder="blur"
          layout="responsive"
        />
        <Image
          src={slice2}
          alt="Slice 2"
          width={2000}
          height={1333}
          placeholder="blur"
          layout="responsive"
        />
        <Image
          src={slice3}
          alt="Slice 3"
          width={2000}
          height={1333}
          placeholder="blur"
          layout="responsive"
        />
        <Image
          src={slice4}
          alt="Slice 4"
          width={2000}
          height={1333}
          placeholder="blur"
          layout="responsive"
        />
        <Image
          src={slice5}
          alt="Slice 5"
          width={2000}
          height={1333}
          placeholder="blur"
          layout="responsive"
        />
      </Carousel>
    </ApplicationWrapper>
  );
};

export default Home;
