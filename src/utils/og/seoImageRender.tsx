type SeoImageRenderProps = {
  seoImage: string;
};

export const seoImageRender = ({ seoImage }: SeoImageRenderProps) => {
  return (
    <div
      // @ts-ignore
      tw="flex flex-col w-full h-full items-center justify-center"
    >
      <img src={seoImage} alt="SEO preview" width={1200} height={630} />
    </div>
  );
};
