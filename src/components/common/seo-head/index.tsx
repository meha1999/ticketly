import Head from "next/head";

interface SeoHeadProps {
  title: string;
  description: string;
  children?: any;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, children }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {children}
    </Head>
  );
};

SeoHead.defaultProps = {
  title: "",
  description: "",
};

export default SeoHead;
