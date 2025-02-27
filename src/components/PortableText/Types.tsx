
import { Image } from '../Image';

export const Types: any = {
  imageObject: ({ value }) => {
    console.log(value)
    return value.image ? <Image
      id={value.image.id}
      asset={value.image}
      // width={1280}
      // height={817}
      // loading="eager"
      mode="cover"
      queryParams={{
        q: 100,
      }}
      className="block mx-auto rounded-lg"
    /> : null
  }
  
  // add more block-level components here.
};
