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
        // centerMode
        // centerPadding="350px"
      >
        {/* Slice 1 */}
        <div className="block min-h-full xl:px-32 2xl:px-80">
          <Image
            src={slice1}
            alt="Slice 1"
            layout="responsive"
            placeholder="blur"
          />
        </div>
        {/* Slice 2 */}
        <div className="block min-h-full xl:px-32 2xl:px-80">
          <Image
            src={slice2}
            alt="Slice 2"
            layout="responsive"
            placeholder="blur"
          />
        </div>
        {/* Slice 3 */}
        <div className="block min-h-full xl:px-32 2xl:px-80">
          <Image
            src={slice3}
            alt="Slice 3"
            layout="responsive"
            placeholder="blur"
          />
        </div>
        {/* Slice 4 */}
        <div className="block min-h-full xl:px-32 2xl:px-80">
          <Image
            src={slice4}
            alt="Slice 4"
            layout="responsive"
            placeholder="blur"
          />
        </div>
        {/* Slice 5 */}
        <div className="block min-h-full xl:px-32 2xl:px-80">
          <Image
            src={slice5}
            alt="Slice 5"
            layout="responsive"
            placeholder="blur"
          />
        </div>
      </Carousel>
    </ApplicationWrapper>
  );
};

export default Home;
